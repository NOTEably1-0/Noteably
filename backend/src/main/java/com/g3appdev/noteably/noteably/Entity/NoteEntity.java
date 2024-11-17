package com.g3appdev.noteably.noteably.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class NoteEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int noteId;
    
    private String date;
    private String title;
    private String note;

    // Many notes can be associated with one folder, so folderId is a foreign key
    @JsonBackReference  // Prevents recursion and avoids serializing the folder
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "folderId")  // Ensures that folderId is the foreign key
    private FolderEntity folderId;

    // Getters and Setters
    public int getNoteId() {
        return noteId;
    }

    public void setNoteId(int noteId) {
        this.noteId = noteId;
    }

    public FolderEntity getFolderId() {
        return folderId;
    }

    public void setFolderId(FolderEntity folderId) {
        this.folderId = folderId;
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
