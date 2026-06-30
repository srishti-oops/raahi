package com.raahi.raahi.controller;

import com.raahi.raahi.model.AchievementSummary;
import com.raahi.raahi.service.AchievementService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/achievements")
@CrossOrigin("*")
public class AchievementController {

    private final AchievementService achievementService;

    public AchievementController(AchievementService achievementService) {

        this.achievementService = achievementService;

    }

    @GetMapping
    public ResponseEntity<AchievementSummary> getAchievements() {

        try {

            AchievementSummary summary =
                    achievementService.getAchievements();

            return ResponseEntity.ok(summary);
        }

        catch (Exception e) {

            return ResponseEntity.internalServerError().build();

        }

    }

}