"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { getMyJobs, logout } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { Plus, Briefcase, Users, Eye, TrendingUp, Calendar, GraduationCap } from "lucide-react"

export default function Dashboard() {
    const [jobs, setJobs] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [stats, setStats] = useState({
        totalJobs: 0,
        totalCandidates: 0,
        activeViews: 124,
        growth: "+12%"
    })
    const router = useRouter()

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const data = await getMyJobs()
                setJobs(data)
                setStats(prev => ({ ...prev, totalJobs: data.length, totalCandidates: data.length * 3 }))
            } catch (error) {
                console.error("Failed to fetch jobs", error)
                router.push("/login")
            } finally {
                setLoading(false)
            }
        }
        fetchJobs()
    }, [router])

    return (
        <div className="space-y-8 pb-10">
            {/* Welcome Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 p-8 md:p-12 text-white shadow-2xl">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-40 w-40 rounded-full bg-purple-500/20 blur-2xl" />

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-2">
                            Welcome back, HR! 👋
                        </h1>
                        <p className="text-white/80 text-lg max-w-xl">
                            You have <span className="font-bold text-white">{stats.totalCandidates} new candidates</span> to review today.
                            Your hiring pipeline is moving fast!
                        </p>
                    </div>
                    <Link href="/dashboard/jobs/new">
                        <Button size="lg" className="bg-white text-primary hover:bg-white/90 border-0 shadow-xl transition-transform hover:scale-105">
                            <Plus className="h-5 w-5 mr-2" />
                            Post New Job
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Jobs"
                    value={stats.totalJobs.toString()}
                    icon={Briefcase}
                    trend="+2 this week"
                    color="text-blue-600"
                    bgColor="bg-blue-50 dark:bg-blue-900/20"
                />
                <StatsCard
                    title="Total Candidates"
                    value={stats.totalCandidates.toString()}
                    icon={Users}
                    trend="+5 new"
                    color="text-violet-600"
                    bgColor="bg-violet-50 dark:bg-violet-900/20"
                />
                <StatsCard
                    title="Active Views"
                    value={stats.activeViews.toString()}
                    icon={Eye}
                    trend="+12% vs last week"
                    color="text-emerald-600"
                    bgColor="bg-emerald-50 dark:bg-emerald-900/20"
                />
                <StatsCard
                    title="Hiring Velocity"
                    value="High"
                    icon={TrendingUp}
                    trend="On track"
                    color="text-amber-600"
                    bgColor="bg-amber-50 dark:bg-amber-900/20"
                />
            </div>

            {/* Tech Ecosystem Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-xl flex flex-col justify-between relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <GraduationCap className="h-24 w-24" />
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">Annual Graduates</p>
                        <h3 className="text-4xl font-bold mt-2">5,000+</h3>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 text-sm text-gray-300">
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                        IT & Engineering
                    </div>
                </div>

                <div className="bg-white dark:bg-white/5 border border-white/20 rounded-2xl p-6 shadow-lg flex flex-col justify-between">
                    <div>
                        <p className="text-muted-foreground text-sm font-medium uppercase tracking-wider">Global Rank</p>
                        <h3 className="text-4xl font-bold mt-2 text-primary">Top 5%</h3>
                    </div>
                    <div className="mt-4 text-sm text-muted-foreground">
                        Competitive Programming
                    </div>
                </div>

                <div className="bg-white dark:bg-white/5 border border-white/20 rounded-2xl p-6 shadow-lg flex flex-col justify-between">
                    <div>
                        <p className="text-muted-foreground text-sm font-medium uppercase tracking-wider">Community</p>
                        <h3 className="text-4xl font-bold mt-2 text-purple-600">10k+</h3>
                    </div>
                    <div className="mt-4 text-sm text-muted-foreground">
                        Active Members
                    </div>
                </div>

                <div className="bg-white dark:bg-white/5 border border-white/20 rounded-2xl p-6 shadow-lg flex flex-col justify-between">
                    <div>
                        <p className="text-muted-foreground text-sm font-medium uppercase tracking-wider">Universities</p>
                        <h3 className="text-4xl font-bold mt-2 text-amber-600">20+</h3>
                    </div>
                    <div className="mt-4 text-sm text-muted-foreground">
                        STEM Programs
                    </div>
                </div>
            </div>

            {/* University Partners Marquee */}
            <div className=" overflow-hidden py-6 bg-white/50 dark:bg-white/5 rounded-2xl border border-white/20 mb-8 backdrop-blur-sm">
                <p className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-6">Partnering with Leading Universities</p>
                <div className="flex justify-center items-center gap-12 flex-wrap px-6 grayscale hover:grayscale-0 transition-all duration-500 opacity-70 hover:opacity-100">
                    <img src="/images/uom.jpg" alt="UoM" className="h-12 object-contain mix-blend-multiply dark:mix-blend-normal" />
                    <img src="/images/uoc.jpg" alt="UoC" className="h-12 object-contain mix-blend-multiply dark:mix-blend-normal" />
                    <img src="/images/sliit.jpg" alt="SLIIT" className="h-10 object-contain mix-blend-multiply dark:mix-blend-normal" />
                    <img src="/images/iit.png" alt="IIT" className="h-12 object-contain mix-blend-multiply dark:mix-blend-normal" />
                    <img src="/images/nsbm.png" alt="NSBM" className="h-10 object-contain mix-blend-multiply dark:mix-blend-normal" />
                </div>
            </div>

            {/* Recent Jobs Section */}
            <div className="mt-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
                        <div className="p-2 rounded-lg bg-primary/10">
                            <Briefcase className="h-5 w-5 text-primary" />
                        </div>
                        Recent Job Postings
                    </h2>
                    <Link href="/dashboard/jobs">
                        <Button variant="ghost" className="text-primary hover:bg-primary/5">View All</Button>
                    </Link>
                </div>

                {loading ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-48 rounded-2xl bg-gray-100 dark:bg-white/5 animate-pulse" />
                        ))}
                    </div>
                ) : jobs.length === 0 ? (
                    <GlassCard className="text-center py-20 border-dashed border-2 border-gray-200 dark:border-white/10 shadow-none bg-transparent">
                        <div className="flex flex-col items-center gap-4">
                            <div className="h-20 w-20 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center mb-2">
                                <Briefcase className="h-10 w-10 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">No jobs posted yet</h3>
                            <p className="text-muted-foreground max-w-sm">Create your first job posting to start finding great talent.</p>
                            <Link href="/dashboard/jobs/new">
                                <Button className="mt-6 shadow-lg shadow-primary/20">Create Job</Button>
                            </Link>
                        </div>
                    </GlassCard>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {jobs.map((job) => (
                            <Link href={`/dashboard/jobs/${job.id}`} key={job.id}>
                                <GlassCard hoverEffect className="h-full flex flex-col p-6 cursor-pointer group relative overflow-hidden border-white/40 dark:border-white/10 hover:border-primary/50 transition-all duration-300">
                                    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                                        <Briefcase className="h-32 w-32 text-primary transform rotate-12 translate-x-8 -translate-y-8" />
                                    </div>

                                    <div className="mb-4 relative z-10">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                                                Active
                                            </div>
                                            <span className="text-xs text-muted-foreground">{new Date(job.postedAt).toLocaleDateString()}</span>
                                        </div>
                                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-1 text-gray-900 dark:text-white">{job.title}</h3>
                                    </div>

                                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 mb-6 flex-1 relative z-10">{job.description}</p>

                                    <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                                        <span className="text-xs font-medium bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 px-2.5 py-1.5 rounded-md">
                                            {job.location}
                                        </span>
                                        <span className="text-xs font-medium bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 px-2.5 py-1.5 rounded-md">
                                            {job.salaryRange}
                                        </span>
                                    </div>
                                </GlassCard>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

function StatsCard({ title, value, icon: Icon, trend, color, bgColor }: any) {
    return (
        <GlassCard className="p-6 border-white/40 dark:border-white/10">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    <h3 className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">{value}</h3>
                </div>
                <div className={`p-3 rounded-xl ${bgColor}`}>
                    <Icon className={`h-6 w-6 ${color}`} />
                </div>
            </div>
            <div className="mt-4 flex items-center text-sm pt-4 border-t border-gray-100 dark:border-white/5">
                <span className="text-emerald-600 font-semibold flex items-center gap-1 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded text-xs">
                    <TrendingUp className="h-3 w-3" />
                    {trend}
                </span>
                <span className="text-muted-foreground text-xs ml-2">since last month</span>
            </div>
        </GlassCard>
    )
}
