package com.nexuslink.hiring.controller;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JobRequest {
    private String title;
    private String description;
    private String requirements;
    private String salaryRange;
    private String location;
}
