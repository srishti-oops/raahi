package com.raahi.raahi.controller;

import com.raahi.raahi.model.User;
import com.raahi.raahi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class AuthController {

    @Autowired
    private UserService userService;

    @GetMapping("/login")
    public String login() {
        return "forward:/login.html";
    }

    @GetMapping("/signup")
    public String signup() {
        return "forward:/signup.html";
    }

    @PostMapping("/signup")
    @ResponseBody
    public String registerUser(@RequestBody User user) throws Exception {
        System.out.println("Name: " + user.getName());
        System.out.println("Email: " + user.getEmail());
        System.out.println("Password: " + user.getPassword());

        userService.saveUser(user);
        return "User registered successfully!";
    }
    @PostMapping("/login")
    @ResponseBody
    public String loginUser(@RequestBody User user) {

        try {
            userService.loginUser(user);
            return "Login successful!";
        } catch (Exception e) {

            if (e.getMessage().contains("No user record")) {
                return "No account found with this email.";
            }

            return "Login failed. Please try again.";
        }
        }

    }