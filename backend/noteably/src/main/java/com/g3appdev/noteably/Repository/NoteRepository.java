package com.g3appdev.noteably.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.g3appdev.noteably.Entity.NoteEntity;



@Repository
public interface NoteRepository extends JpaRepository<NoteEntity, Integer> {
    public NoteEntity findByTitle(String title);
}
