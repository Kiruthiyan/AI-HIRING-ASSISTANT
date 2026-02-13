package com.nexuslink.hiring.controller;

import com.nexuslink.hiring.model.Candidate;
import com.nexuslink.hiring.model.Job;
import com.nexuslink.hiring.repository.CandidateRepository;
import com.nexuslink.hiring.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AIController {

    private final JobRepository jobRepository;
    private final CandidateRepository candidateRepository;

    @GetMapping("/interview-questions")
    public ResponseEntity<List<String>> generateInterviewQuestions(
            @RequestParam Long jobId,
            @RequestParam Long candidateId) {

        Job job = jobRepository.findById(jobId).orElseThrow(() -> new RuntimeException("Job not found"));
        Candidate candidate = candidateRepository.findById(candidateId)
                .orElseThrow(() -> new RuntimeException("Candidate not found"));

        List<String> questions = new ArrayList<>();
        String role = job.getTitle();
        String requirements = job.getRequirements().toLowerCase();

        // 1. Ice Breaker
        questions.add(
                "Tell us about your experience as a " + role + " and what interests you about this role at NexusLink.");

        // 2. Tech Specific (Mock Generation)
        if (requirements.contains("react")) {
            questions.add(
                    "Can you explain how you handle state management in complex React applications? do you prefer Redux, Context API, or others?");
        } else if (requirements.contains("java") || requirements.contains("spring")) {
            questions.add(
                    "Describe a challenging problem you solved using Spring Boot. How did you handle transaction management?");
        } else {
            questions.add(
                    "What is the most technically challenging project you've worked on, and what was your specific contribution?");
        }

        // 3. Problem Solving
        questions.add(
                "Describe a time you had to optimize a slow-performing query or API endpoint. What was your approach?");

        // 4. Soft Skills
        questions.add(
                "How do you handle disagreements with other developers regarding code reviews or architectural decisions?");

        // 5. Future Growth
        questions.add("Where do you see the " + role + " tech stack evolving in the next 2-3 years?");

        return ResponseEntity.ok(questions);
    }
}
