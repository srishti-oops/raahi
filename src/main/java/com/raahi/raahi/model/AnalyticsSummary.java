package com.raahi.raahi.model;

import java.util.List;

public class AnalyticsSummary {

    private int productivityScore;

    private int consistencyScore;

    private int weeklyProgress;

    private int monthlyProgress;

    private int goalCompletion;

    private int habitConsistency;

    private int journalActivity;

    private int completedGoals;

    private int completedHabits;

    private int journalEntries;

    private String mostProductiveArea;

    private String areaDescription;

    private List<String> insights;

    public AnalyticsSummary() {
    }

    public int getProductivityScore() {
        return productivityScore;
    }

    public void setProductivityScore(int productivityScore) {
        this.productivityScore = productivityScore;
    }

    public int getConsistencyScore() {
        return consistencyScore;
    }

    public void setConsistencyScore(int consistencyScore) {
        this.consistencyScore = consistencyScore;
    }

    public int getWeeklyProgress() {
        return weeklyProgress;
    }

    public void setWeeklyProgress(int weeklyProgress) {
        this.weeklyProgress = weeklyProgress;
    }

    public int getMonthlyProgress() {
        return monthlyProgress;
    }

    public void setMonthlyProgress(int monthlyProgress) {
        this.monthlyProgress = monthlyProgress;
    }

    public int getGoalCompletion() {
        return goalCompletion;
    }

    public void setGoalCompletion(int goalCompletion) {
        this.goalCompletion = goalCompletion;
    }

    public int getHabitConsistency() {
        return habitConsistency;
    }

    public void setHabitConsistency(int habitConsistency) {
        this.habitConsistency = habitConsistency;
    }

    public int getJournalActivity() {
        return journalActivity;
    }

    public void setJournalActivity(int journalActivity) {
        this.journalActivity = journalActivity;
    }

    public int getCompletedGoals() {
        return completedGoals;
    }

    public void setCompletedGoals(int completedGoals) {
        this.completedGoals = completedGoals;
    }

    public int getCompletedHabits() {
        return completedHabits;
    }

    public void setCompletedHabits(int completedHabits) {
        this.completedHabits = completedHabits;
    }

    public int getJournalEntries() {
        return journalEntries;
    }

    public void setJournalEntries(int journalEntries) {
        this.journalEntries = journalEntries;
    }

    public String getMostProductiveArea() {
        return mostProductiveArea;
    }

    public void setMostProductiveArea(String mostProductiveArea) {
        this.mostProductiveArea = mostProductiveArea;
    }

    public String getAreaDescription() {
        return areaDescription;
    }

    public void setAreaDescription(String areaDescription) {
        this.areaDescription = areaDescription;
    }

    public List<String> getInsights() {
        return insights;
    }

    public void setInsights(List<String> insights) {
        this.insights = insights;
    }

}