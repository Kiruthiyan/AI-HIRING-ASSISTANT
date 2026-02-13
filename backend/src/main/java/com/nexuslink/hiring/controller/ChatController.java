package com.nexuslink.hiring.controller;

import com.nexuslink.hiring.service.AIService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class ChatController {

    private final AIService aiService;

    @PostMapping("/chat")
    public ResponseEntity<Map<String, String>> chatWithCandidate(@RequestBody ChatRequest request) {
        String answer = aiService.askCandidate(request.getCandidateId(), request.getQuestion());
        return ResponseEntity.ok(Map.of("answer", answer));
    }
}
