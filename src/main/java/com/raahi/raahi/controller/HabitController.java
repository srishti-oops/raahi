package com.raahi.raahi.controller;

import com.raahi.raahi.model.Habit;
import com.raahi.raahi.service.HabitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/habits")
@CrossOrigin
public class HabitController {

    @Autowired
    private HabitService habitService;

    // ==========================
    // CREATE
    // ==========================

    @PostMapping
    public String createHabit(@RequestBody Habit habit) throws Exception {

        return habitService.saveHabit(habit);

    }

    // ==========================
    // READ
    // ==========================

    @GetMapping
    public List<Habit> getHabits() throws Exception {

        return habitService.getHabits();

    }

    // ==========================
    // UPDATE
    // ==========================

    @PutMapping("/{id}")
    public String updateHabit(
            @PathVariable String id,
            @RequestBody Habit habit) throws Exception {

        return habitService.updateHabit(id, habit);

    }

    // ==========================
    // DELETE
    // ==========================

    @DeleteMapping("/{id}")
    public String deleteHabit(
            @PathVariable String id) throws Exception {

        return habitService.deleteHabit(id);

    }

    // ==========================
    // COMPLETE
    // ==========================

    @PatchMapping("/{id}/complete")
    public String completeHabit(
            @PathVariable String id) throws Exception {

        return habitService.completeHabit(id);

    }

}