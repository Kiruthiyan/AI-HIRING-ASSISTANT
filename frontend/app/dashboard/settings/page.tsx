"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { GlassCard } from "@/components/ui/glass-card"
import { User, Bell, Lock, Globe } from "lucide-react"

export default function SettingsPage() {
    return (
        <div className="space-y-8 pb-10">
            <div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
                    Settings
                </h1>
                <p className="text-muted-foreground mt-1">
                    Manage your account preferences and notifications.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-[250px_1fr]">
                {/* Sidebar Navigation (Masked as settings tabs) */}
                <div className="hidden md:flex flex-col gap-2">
                    <Button variant="ghost" className="justify-start bg-primary/10 text-primary font-medium">
                        <User className="h-4 w-4 mr-2" />
                        Profile
                    </Button>
                    <Button variant="ghost" className="justify-start">
                        <Bell className="h-4 w-4 mr-2" />
                        Notifications
                    </Button>
                    <Button variant="ghost" className="justify-start">
                        <Lock className="h-4 w-4 mr-2" />
                        Security
                    </Button>
                    <Button variant="ghost" className="justify-start">
                        <Globe className="h-4 w-4 mr-2" />
                        Billing
                    </Button>
                </div>

                {/* Main Content */}
                <div className="space-y-6">
                    <GlassCard className="p-8">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <User className="h-5 w-5 text-primary" />
                            Profile Information
                        </h2>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>First Name</Label>
                                    <Input defaultValue="Hr" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Last Name</Label>
                                    <Input defaultValue="Manager" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Email Address</Label>
                                <Input defaultValue="demo@nexuslink.com" disabled />
                            </div>

                            <div className="space-y-2">
                                <Label>Bio</Label>
                                <Input defaultValue="Senior HR Manager at NexusLink Inc." />
                            </div>

                            <div className="pt-4 flex justify-end">
                                <Button>Save Changes</Button>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard className="p-8">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Bell className="h-5 w-5 text-primary" />
                            Notifications
                        </h2>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Email Notifications</Label>
                                    <p className="text-sm text-muted-foreground">Receive daily summaries of new candidates.</p>
                                </div>
                                <Switch checked />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">New Application Alerts</Label>
                                    <p className="text-sm text-muted-foreground">Get notified immediately when someone applies.</p>
                                </div>
                                <Switch checked />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Marketing Emails</Label>
                                    <p className="text-sm text-muted-foreground">Receive news and updates from NexusLink.</p>
                                </div>
                                <Switch />
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    )
}
