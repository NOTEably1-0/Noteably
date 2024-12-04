package com.g3appdev.noteably.Service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g3appdev.noteably.Entity.ScheduleEntity;
import com.g3appdev.noteably.Entity.ToDoListEntity;
import com.g3appdev.noteably.Repository.ToDoListRepository;
import com.g3appdev.noteably.Repository.ScheduleRepository;

@Service
public class ToDoListService {
    @Autowired
    ToDoListRepository tdlrepo;
    
    @Autowired
    ScheduleRepository scheduleRepo;
    
    // Create
public ToDoListEntity postToDoListRecord(ToDoListEntity todolist) {
    // Ensure studentId is set
    if (todolist.getStudentId() == 0) {
        throw new IllegalArgumentException("Student ID must be provided");
    }
    
    // If there's a schedule, fetch and set it
    if (todolist.getSched() != null && todolist.getSched().getScheduleID() != 0) {
        ScheduleEntity schedule = scheduleRepo.findById(todolist.getSched().getScheduleID())
            .orElseThrow(() -> new NoSuchElementException("Schedule not found"));
        todolist.setSched(schedule);
        System.out.println("Setting schedule: " + schedule.getScheduleID()); // Add logging
    }
    
    ToDoListEntity saved = tdlrepo.save(todolist);
    System.out.println("Saved todo with schedule: " + (saved.getSched() != null ? saved.getSched().getScheduleID() : "null")); // Add logging
    return saved;
}
    
    // Read
    public List<ToDoListEntity> getAllToDoList() {
        return tdlrepo.findAll();
    }
    
    // Read by ID
    public ToDoListEntity getToDoListById(int id) {
        return tdlrepo.findById(id).orElse(null);
    }
    
    public List<ToDoListEntity> getToDoByStudentId(int studentId) {
        return tdlrepo.findByStudentId(studentId);
    }
    
    // Update
    public ToDoListEntity putToDoListDetails(int id, ToDoListEntity newToDoListDetails) {
        return tdlrepo.findById(id)
            .map(todolist -> {
                todolist.setTitle(newToDoListDetails.getTitle());
                todolist.setDescription(newToDoListDetails.getDescription());
                
                // Handle schedule update
                if (newToDoListDetails.getSched() != null && newToDoListDetails.getSched().getScheduleID() != 0) {
                    ScheduleEntity schedule = scheduleRepo.findById(newToDoListDetails.getSched().getScheduleID())
                        .orElseThrow(() -> new NoSuchElementException("Schedule not found"));
                    todolist.setSched(schedule);
                    System.out.println("Updating schedule: " + schedule.getScheduleID()); // Add logging
                } else {
                    todolist.setSched(null);
                    System.out.println("Clearing schedule"); // Add logging
                }
                
                ToDoListEntity saved = tdlrepo.save(todolist);
                System.out.println("Updated todo with schedule: " + (saved.getSched() != null ? saved.getSched().getScheduleID() : "null")); // Add logging
                return saved;
            }).orElseThrow(() -> new NoSuchElementException("ToDoList not found for id: " + id));
    }
    
    // Delete
    public String deleteTodoList(int id) {
        tdlrepo.deleteById(id);
        return "Deleted Successfully";
    }
}
