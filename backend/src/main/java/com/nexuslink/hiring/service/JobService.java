package com.nexuslink.hiring.service;

import com.nexuslink.hiring.controller.JobRequest;
import com.nexuslink.hiring.model.Job;
import com.nexuslink.hiring.model.User;
import com.nexuslink.hiring.repository.JobRepository;
import com.nexuslink.hiring.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    public Job createJob(JobRequest request) {
        String email = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal())
                .getUsername();
        User user = userRepository.findByEmail(email).orElseThrow();

        Job job = Job.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .requirements(request.getRequirements())
                .salaryRange(request.getSalaryRange())
                .location(request.getLocation())
                .postedAt(LocalDateTime.now())
                .postedBy(user)
                .build();
        return jobRepository.save(job);
    }

    public List<Job> getMyJobs() {
        String email = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal())
                .getUsername();
        User user = userRepository.findByEmail(email).orElseThrow();
        return jobRepository.findByPostedBy_Id(user.getId());
    }
}
