package com.nexuslink.hiring.controller;

import lombok.Data;

@Data
public class ChatRequest {
    private Long candidateId;
    private String question;
}
