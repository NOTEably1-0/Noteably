package com.g3appdev.noteably.noteably.Entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class FolderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int folderId;

    @Column(name = "title")
    private String title;

    private Integer dashboardId;

    // One folder can have many notes
    @OneToMany(mappedBy = "folderId", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<NoteEntity> notes;

    // Default constructor
    public FolderEntity() {}

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

    public Integer getDashboardId() {
        return dashboardId;
    }

    public void setDashboardId(Integer dashboardId) {
        this.dashboardId = dashboardId;
    }

    public List<NoteEntity> getNotes() {
        return notes;
    }

    public void setNotes(List<NoteEntity> notes) {
        this.notes = notes;
    }

    @Override
    public String toString() {
        return "FolderEntity{folderId=" + folderId + ", title='" + title + "', dashboardId=" + dashboardId + "}";
    }
}
