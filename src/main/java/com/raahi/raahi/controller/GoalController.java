package com.raahi.raahi.controller;

import com.raahi.raahi.model.Goal;
import com.raahi.raahi.service.GoalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/goals")
@CrossOrigin
public class GoalController {

    @Autowired
    private GoalService goalService;

    // ==========================
    // CREATE
    // ==========================

    @PostMapping
    public String createGoal(@RequestBody Goal goal) throws Exception {
        return goalService.saveGoal(goal);
    }

    // ==========================
    // READ
    // ==========================

    @GetMapping
    public List<Goal> getGoals() throws Exception {
        return goalService.getGoals();
    }

    // ==========================
    // UPDATE
    // ==========================

    @PutMapping("/{id}")
    public String updateGoal(
            @PathVariable String id,
            @RequestBody Goal goal) throws Exception {

        return goalService.updateGoal(id, goal);
    }

    // ==========================
    // DELETE
    // ==========================

    @DeleteMapping("/{id}")
    public String deleteGoal(@PathVariable String id) throws Exception {

        return goalService.deleteGoal(id);
    }

    // ==========================
    // COMPLETE
    // ==========================

    @PatchMapping("/{id}/complete")
    public String completeGoal(@PathVariable String id) throws Exception {

        return goalService.completeGoal(id);
    }

}