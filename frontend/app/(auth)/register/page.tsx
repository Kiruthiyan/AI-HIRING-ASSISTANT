"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { register } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2 } from "lucide-react"

export default function RegisterPage() {
    const [companyName, setCompanyName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        try {
            await register({ companyName, email, password })
            router.push("/dashboard")
        } catch (err) {
            setError("Registration failed. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="w-[400px]">
            <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                        <Building2 className="h-8 w-8 text-primary" />
                    </div>
                </div>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>Start hiring smarter today</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name</Label>
                        <Input
                            id="companyName"
                            placeholder="Acme Inc."
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Work Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="hr@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="text-sm text-red-500">{error}</p>}
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Create Account" : "Register"}
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="justify-center">
                <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary hover:underline">
                        Login here
                    </Link>
                </p>
            </CardFooter>
        </Card>
    )
}
