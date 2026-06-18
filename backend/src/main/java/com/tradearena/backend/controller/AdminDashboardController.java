package com.tradearena.backend.controller;

import com.tradearena.backend.dto.AdminDashboardResponse;
import com.tradearena.backend.service.AdminDashboardService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/dashboard")
@CrossOrigin(origins = "*")
public class AdminDashboardController {

    private final AdminDashboardService adminDashboardService;

    public AdminDashboardController(AdminDashboardService adminDashboardService) {
        this.adminDashboardService = adminDashboardService;
    }

    @GetMapping
    public AdminDashboardResponse getAdminDashboard() {
        return adminDashboardService.getAdminDashboard();
    }
}
