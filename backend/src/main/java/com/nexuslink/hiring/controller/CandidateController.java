package com.nexuslink.hiring.controller;

import com.nexuslink.hiring.model.Candidate;
import com.nexuslink.hiring.model.Job;
import com.nexuslink.hiring.repository.CandidateRepository;
import com.nexuslink.hiring.repository.JobRepository;
import com.nexuslink.hiring.service.AIService;
import com.nexuslink.hiring.service.ScoreResult;
import com.nexuslink.hiring.service.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CandidateController {

        private final CandidateRepository candidateRepository;
        private final JobRepository jobRepository;
        private final FileStorageService fileStorageService;
        private final AIService aiService;

        @PostMapping("/jobs/{jobId}/candidates")
        public ResponseEntity<Candidate> uploadCandidate(
                        @PathVariable Long jobId,
                        @RequestParam("file") MultipartFile file,
                        @RequestParam("fullName") String fullName,
                        @RequestParam("email") String email,
                        @RequestParam("phone") String phone) {
                Job job = jobRepository.findById(jobId).orElseThrow(() -> new RuntimeException("Job not found"));

                // 1. Store File
                String fileName = fileStorageService.storeFile(file);
                Path filePath = fileStorageService.getFilePath(fileName);

                // 2. Parse Resume (Mock AI)
                String resumeText = aiService.extractTextFromPdf(filePath);

                // 3. Calculate Score (Mock AI with Reasoning)
                ScoreResult result = aiService.calculateMatchScore(resumeText, job.getDescription(),
                                job.getRequirements());

                Candidate candidate = Candidate.builder()
                                .fullName(fullName)
                                .email(email)
                                .phone(phone)
                                .filePath(fileName)
                                .skills(resumeText.substring(0, Math.min(resumeText.length(), 200))) // Store snippet as
                                                                                                     // skills for now
                                .matchScore(result.getScore())
                                .matchReasoning(result.getReasoning())
                                .missingSkills(String.join(", ", result.getMissingSkills())) // Save as comma-separated
                                                                                             // string
                                .job(job)
                                .build();

                return ResponseEntity.ok(candidateRepository.save(candidate));
        }

        @GetMapping("/jobs/{jobId}/candidates")
        public ResponseEntity<List<Candidate>> getCandidates(@PathVariable Long jobId) {
                return ResponseEntity.ok(candidateRepository.findByJob_IdOrderByMatchScoreDesc(jobId));
        }

        @GetMapping("/jobs/{jobId}/candidates/export")
        public ResponseEntity<byte[]> exportCandidates(@PathVariable Long jobId) {
                List<Candidate> candidates = candidateRepository.findByJob_IdOrderByMatchScoreDesc(jobId);
                StringBuilder csv = new StringBuilder();
                csv.append("Full Name,Email,Phone,Match Score,AI Reasoning,Skills\n");

                for (Candidate c : candidates) {
                        csv.append("\"").append(c.getFullName() != null ? c.getFullName().replace("\"", "\"\"") : "")
                                        .append("\",");
                        csv.append("\"").append(c.getEmail() != null ? c.getEmail().replace("\"", "\"\"") : "")
                                        .append("\",");
                        csv.append("\"").append(c.getPhone() != null ? c.getPhone().replace("\"", "\"\"") : "")
                                        .append("\",");
                        csv.append(c.getMatchScore()).append(",");
                        csv.append("\"").append(
                                        c.getMatchReasoning() != null
                                                        ? c.getMatchReasoning().replace("\"", "\"\"").replace("\n", " ")
                                                        : "")
                                        .append("\",");
                        csv.append("\"").append(
                                        c.getSkills() != null ? c.getSkills().replace("\"", "\"\"").replace("\n", " ")
                                                        : "")
                                        .append("\"\n");
                }

                byte[] csvBytes = csv.toString().getBytes();

                return ResponseEntity.ok()
                                .header(org.springframework.http.HttpHeaders.CONTENT_DISPOSITION,
                                                "attachment; filename=\"candidates.csv\"")
                                .header(org.springframework.http.HttpHeaders.CONTENT_TYPE, "text/csv")
                                .body(csvBytes);
        }
}
