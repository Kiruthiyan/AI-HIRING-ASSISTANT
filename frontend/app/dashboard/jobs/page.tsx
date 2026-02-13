"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getMyJobs } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { Plus, Briefcase, MapPin, DollarSign, Calendar, ArrowRight } from "lucide-react"

export default function JobsPage() {
    const [jobs, setJobs] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const data = await getMyJobs()
                setJobs(data)
            } catch (error) {
                console.error("Failed to fetch jobs", error)
            } finally {
                setLoading(false)
            }
        }
        fetchJobs()
    }, [])

    return (
        <div className="space-y-8 pb-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
                        Job Management
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your active job postings and track applications.
                    </p>
                </div>
                <Link href="/dashboard/jobs/new">
                    <Button className="shadow-lg shadow-primary/20">
                        <Plus className="h-4 w-4 mr-2" />
                        Post New Job
                    </Button>
                </Link>
            </div>

            {loading ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="h-48 rounded-2xl bg-gray-100 dark:bg-white/5 animate-pulse" />
                    ))}
                </div>
            ) : jobs.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 dark:bg-white/5 rounded-3xl border border-dashed border-gray-200 dark:border-white/10">
                    <div className="h-16 w-16 mx-auto bg-gray-100 dark:bg-white/10 rounded-full flex items-center justify-center mb-4">
                        <Briefcase className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold">No jobs posted yet</h3>
                    <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
                        Get started by creating your first job posting. It only takes a few minutes.
                    </p>
                    <Link href="/dashboard/jobs/new">
                        <Button className="mt-6">Create Job</Button>
                    </Link>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {jobs.map((job) => (
                        <Link href={`/dashboard/jobs/${job.id}`} key={job.id}>
                            <GlassCard hoverEffect className="h-full flex flex-col p-6 cursor-pointer group border-white/40 dark:border-white/10 hover:border-primary/50 transition-all duration-300">
                                <div className="mb-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">
                                            Active
                                        </div>
                                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            {new Date(job.postedAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-1">{job.title}</h3>
                                </div>

                                <div className="space-y-3 mb-6 flex-1">
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <MapPin className="h-4 w-4 text-gray-400" />
                                        {job.location}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <DollarSign className="h-4 w-4 text-gray-400" />
                                        {job.salaryRange}
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-2 pl-6 border-l-2 border-gray-200 dark:border-white/10">
                                        {job.description}
                                    </p>
                                </div>

                                <div className="mt-auto flex items-center justify-between text-sm font-semibold text-primary pt-4 border-t border-gray-100 dark:border-white/5 group-hover:pl-2 transition-all">
                                    View Details
                                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </GlassCard>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}
