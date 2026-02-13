package com.nexuslink.hiring.service;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScoreResult {
    private int score;
    private String reasoning;
    private List<String> missingSkills;
}
