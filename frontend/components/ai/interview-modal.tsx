"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BrainCircuit, Loader2, Copy, Check } from "lucide-react"
import axios from "axios"

interface InterviewModalProps {
    jobId: number
    candidateId: number
    candidateName: string
}

export function InterviewModal({ jobId, candidateId, candidateName }: InterviewModalProps) {
    const [questions, setQuestions] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [copied, setCopied] = useState(false)

    const generateQuestions = async () => {
        setLoading(true)
        try {
            // In a real app, use the authenticated API client
            const response = await axios.get(`http://localhost:8080/api/ai/interview-questions?jobId=${jobId}&candidateId=${candidateId}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            setQuestions(response.data)
        } catch (error) {
            console.error("Failed to generate questions", error)
        } finally {
            setLoading(false)
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(questions.join("\n\n"))
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 border-purple-200 hover:bg-purple-50 hover:text-purple-700 dark:border-purple-800 dark:hover:bg-purple-900/20">
                    <BrainCircuit className="h-4 w-4" />
                    AI Interview
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <BrainCircuit className="h-6 w-6 text-purple-600" />
                        AI Interview Generator
                    </DialogTitle>
                    <DialogDescription>
                        Tailored questions for <span className="font-semibold text-foreground">{candidateName}</span> based on their resume and the job description.
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-4">
                    {questions.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                            <div className="h-16 w-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                                <BrainCircuit className="h-8 w-8 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-muted-foreground mb-4">
                                    Generate a custom interview script focusing on gaps and strengths.
                                </p>
                                <Button onClick={generateQuestions} disabled={loading} className="bg-purple-600 hover:bg-purple-700">
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Analyzing Resume...
                                        </>
                                    ) : (
                                        "Generate Questions"
                                    )}
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="flex justify-end mb-2">
                                <Button variant="ghost" size="sm" onClick={copyToClipboard} className="text-xs">
                                    {copied ? (
                                        <>
                                            <Check className="mr-2 h-3 w-3" />
                                            Copied
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="mr-2 h-3 w-3" />
                                            Copy All
                                        </>
                                    )}
                                </Button>
                            </div>
                            <ScrollArea className="h-[400px] w-full rounded-md border p-4 bg-muted/50">
                                <div className="space-y-6">
                                    {questions.map((q, i) => (
                                        <div key={i} className="flex gap-3">
                                            <div className="flex-none flex items-center justify-center h-6 w-6 rounded-full bg-purple-100 text-purple-700 text-xs font-bold dark:bg-purple-900/30 dark:text-purple-400">
                                                {i + 1}
                                            </div>
                                            <p className="text-sm leading-relaxed pt-0.5">{q}</p>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                            <div className="mt-4 flex justify-end">
                                <Button variant="outline" onClick={() => setQuestions([])}>Reset</Button>
                            </div>
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
