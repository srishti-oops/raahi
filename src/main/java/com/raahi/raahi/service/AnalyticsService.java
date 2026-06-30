package com.raahi.raahi.service;

import com.raahi.raahi.model.AnalyticsSummary;
import com.raahi.raahi.model.Goal;
import com.raahi.raahi.model.Habit;
import com.raahi.raahi.model.Journal;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AnalyticsService {

    private final GoalService goalService;
    private final HabitService habitService;
    private final JournalService journalService;

    public AnalyticsService(GoalService goalService,
                            HabitService habitService,
                            JournalService journalService) {

        this.goalService = goalService;
        this.habitService = habitService;
        this.journalService = journalService;
    }

    public AnalyticsSummary getAnalytics() throws Exception {

        List<Goal> goals = goalService.getGoals();

        List<Habit> habits = habitService.getHabits();

        List<Journal> journals = journalService.getJournals();
        AnalyticsSummary summary = new AnalyticsSummary();

        int completedGoals = (int) goals.stream()

                .filter(g -> "Completed".equalsIgnoreCase(g.getStatus()))

                .count();

        int completedHabits = (int) habits.stream()

                .filter(h -> "Completed".equalsIgnoreCase(h.getStatus()))

                .count();

        int goalCompletion = goals.isEmpty()

                ? 0

                : (completedGoals * 100) / goals.size();

        int habitConsistency = habits.isEmpty()

                ? 0

                : (completedHabits * 100) / habits.size();

        int journalActivity = Math.min(

                journals.size() * 10,

                100

        );

        int productivityScore =

                (goalCompletion +

                        habitConsistency +

                        journalActivity) / 3;

        int consistencyScore =

                habitConsistency;

        int weeklyProgress =

                (goalCompletion +

                        journalActivity) / 2;

        int monthlyProgress =

                productivityScore;

        summary.setGoalCompletion(goalCompletion);

        summary.setHabitConsistency(habitConsistency);

        summary.setJournalActivity(journalActivity);

        summary.setCompletedGoals(completedGoals);

        summary.setCompletedHabits(completedHabits);

        summary.setJournalEntries(journals.size());

        summary.setProductivityScore(productivityScore);

        summary.setConsistencyScore(consistencyScore);

        summary.setWeeklyProgress(weeklyProgress);

        summary.setMonthlyProgress(monthlyProgress);

        if (goalCompletion >= habitConsistency
                && goalCompletion >= journalActivity) {

            summary.setMostProductiveArea("Goals");

            summary.setAreaDescription(

                    "You are strongest at completing your goals."

            );

        }

        else if (habitConsistency >= journalActivity) {

            summary.setMostProductiveArea("Habits");

            summary.setAreaDescription(

                    "Your daily routines are becoming consistent."

            );

        }

        else {

            summary.setMostProductiveArea("Journal");

            summary.setAreaDescription(

                    "Reflection is becoming one of your strengths."

            );

        }

        List<String> insights = new ArrayList<>();

        if (goalCompletion >= 75) {

            insights.add(

                    "Excellent goal completion this month."

            );

        } else {

            insights.add(

                    "Completing a few pending goals will improve your productivity."

            );

        }

        if (habitConsistency >= 70) {

            insights.add(

                    "Your habit consistency is improving."

            );

        } else {

            insights.add(

                    "Try maintaining one habit every day."

            );

        }

        if (journals.size() >= 5) {

            insights.add(

                    "Your journal reflects regular self-reflection."

            );

        } else {

            insights.add(

                    "Writing more journal entries will help identify productivity patterns."

            );

        }

        insights.add(

                "Small daily improvements create long-term success."

        );

        summary.setInsights(insights);

        return summary;

    }

}