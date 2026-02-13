"use client"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Info } from "lucide-react"
import { InterviewModal } from "@/components/ai/interview-modal"
import { ChatModal } from "@/components/ai/chat-modal"

interface Candidate {
    id: number
    fullName: string
    email: string
    matchScore: number
    matchReasoning?: string
    skills: string
    missingSkills?: string
    job?: { id: number }
}

interface CandidateListProps {
    candidates: Candidate[]
}

export function CandidateList({ candidates }: CandidateListProps) {
    if (candidates.length === 0) {
        return (
            <div className="text-center py-12 px-4 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-lg">
                <div className="mx-auto h-12 w-12 text-gray-400">
                    <Sparkles className="h-12 w-12 opacity-20" />
                </div>
                <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100">No candidates yet</h3>
                <p className="mt-1 text-sm text-gray-500">Get start by sharing your job link!</p>
            </div>
        )
    }

    const getScoreColor = (score: number) => {
        if (score >= 85) return "bg-green-500 hover:bg-green-600"
        if (score >= 60) return "bg-yellow-500 hover:bg-yellow-600"
        return "bg-red-500 hover:bg-red-600"
    }

    return (
        <div className="space-y-4">
            {candidates.map((candidate) => (
                <Card key={candidate.id} className="group relative overflow-hidden transition-all hover:shadow-md border-l-4 border-l-transparent hover:border-l-primary">
                    <div className="p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-lg font-semibold truncate text-foreground">{candidate.fullName}</h3>
                                {candidate.matchScore >= 85 && (
                                    <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-[10px] font-bold uppercase tracking-wider dark:bg-purple-900/30 dark:text-purple-400">
                                        Top Match
                                    </span>
                                )}
                            </div>
                            <p className="text-sm text-muted-foreground truncate mb-2">{candidate.email}</p>

                            {/* Skills / Reasoning */}
                            <div className="flex items-center gap-2 text-xs">
                                <div className="bg-secondary px-2 py-1 rounded text-secondary-foreground font-medium max-w-[200px] truncate">
                                    {candidate.skills}
                                </div>
                                {candidate.matchReasoning && (
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Info className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
                                            </TooltipTrigger>
                                            <TooltipContent className="max-w-xs p-3">
                                                <p className="font-semibold mb-1 text-xs uppercase text-muted-foreground">AI Insight</p>
                                                <p className="text-sm">{candidate.matchReasoning}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                )}
                            </div>

                            {/* Missing Skills Warning */}
                            {candidate.missingSkills && candidate.missingSkills.length > 0 && (
                                <div className="flex flex-wrap items-center gap-2 mt-2">
                                    <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider">⚠️ Missing:</span>
                                    {candidate.missingSkills.split(",").map((skill, i) => (
                                        <Badge key={i} variant="outline" className="text-[10px] px-1.5 py-0 border-red-200 text-red-600 bg-red-50 hover:bg-red-100">
                                            {skill.trim()}
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-4 w-full sm:w-auto mt-4 sm:mt-0">
                            <div className="flex flex-col items-end gap-2">
                                <Badge className={`${getScoreColor(candidate.matchScore)} text-white px-3 py-1 text-sm font-bold shadow-sm transition-colors cursor-help`}>
                                    {candidate.matchScore}%
                                </Badge>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <ChatModal
                                    candidateId={candidate.id}
                                    candidateName={candidate.fullName}
                                />
                                <InterviewModal
                                    jobId={candidate.job?.id || 0}
                                    candidateId={candidate.id}
                                    candidateName={candidate.fullName}
                                />
                            </div>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    )
}
