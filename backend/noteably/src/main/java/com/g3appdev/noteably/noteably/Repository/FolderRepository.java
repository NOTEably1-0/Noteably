package com.g3appdev.noteably.noteably.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.g3appdev.noteably.noteably.Entity.FolderEntity;

public interface FolderRepository extends JpaRepository<FolderEntity, Integer> {
    // You can add custom query methods here if needed
}
