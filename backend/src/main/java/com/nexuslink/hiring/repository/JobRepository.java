package com.nexuslink.hiring.repository;

import com.nexuslink.hiring.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findByPostedBy_Id(Long userId);
}
