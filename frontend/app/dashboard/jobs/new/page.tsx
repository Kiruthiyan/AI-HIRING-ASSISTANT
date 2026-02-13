"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createJob } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CreateJobPage() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [requirements, setRequirements] = useState("")
    const [salaryRange, setSalaryRange] = useState("")
    const [location, setLocation] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        try {
            await createJob({ title, description, requirements, salaryRange, location })
            router.push("/dashboard")
        } catch (err) {
            setError("Failed to create job. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <div className="flex items-center gap-2 mb-4">
                        <Link href="/dashboard" className="text-muted-foreground hover:text-primary">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                        <span className="text-sm text-muted-foreground">Back to Dashboard</span>
                    </div>
                    <CardTitle>Post a New Job</CardTitle>
                    <CardDescription>Fill in the details to find your next great hire.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Job Title</Label>
                            <Input
                                id="title"
                                placeholder="e.g. Senior Software Engineer"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <Input
                                    id="location"
                                    placeholder="e.g. Remote / Colombo"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="salary">Salary Range</Label>
                                <Input
                                    id="salary"
                                    placeholder="e.g. LKR 100,000 - 150,000"
                                    value={salaryRange}
                                    onChange={(e) => setSalaryRange(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Job Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Describe the role and responsibilities..."
                                className="min-h-[150px]"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="requirements">Requirements</Label>
                            <Textarea
                                id="requirements"
                                placeholder="List the key skills and qualifications..."
                                className="min-h-[100px]"
                                value={requirements}
                                onChange={(e) => setRequirements(e.target.value)}
                                required
                            />
                        </div>

                        {error && <p className="text-sm text-red-500">{error}</p>}

                        <div className="flex justify-end gap-4">
                            <Link href="/dashboard">
                                <Button type="button" variant="outline">Cancel</Button>
                            </Link>
                            <Button type="submit" disabled={loading}>
                                {loading ? "Posting..." : "Post Job"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
