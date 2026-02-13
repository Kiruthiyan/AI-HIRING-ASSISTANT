"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Briefcase, Users, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { logout } from "@/lib/auth"
import { useRouter } from "next/navigation"

const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Briefcase, label: "Jobs", href: "/dashboard/jobs" }, // Placeholder route
    { icon: Users, label: "Candidates", href: "/dashboard/candidates" }, // Placeholder route
    { icon: Settings, label: "Settings", href: "/dashboard/settings" }, // Placeholder route
]

export function Sidebar() {
    const pathname = usePathname()
    const router = useRouter()

    const handleLogout = () => {
        logout()
        router.push("/login")
    }

    return (
        <div className="h-screen w-72 bg-white/40 backdrop-blur-2xl border-r border-white/30 flex flex-col fixed left-0 top-0 z-50 shadow-2xl dark:bg-black/40 dark:border-white/10 transition-all duration-300">
            <div className="p-8">
                <div className="flex items-center gap-3 mb-1">
                    <div className="h-10 w-10 bg-gradient-to-br from-primary to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
                        <span className="text-white font-bold text-xl">N</span>
                    </div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                        NexusLink
                    </h1>
                </div>
                <p className="text-xs text-muted-foreground ml-1 font-medium tracking-wide text-gray-500">AI HIRING ASSISTANT</p>
            </div>

            <nav className="flex-1 px-4 space-y-3 mt-4">
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link key={item.href} href={item.href}>
                            <div
                                className={cn(
                                    "relative flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group cursor-pointer overflow-hidden",
                                    isActive
                                        ? "bg-primary text-white shadow-xl shadow-primary/30"
                                        : "text-gray-600 hover:bg-white/60 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white"
                                )}
                            >
                                {isActive && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-20" />
                                )}
                                <item.icon className={cn("h-5 w-5 transition-transform group-hover:scale-110", isActive ? "text-white" : "text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white")} />
                                <span className="font-medium">{item.label}</span>
                            </div>
                        </Link>
                    )
                })}
            </nav>

            <div className="p-6 border-t border-white/20 dark:border-white/10">
                <GlassCard className="p-4 mb-4 bg-gradient-to-br from-violet-500/10 to-transparent border-violet-200/20">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
                            HR
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">Demo User</p>
                            <p className="text-xs text-gray-500">HR Manager</p>
                        </div>
                    </div>
                </GlassCard>

                <Button
                    variant="ghost"
                    className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                    onClick={handleLogout}
                >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                </Button>
            </div>
        </div>
    )
}
