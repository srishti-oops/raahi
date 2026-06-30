package com.raahi.raahi.model;

public class Goal {

    private String id;
    private String userId;
    private String title;
    private String description;
    private String category;
    private String priority;
    private String targetDate;
    private String status;

    public Goal() {
    }

    public Goal(String id, String userId, String title,
                String description, String category,
                String priority, String targetDate,
                String status) {

        this.id = id;
        this.userId = userId;
        this.title = title;
        this.description = description;
        this.category = category;
        this.priority = priority;
        this.targetDate = targetDate;
        this.status = status;
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
    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public String getTargetDate() {
        return targetDate;
    }

    public void setTargetDate(String targetDate) {
        this.targetDate = targetDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}