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
import { Input } from "@/components/ui/input"
import { MessageSquare, Send, Bot, User, Loader2 } from "lucide-react"
import axios from "axios"

interface ChatModalProps {
    candidateId: number
    candidateName: string
}

interface Message {
    role: "user" | "ai"
    content: string
}

export function ChatModal({ candidateId, candidateName }: ChatModalProps) {
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const sendMessage = async () => {
        if (!input.trim()) return

        const userMsg = input
        setMessages(prev => [...prev, { role: "user", content: userMsg }])
        setInput("")
        setLoading(true)

        try {
            const response = await axios.post(`http://localhost:8080/api/ai/chat`, {
                candidateId: candidateId,
                question: userMsg
            }, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })

            setMessages(prev => [...prev, { role: "ai", content: response.data.answer }])
        } catch (error) {
            console.error("Failed to chat", error)
            setMessages(prev => [...prev, { role: "ai", content: "Sorry, I'm having trouble connecting to the AI brain right now." }])
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20">
                    <MessageSquare className="h-4 w-4" />
                    Chat
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Bot className="h-5 w-5 text-blue-600" />
                        Chat with {candidateName}
                    </DialogTitle>
                    <DialogDescription>
                        Ask questions about this candidate's resume and experience.
                    </DialogDescription>
                </DialogHeader>

                <ScrollArea className="flex-1 pr-4 mt-4 bg-muted/30 rounded-md p-4 border">
                    <div className="space-y-4">
                        {messages.length === 0 && (
                            <div className="text-center text-muted-foreground text-sm mt-20">
                                <Bot className="h-10 w-10 mx-auto mb-2 opacity-50" />
                                <p>Try asking: "Does he know Java?" or "What is his degree?"</p>
                            </div>
                        )}
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                <div className={`flex gap-2 max-w-[80%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                                    <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-blue-100 text-blue-700"}`}>
                                        {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                                    </div>
                                    <div className={`p-3 rounded-lg text-sm ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-white border shadow-sm dark:bg-gray-800"}`}>
                                        {msg.content}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="flex gap-2 max-w-[80%]">
                                    <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0">
                                        <Bot className="h-4 w-4" />
                                    </div>
                                    <div className="p-3 rounded-lg bg-white border shadow-sm dark:bg-gray-800">
                                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>

                <div className="flex gap-2 mt-4">
                    <Input
                        placeholder="Ask a question..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <Button onClick={sendMessage} disabled={loading || !input.trim()}>
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
