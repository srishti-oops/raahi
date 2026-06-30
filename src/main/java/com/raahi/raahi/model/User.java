package com.raahi.raahi.model;

public class User {

    private String id;
    private String name;
    private String email;
    private String password;
    private String college;
    private String degree;
    private String year;
    private String careerGoal;

    public User() {
    }

    public User(String id, String name, String email,
                String college, String degree,
                String year, String careerGoal) {

        this.id = id;
        this.name = name;
        this.email = email;
        this.college = college;
        this.degree = degree;
        this.year = year;
        this.careerGoal = careerGoal;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCollege() {
        return college;
    }

    public void setCollege(String college) {
        this.college = college;
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getCareerGoal() {
        return careerGoal;
    }

    public void setCareerGoal(String careerGoal) {
        this.careerGoal = careerGoal;
    }
}