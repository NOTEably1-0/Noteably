package com.g3appdev.noteably.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "folders")
public class FolderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int folderId;  // Primary key, auto-increment

    @Column(name = "folder_name", nullable = false)
    private String folderName;

    @Column(name = "dashboard_id", nullable = false)  // Adding dashboard_id field
    private int dashboardId;

    // Constructors
    public FolderEntity() {}

    public FolderEntity(String folderName, int dashboardId) {
        this.folderName = folderName;  // Initialize folderName
        this.dashboardId = dashboardId;  // Initialize dashboardId
    }

    // Getters and Setters
    public int getFolderId() {
        return folderId;
    }

    public void setFolderId(int folderId) {
        this.folderId = folderId;
    }

    public String getFolderName() {
        return folderName;
    }

    public void setFolderName(String folderName) {
        this.folderName = folderName;
    }

    public int getDashboardId() {
        return dashboardId;  // Getter for dashboardId
    }

    public void setDashboardId(int dashboardId) {
        this.dashboardId = dashboardId;  // Setter for dashboardId
    }
}

