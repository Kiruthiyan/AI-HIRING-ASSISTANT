"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getMyJobs, getCandidates } from "@/lib/auth"
import { GlassCard } from "@/components/ui/glass-card"
import { Users, Search, Filter, Download } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function CandidatesPage() {
    const [stats, setStats] = useState({ totalCandidates: 0, reviewed: 0, shortlisted: 0 })
    const [loading, setLoading] = useState(true)

    // In a real app, we would fetch all candidates across all jobs
    // For now, we'll just show a "Select Job" view or a mock list

    return (
        <div className="space-y-8 pb-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
                        Candidate Pool
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        View and manage potential hires across all your job postings.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export CSV
                    </Button>
                </div>
            </div>

            {/* Candidate Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <GlassCard className="p-6 bg-blue-50/50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-800/30">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                            <Users className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Candidates</p>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">1,240</h3>
                        </div>
                    </div>
                </GlassCard>
                <GlassCard className="p-6 bg-purple-50/50 dark:bg-purple-900/10 border-purple-100 dark:border-purple-800/30">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600">
                            <Search className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">To Review</p>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">45</h3>
                        </div>
                    </div>
                </GlassCard>
                <GlassCard className="p-6 bg-green-50/50 dark:bg-green-900/10 border-green-100 dark:border-green-800/30">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">
                            <Users className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Shortlisted</p>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">12</h3>
                        </div>
                    </div>
                </GlassCard>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search candidates by name, skill, or degree..." className="pl-10 h-10 bg-white/50 backdrop-blur-sm" />
                </div>
                <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                </Button>
            </div>

            {/* Empty State / Call to Action */}
            <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 p-12 text-center bg-gray-50/50 dark:bg-white/5">
                <div className="max-w-md mx-auto space-y-4">
                    <div className="h-20 w-20 bg-gray-100 dark:bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Users className="h-10 w-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold">Select a Job to View Candidates</h3>
                    <p className="text-muted-foreground">
                        To manage candidates effectively, please select a specific job posting from your dashboard.
                        We are rolling out a unified candidate view soon!
                    </p>
                    <Link href="/dashboard/jobs">
                        <Button size="lg" className="mt-4 shadow-xl">Go to Job Board</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
