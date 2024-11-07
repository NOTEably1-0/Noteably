package com.g3appdev.noteably.entity;

import jakarta.persistence.*;

@Entity
public class TimerEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int hours;
    private int minutes;
    private int seconds;
    private String title;

    // Default constructor
    public TimerEntity() {
        super();
    }

    // Constructor with parameters
    public TimerEntity(int id, int hours, int minutes, int seconds, String title) {
        super();
        this.id = id;
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
        this.title = title;
    }

    // Getters and setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getHours() {
        return hours;
    }

    public void setHours(int hours) {
        this.hours = hours;
    }

    public int getMinutes() {
        return minutes;
    }

    public void setMinutes(int minutes) {
        this.minutes = minutes;
    }

    public int getSeconds() {
        return seconds;
    }

    public void setSeconds(int seconds) {
        this.seconds = seconds;
    }
    
    public String getTitle() {
    	return title;
    }
    
    public void setTitle(String title) {
    	this.title = title;
    }
}
