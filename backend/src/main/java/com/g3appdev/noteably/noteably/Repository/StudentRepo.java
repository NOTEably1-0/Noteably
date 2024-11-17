package com.g3appdev.noteably.noteably.Repository;

import com.g3appdev.noteably.noteably.Entity.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepo extends JpaRepository<StudentEntity, Integer> {
    StudentEntity findByEmail(String email);
}


