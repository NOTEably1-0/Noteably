package com.g3appdev.noteably.noteably.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import java.util.List;

@Entity
@Table(name = "schedule")
public class ScheduleEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int scheduleID;

    @Column(nullable = false)
    private int dashboardID;
   
    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String priority; 

    @Column(nullable = false)
    private String colorCode; 

    @Column(nullable = false)
    private String startDate; 

    @Column(nullable = true)
    private String endDate; 
    
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "sched", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ToDoListEntity> tasks;

    // Getters and Setters
    public int getScheduleID() {
        return scheduleID;
    }

    public void setScheduleID(int scheduleID) {
        this.scheduleID = scheduleID;
    }

    public int getDashboardID() {
        return dashboardID;
    }

    public void setDashboardID(int dashboardID) {
        this.dashboardID = dashboardID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getColorCode() {
        return colorCode;
    }

    public void setColorCode(String colorCode) {
        this.colorCode = colorCode;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    
}