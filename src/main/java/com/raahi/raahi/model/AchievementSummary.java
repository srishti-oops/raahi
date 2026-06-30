package com.raahi.raahi.model;

import java.util.List;

public class AchievementSummary {

    private int unlocked;

    private int total;

    private int completionPercentage;

    private List<Achievement> achievements;

    public AchievementSummary() {
    }

    public int getUnlocked() {

        return unlocked;

    }

    public void setUnlocked(int unlocked) {

        this.unlocked = unlocked;

    }

    public int getTotal() {

        return total;

    }

    public void setTotal(int total) {

        this.total = total;

    }

    public int getCompletionPercentage() {

        return completionPercentage;

    }

    public void setCompletionPercentage(int completionPercentage) {

        this.completionPercentage = completionPercentage;

    }

    public List<Achievement> getAchievements() {

        return achievements;

    }

    public void setAchievements(List<Achievement> achievements) {

        this.achievements = achievements;

    }

}