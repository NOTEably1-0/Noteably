package com.g3appdev.noteably.noteably.Service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g3appdev.noteably.noteably.Entity.NoteEntity;
import com.g3appdev.noteably.noteably.Entity.FolderEntity;
import com.g3appdev.noteably.noteably.Repository.NoteRepository;
import com.g3appdev.noteably.noteably.Repository.FolderRepository;

@Service
public class NoteService {
    @Autowired 
    NoteRepository nrepo;
    
    @Autowired
    FolderRepository frepo; // Ensure FolderRepository is injected

    public NoteEntity postNoteRecord(NoteEntity note) {
        // Ensure folder is saved first if it's not already in the database
        FolderEntity folder = note.getFolderId();
        if (folder != null) {
            // Save the folder if it's not already persisted
            FolderEntity savedFolder = frepo.save(folder); 
            note.setFolderId(savedFolder);  // Set the folder to the note
        }

        // Now save the note with the associated folder
        return nrepo.save(note);
    }

    public List<NoteEntity> getAllNotes() {
        return nrepo.findAll();
    }

    public NoteEntity putNoteDetails(int noteId, NoteEntity newNoteDetails) {
        NoteEntity note = nrepo.findById(noteId)
            .orElseThrow(() -> new NoSuchElementException("Note " + noteId + " not found"));

        // Ensure folder is saved before associating with the note
        FolderEntity folder = newNoteDetails.getFolderId();
        if (folder != null) {
            // Save the folder if it's not already persisted
            FolderEntity savedFolder = frepo.save(folder); 
            note.setFolderId(savedFolder);  // Set the folder to the note
        }

        // Update other note details
        note.setDate(newNoteDetails.getDate());
        note.setTitle(newNoteDetails.getTitle());
        note.setNote(newNoteDetails.getNote());

        // Save and return the updated note
        return nrepo.save(note);
    }

    public String deleteNote(int noteId) {
        NoteEntity note = nrepo.findById(noteId)
            .orElseThrow(() -> new NoSuchElementException("Note with ID " + noteId + " not found"));

        nrepo.delete(note);
        return "Note with ID " + noteId + " has been deleted";
    }
}
