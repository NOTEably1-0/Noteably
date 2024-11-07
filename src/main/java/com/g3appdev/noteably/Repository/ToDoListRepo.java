package com.g3appdev.noteably.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.g3appdev.noteably.Entity.ToDoListEntity;

@Repository
public interface ToDoListRepo extends JpaRepository<ToDoListEntity, Integer> {
	ToDoListEntity findBytodolistID(int todolistID);
    ToDoListEntity findByTitle(String title);
    ToDoListEntity findByDescription(String description);
}