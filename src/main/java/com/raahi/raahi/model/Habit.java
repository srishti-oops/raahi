package com.raahi.raahi.model;

public class Habit {

    private String id;
    private String userId;

    private String title;
    private String description;

    private String category;

    private String frequency;

    private String targetTime;

    private String status;

    private int streak;

    public Habit() {
    }

    public Habit(String id,
                 String userId,
                 String title,
                 String description,
                 String category,
                 String frequency,
                 String targetTime,
                 String status,
                 int streak) {

        this.id = id;
        this.userId = userId;
        this.title = title;
        this.description = description;
        this.category = category;
        this.frequency = frequency;
        this.targetTime = targetTime;
        this.status = status;
        this.streak = streak;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getFrequency() {
        return frequency;
    }

    public void setFrequency(String frequency) {
        this.frequency = frequency;
    }

    public String getTargetTime() {
        return targetTime;
    }

    public void setTargetTime(String targetTime) {
        this.targetTime = targetTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getStreak() {
        return streak;
    }

    public void setStreak(int streak) {
        this.streak = streak;
    }
}