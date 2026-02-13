package com.nexuslink.hiring.repository;

import com.nexuslink.hiring.model.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CandidateRepository extends JpaRepository<Candidate, Long> {
    List<Candidate> findByJob_IdOrderByMatchScoreDesc(Long jobId);
}
