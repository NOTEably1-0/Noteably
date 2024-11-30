package com.g3appdev.noteably.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;

@Entity
public class NoteEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int noteId;

    private String date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "folderId") // Foreign key to FolderEntity
    @JsonBackReference  // Prevents infinite recursion by not serializing this part
    private FolderEntity folder;

    private String note;
    private String title;

    // Default constructor
    public NoteEntity() {
        super();
    }

    // Getters and Setters
    public int getNoteId() {
        return noteId;
    }

    public void setNoteId(int noteId) {
        this.noteId = noteId;
    }

    public FolderEntity getFolder() {
        return folder;
    }

    public void setFolder(FolderEntity folder) {
        this.folder = folder;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
