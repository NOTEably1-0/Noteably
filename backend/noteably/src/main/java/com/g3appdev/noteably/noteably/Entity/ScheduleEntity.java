package com.g3appdev.noteably.noteably.Entity;

import jakarta.persistence.*;
import jakarta.persistence.OneToMany;

import java.util.List;

@Entity
public class ScheduleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int scheduleID;

   
    private String title;
    private String priority;
    private String colorCode;
    private String startDate;
    private String endDate;
    private String description;

    @OneToMany(mappedBy = "sched", cascade = CascadeType.ALL)
    private List<ToDoListEntity> toDoLists;

    // Getters and Setters
    public int getScheduleID() {
        return scheduleID;
    }

    public void setScheduleID(int scheduleID) {
        this.scheduleID = scheduleID;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<ToDoListEntity> getToDoLists() {
        return toDoLists;
    }

    public void setToDoLists(List<ToDoListEntity> toDoLists) {
        this.toDoLists = toDoLists;
    }
}
