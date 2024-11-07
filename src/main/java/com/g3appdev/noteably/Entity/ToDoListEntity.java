package com.g3appdev.noteably.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class ToDoListEntity {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int todolistID;
	
	private int dashboardID;
	private String title;
	private int scheduleID; // ScheduleEntity which displays the schedule to do the tasks
	private String description;
	
	public void setToDoListID(int todolistID) {
		this.todolistID = todolistID;
	}
	
	public void setDashboardID(int dashboardID) {
		this.dashboardID = dashboardID;
	}
	
	public void setTitle(String title) {
		this.title = title;
	}
	
	public void setScheduleID(int scheduleID) {
		this.scheduleID = scheduleID;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
	
	public int getToDoListID() {
		return todolistID;
	}
	
	public int getDashboardID() {
		return dashboardID;
	}
	
	public String getTitle() {
		return title;
	}
	
	public int getScheduleID() {
		return scheduleID;
	}
	
	public String getDescription() {
		return description;
	}
}