package com.g3appdev.noteably.Service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g3appdev.noteably.Entity.ToDoListEntity;
import com.g3appdev.noteably.Repository.ToDoListRepo;

@Service
public class ToDoListService {
	@Autowired
	ToDoListRepo tdlrepo;
	
	// Create
	public ToDoListEntity postToDoListRecord(ToDoListEntity todolist) {
		return tdlrepo.save(todolist);
	}
	
	// Read
	public List<ToDoListEntity> getAllToDoList() {
		return tdlrepo.findAll();
	}
	
	// Read by ID
    public ToDoListEntity getToDoListById(int id) {
        return tdlrepo.findById(id).orElse(null);
    }
	
	// Update
	public ToDoListEntity putToDoListDetails(int id, ToDoListEntity newToDoListDetails) {
		return tdlrepo.findById(id)
			.map(todolist -> {
				todolist.setTitle(newToDoListDetails.getTitle());
				todolist.setDescription(newToDoListDetails.getDescription());
				todolist.setScheduleID(newToDoListDetails.getScheduleID());
				todolist.setDashboardID(newToDoListDetails.getDashboardID());
				return tdlrepo.save(todolist);
			}).orElseThrow(() -> new NoSuchElementException("ToDoList not found for id: " + id));
	}
	
	// Delete
	public String deleteTodoList(int id) {
		tdlrepo.deleteById(id);
		return "Deleted Successfully";
	}
}