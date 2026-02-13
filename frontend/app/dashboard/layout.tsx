import { Sidebar } from "@/components/layout/sidebar"
import { GlassCard } from "@/components/ui/glass-card"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-black dark:to-gray-900">
            <Sidebar />
            <main className="pl-64 transition-all duration-300">
                <div className="container mx-auto p-8 max-w-7xl">
                    {children}
                </div>
            </main>
        </div>
    )
}
