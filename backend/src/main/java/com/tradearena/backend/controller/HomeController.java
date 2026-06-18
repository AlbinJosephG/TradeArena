package com.tradearena.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "TradeArena Backend is running successfully!";
    }

    @GetMapping("/api/test")
    public String testApi() {
        return "API working successfully!";
    }
}