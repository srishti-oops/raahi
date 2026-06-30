package com.raahi.raahi.model;

public class Achievement {

    private String title;

    private String description;

    private String icon;

    private boolean unlocked;

    private int progress;

    public Achievement() {
    }

    public Achievement(String title,
                       String description,
                       String icon,
                       boolean unlocked,
                       int progress) {

        this.title = title;
        this.description = description;
        this.icon = icon;
        this.unlocked = unlocked;
        this.progress = progress;

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

    public String getIcon() {

        return icon;

    }

    public void setIcon(String icon) {

        this.icon = icon;

    }

    public boolean isUnlocked() {

        return unlocked;

    }

    public void setUnlocked(boolean unlocked) {

        this.unlocked = unlocked;

    }

    public int getProgress() {

        return progress;

    }

    public void setProgress(int progress) {

        this.progress = progress;

    }

}
