package com.g3appdev.noteably.noteably.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.g3appdev.noteably.noteably.Entity.NoteEntity;


@Repository
public interface NoteRepository extends JpaRepository<NoteEntity, Integer> {
    public NoteEntity findByTitle(String title);
}
