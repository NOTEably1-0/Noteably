package com.g3appdev.noteably.Entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.util.List;

@Entity
public class FolderEntity {

    @Id
    private int folderId;
    private String title;

    @OneToMany(mappedBy = "folder")
    @JsonManagedReference  // Manages the serialization of this list
    private List<NoteEntity> notes;

    // Default constructor
    public FolderEntity() {
        super();
    }

    // Getters and Setters
    public int getFolderId() {
        return folderId;
    }

    public void setFolderId(int folderId) {
        this.folderId = folderId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<NoteEntity> getNotes() {
        return notes;
    }

    public void setNotes(List<NoteEntity> notes) {
        this.notes = notes;
    }
}
