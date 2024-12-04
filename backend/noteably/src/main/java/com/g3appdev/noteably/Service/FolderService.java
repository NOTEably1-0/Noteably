package com.g3appdev.noteably.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g3appdev.noteably.Entity.FolderEntity;
import com.g3appdev.noteably.Repository.FolderRepository;


@Service
public class FolderService {

    private final FolderRepository folderRepository;

    @Autowired
    public FolderService(FolderRepository folderRepository) {
        this.folderRepository = folderRepository;
    }

    public FolderEntity postFolderRecord(FolderEntity folder) {
        // Ensure studentId is set
        if (folder.getStudentId() == 0) {
            throw new IllegalArgumentException("Student ID must be provided");
        }
        return folderRepository.save(folder);
    }

    public List<FolderEntity> getFolderByStudentId(int studentId) {
        return folderRepository.findByStudentId(studentId);
    }
    public List<FolderEntity> getAllFolders() {
        return folderRepository.findAll();
    }

    public FolderEntity putFolderDetails(int folderId, FolderEntity newFolderDetails) {
        newFolderDetails.setFolderId(folderId);
        return folderRepository.save(newFolderDetails);
    }

    public String deleteFolder(int folderId) {
        folderRepository.deleteById(folderId);
        return "Folder with ID: " + folderId + " deleted successfully.";
    }
}

