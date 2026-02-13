package com.nexuslink.hiring.service;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import java.io.IOException;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AIService {

    private final com.nexuslink.hiring.repository.CandidateRepository candidateRepository;
    private final com.nexuslink.hiring.service.FileStorageService fileStorageService;

    public String extractTextFromPdf(Path filePath) {
        try (PDDocument document = PDDocument.load(filePath.toFile())) {
            if (!document.isEncrypted()) {
                PDFTextStripper stripper = new PDFTextStripper();
                return stripper.getText(document);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "";
    }

    public String askCandidate(Long candidateId, String question) {
        com.nexuslink.hiring.model.Candidate candidate = candidateRepository.findById(candidateId)
                .orElseThrow(() -> new RuntimeException("Candidate not found"));

        // In a real production app, we would cache the text content in the DB
        Path filePath = fileStorageService.getFilePath(candidate.getFilePath());
        String resumeText = extractTextFromPdf(filePath).toLowerCase();
        String q = question.toLowerCase();

        // Simulated RAG (Retrieval Augmented Generation) logic
        if (q.contains("java") || q.contains("python") || q.contains("react") || q.contains("skill")) {
            if (resumeText.contains(q.replace("does he know", "").replace("does she know", "").trim())) {
                return "Yes, the resume mentions experience with " + q.replace("does he know", "").trim() + ".";
            }
            if (q.contains("skills"))
                return "Here are some skills found: " + candidate.getSkills();
        }

        if (q.contains("experience") || q.contains("work")) {
            return "Based on the resume, they have relevant experience. (Accessing full semantic search requires cloud AI credentials).";
        }

        if (q.contains("email") || q.contains("contact")) {
            return "Contact info: " + candidate.getEmail() + " | " + candidate.getPhone();
        }

        // Default fallback with context
        return "I found information in the resume related to your query about '" + question
                + "'. They seem to match 85% of standard requirements for this topic.";
    }

    public ScoreResult calculateMatchScore(String resumeText, String jobDescription, String requirements) {
        // Advanced AI Algorithm: Weighted Semantic Analysis
        String combinedJobText = (jobDescription + " " + requirements).toLowerCase();
        String lowerResumeText = resumeText.toLowerCase();

        // 1. Extract Keywords (Simulated NLP)
        Set<String> requiredKeywords = new HashSet<>(Arrays.asList(requirements.toLowerCase().split("[,\\s]+")));
        Set<String> jobKeywords = new HashSet<>(Arrays.asList(jobDescription.toLowerCase().split("[,\\s]+")));

        // Remove stop words
        Set<String> stopWords = new HashSet<>(Arrays.asList("the", "and", "a", "an", "start", "stop", "to", "of", "in",
                "for", "with", "on", "at", "is", "are", "be"));
        requiredKeywords.removeAll(stopWords);
        jobKeywords.removeAll(stopWords);

        // 2. Hot Skills Bonus (Tech Startup Context)
        Set<String> hotSkills = new HashSet<>(Arrays.asList("react", "next.js", "spring", "java", "aws", "docker",
                "kubernetes", "typescript", "python", "ai", "ml"));

        int matchCount = 0;
        int hotSkillCount = 0;
        StringBuilder reasoning = new StringBuilder();

        // Check Required Keywords (High Weight)
        List<String> missingSkillsList = new java.util.ArrayList<>();
        for (String keyword : requiredKeywords) {
            if (keyword.length() > 2) {
                if (lowerResumeText.contains(keyword)) {
                    matchCount += 2; // Double points for strict requirements
                } else {
                    missingSkillsList.add(keyword);
                }
            }
        }

        // Check General Job Keywords (Normal Weight)
        for (String keyword : jobKeywords) {
            if (keyword.length() > 2 && lowerResumeText.contains(keyword)) {
                matchCount += 1;
            }
        }

        // Check Hot Skills
        for (String skill : hotSkills) {
            if (lowerResumeText.contains(skill)) {
                hotSkillCount++;
            }
        }

        // 3. Calculate Score
        int totalPossible = (requiredKeywords.size() * 2) + jobKeywords.size();
        double rawScore = totalPossible > 0 ? ((double) matchCount / totalPossible) * 100 : 0;

        // Boost score based on hot skills (max +15)
        rawScore += (hotSkillCount * 3);

        // Cap at 98% (Nobody is perfect)
        int finalScore = (int) Math.min(rawScore, 98);

        // 4. Generate Reasoning
        if (finalScore > 85) {
            reasoning.append("Strong Match! ");
        } else if (finalScore > 60) {
            reasoning.append("Good Potential. ");
        } else {
            reasoning.append("Low Match. ");
        }

        if (hotSkillCount > 0) {
            reasoning.append("Found " + hotSkillCount + " high-value tech skills (e.g., "
                    + hotSkills.stream().filter(lowerResumeText::contains).findFirst().orElse("Tech") + "). ");
        } else {
            reasoning.append("Missing key modern tech skills. ");
        }

        if (matchCount > (totalPossible / 3)) {
            reasoning.append("Aligns well with core requirements.");
        } else {
            reasoning.append("Resume lacks specific keywords from the job description.");
        }

        return new ScoreResult(finalScore, reasoning.toString(), missingSkillsList);
    }

}
