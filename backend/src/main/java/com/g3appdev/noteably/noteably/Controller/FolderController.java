package com.g3appdev.noteably.noteably.Controller;


import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.g3appdev.noteably.noteably.Entity.FolderEntity;
import com.g3appdev.noteably.noteably.Service.FolderService;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/folders")
public class FolderController {

    @Autowired
    private FolderService folderService;

    // Test endpoint to check if the API is working
    @GetMapping("/print")
    public String print() {
        return "Hello, Firstname Lastname";
    }

    // Create a new folder
    @PostMapping("/postFolderRecord")
    public FolderEntity postFolderRecord(@RequestBody FolderEntity folder) {
        return folderService.postFolderRecord(folder);
    }

    // Get all folders
    @GetMapping("/getAllFolders")
    public List<FolderEntity> getAllFolders() {
        return folderService.getAllFolders();
    }

    // Update a folder by ID
    @PutMapping("/putFolderDetails/{id}")
    public FolderEntity putFolderDetails(@PathVariable int id, @RequestBody FolderEntity folder) {
        return folderService.putFolderDetails(id, folder);
    }

    // Delete a folder by ID
    @DeleteMapping("/deleteFolder/{id}")
    public String deleteFolder(@PathVariable int id) {
        return folderService.deleteFolder(id);
    }
}