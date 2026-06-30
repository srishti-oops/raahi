package com.raahi.raahi.controller;

import com.raahi.raahi.model.AnalyticsSummary;
import com.raahi.raahi.service.AnalyticsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin("*")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {

        this.analyticsService = analyticsService;

    }

    @GetMapping
    public ResponseEntity<AnalyticsSummary> getAnalytics() {

        try {

            AnalyticsSummary summary =
                    analyticsService.getAnalytics();

            return ResponseEntity.ok(summary);

        }

        catch (Exception e) {

            return ResponseEntity.internalServerError().build();

        }

    }

}