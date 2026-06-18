package com.tradearena.backend.dto;

public class LoginResponse {

    private String message;
    private String token;
    private Long userId;
    private String name;
    private String role;

    public LoginResponse(String message, String token, Long userId, String name, String role) {
        this.message = message;
        this.token = token;
        this.userId = userId;
        this.name = name;
        this.role = role;
    }

    public String getMessage() { return message; }
    public String getToken() { return token; }
    public Long getUserId() { return userId; }
    public String getName() { return name; }
    public String getRole() { return role; }
}