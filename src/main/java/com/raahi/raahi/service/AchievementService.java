package com.raahi.raahi.service;

import com.raahi.raahi.model.Achievement;
import com.raahi.raahi.model.Goal;
import com.raahi.raahi.model.Habit;
import com.raahi.raahi.model.Journal;
import org.springframework.stereotype.Service;
import com.raahi.raahi.model.AchievementSummary;
import java.util.ArrayList;
import java.util.List;

@Service
public class AchievementService {

    private final GoalService goalService;
    private final HabitService habitService;
    private final JournalService journalService;

    public AchievementService(GoalService goalService,
                              HabitService habitService,
                              JournalService journalService) {

        this.goalService = goalService;
        this.habitService = habitService;
        this.journalService = journalService;

    }

    public AchievementSummary getAchievements() throws Exception {

        List<Goal> goals = goalService.getGoals();

        List<Habit> habits = habitService.getHabits();

        List<Journal> journals = journalService.getJournals();

        List<Achievement> achievements = new ArrayList<>();

        int completedGoals = (int) goals.stream()
                .filter(goal -> "Completed".equalsIgnoreCase(goal.getStatus()))
                .count();

        int highestStreak = habits.stream()
                .mapToInt(Habit::getStreak)
                .max()
                .orElse(0);

        achievements.add(

                new Achievement(

                        "First Goal",

                        "Create your first goal.",

                        "fa-bullseye",

                        goals.size() >= 1,

                        Math.min(goals.size() * 100, 100)

                )

        );

        achievements.add(

                new Achievement(

                        "Goal Crusher",

                        "Complete five goals.",

                        "fa-trophy",

                        completedGoals >= 5,

                        Math.min(completedGoals * 20, 100)

                )

        );

        achievements.add(

                new Achievement(

                        "Habit Builder",

                        "Create three habits.",

                        "fa-list-check",

                        habits.size() >= 3,

                        Math.min((habits.size() * 100) / 3, 100)

                )

        );

        achievements.add(

                new Achievement(

                        "Consistency Champion",

                        "Reach a 7-day habit streak.",

                        "fa-fire",

                        highestStreak >= 7,

                        Math.min((highestStreak * 100) / 7, 100)

                )

        );

        achievements.add(

                new Achievement(

                        "Reflective Mind",

                        "Write five journal entries.",

                        "fa-book-open",

                        journals.size() >= 5,

                        Math.min((journals.size() * 100) / 5, 100)

                )

        );

        achievements.add(

                new Achievement(

                        "Productivity Explorer",

                        "Use every section of Raahi.",

                        "fa-compass",

                        goals.size() > 0
                                && habits.size() > 0
                                && journals.size() > 0,

                        goals.size() > 0
                                && habits.size() > 0
                                && journals.size() > 0
                                ? 100
                                : 60

                )

        );

        AchievementSummary summary = new AchievementSummary();

        summary.setAchievements(achievements);

        summary.setTotal(achievements.size());

        int unlocked = (int) achievements.stream()
                .filter(Achievement::isUnlocked)
                .count();

        summary.setUnlocked(unlocked);

        summary.setCompletionPercentage(

                achievements.isEmpty()

                        ? 0

                        : (unlocked * 100) / achievements.size()

        );

        return summary;

    }

}