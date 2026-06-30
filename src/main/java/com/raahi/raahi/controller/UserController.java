package com.raahi.raahi.controller;

import com.raahi.raahi.model.User;
import com.raahi.raahi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public String createUser(@RequestBody User user) throws Exception {
        return userService.saveUser(user);
    }
}