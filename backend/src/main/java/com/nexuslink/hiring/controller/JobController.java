package com.nexuslink.hiring.controller;

import com.nexuslink.hiring.model.Job;
import com.nexuslink.hiring.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobController {

    private final JobService service;

    @PostMapping
    public ResponseEntity<Job> createJob(@RequestBody JobRequest request) {
        return ResponseEntity.ok(service.createJob(request));
    }

    @GetMapping
    public ResponseEntity<List<Job>> getMyJobs() {
        return ResponseEntity.ok(service.getMyJobs());
    }
}
