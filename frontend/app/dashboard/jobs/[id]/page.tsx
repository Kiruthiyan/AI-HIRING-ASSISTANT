"use client"

import { useEffect, useState, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { getMyJobs, uploadCandidate, getCandidates } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CandidateList } from "@/components/candidate-list"
import { ArrowLeft, Upload, Loader2, Briefcase, MapPin, DollarSign } from "lucide-react"

export default function JobDetailsPage() {
    const params = useParams()
    const router = useRouter()
    const [job, setJob] = useState<any>(null)
    const [candidates, setCandidates] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [uploading, setUploading] = useState(false)
    const [showUpload, setShowUpload] = useState(false)

    // Upload Form State
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const jobs = await getMyJobs()
                const currentJob = jobs.find((j: any) => j.id.toString() === params.id)
                if (currentJob) {
                    setJob(currentJob)
                    const candidatesData = await getCandidates(params.id as string)
                    setCandidates(candidatesData)
                } else {
                    // Job not found or not owned by user
                    router.push("/dashboard")
                }
            } catch (error) {
                console.error("Error fetching data", error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [params.id, router])

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!fileInputRef.current?.files?.[0]) return

        setUploading(true)
        const formData = new FormData()
        formData.append("file", fileInputRef.current.files[0])
        formData.append("fullName", fullName)
        formData.append("email", email)
        formData.append("phone", phone)

        try {
            await uploadCandidate(params.id as string, formData)
            // Refresh candidates
            const updatedCandidates = await getCandidates(params.id as string)
            setCandidates(updatedCandidates)
            setShowUpload(false)
            // Reset form
            setFullName("")
            setEmail("")
            setPhone("")
            if (fileInputRef.current) fileInputRef.current.value = ""
        } catch (error) {
            console.error("Upload failed", error)
            alert("Failed to upload CV. Please try again.")
        } finally {
            setUploading(false)
        }
    }

    const handleExportCsv = async () => {
        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`http://localhost:8080/api/jobs/${params.id}/candidates/export`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            if (!response.ok) throw new Error("Export failed")

            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = `candidates-job-${params.id}.csv`
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(url)
            document.body.removeChild(a)
        } catch (error) {
            console.error("Export error", error)
            alert("Failed to export CSV")
        }
    }

    if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin h-8 w-8" /></div>
    if (!job) return <div>Job not found</div>

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-5xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex items-center gap-2">
                    <Link href="/dashboard" className="text-muted-foreground hover:text-primary">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                    <span className="text-muted-foreground">Back to Dashboard</span>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Left Column: Job Details */}
                    <div className="md:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl">{job.title}</CardTitle>
                                <div className="flex gap-4 text-sm text-muted-foreground mt-2">
                                    <div className="flex items-center gap-1"><Briefcase className="h-4 w-4" /> Full-time</div>
                                    <div className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {job.location}</div>
                                    <div className="flex items-center gap-1"><DollarSign className="h-4 w-4" /> {job.salaryRange}</div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h3 className="font-semibold mb-2">Description</h3>
                                    <p className="text-sm text-gray-600 whitespace-pre-line">{job.description}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2">Requirements</h3>
                                    <p className="text-sm text-gray-600 whitespace-pre-line">{job.requirements}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Candidates List */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-bold">Candidates ({candidates.length})</h2>
                                {candidates.length > 0 && (
                                    <Button variant="outline" size="sm" onClick={handleExportCsv}>
                                        <Upload className="h-4 w-4 mr-2 rotate-180" /> Export CSV
                                    </Button>
                                )}
                            </div>
                            <CandidateList candidates={candidates} />
                        </div>
                    </div>

                    {/* Right Column: Key Actions (Upload CV) */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Add Candidate</CardTitle>
                                <CardDescription>Upload a CV for this position.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {!showUpload ? (
                                    <Button className="w-full" onClick={() => setShowUpload(true)}>
                                        <Upload className="h-4 w-4 mr-2" />
                                        Upload CV
                                    </Button>
                                ) : (
                                    <form onSubmit={handleUpload} className="space-y-4">
                                        <div className="space-y-2">
                                            <Label>Full Name</Label>
                                            <Input value={fullName} onChange={e => setFullName(e.target.value)} required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Email</Label>
                                            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Phone</Label>
                                            <Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Optional" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Resume (PDF)</Label>
                                            <Input type="file" accept=".pdf" ref={fileInputRef} required />
                                        </div>
                                        <div className="flex gap-2 pt-2">
                                            <Button type="button" variant="outline" className="w-full" onClick={() => setShowUpload(false)}>Cancel</Button>
                                            <Button type="submit" className="w-full" disabled={uploading}>
                                                {uploading ? <Loader2 className="animate-spin h-4 w-4" /> : "Upload"}
                                            </Button>
                                        </div>
                                    </form>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
