package com.raahi.raahi.model;

public class Journal {

    private String id;
    private String userId;

    private String title;
    private String content;

    private String mood;

    private String date;

    public Journal() {
    }

    public Journal(String id,
                   String userId,
                   String title,
                   String content,
                   String mood,
                   String date) {

        this.id = id;
        this.userId = userId;
        this.title = title;
        this.content = content;
        this.mood = mood;
        this.date = date;

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

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getMood() {
        return mood;
    }

    public void setMood(String mood) {
        this.mood = mood;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

}