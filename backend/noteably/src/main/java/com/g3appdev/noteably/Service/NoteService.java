package com.g3appdev.noteably.Service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g3appdev.noteably.Entity.NoteEntity;
import com.g3appdev.noteably.Repository.NoteRepository;
import com.g3appdev.noteably.Repository.FolderRepository;  // Assuming you have this repository

@Service
public class NoteService {

    private final NoteRepository noteRepository;
    private final FolderRepository folderRepository;  // FolderRepository for folder validation

    @Autowired
    public NoteService(NoteRepository noteRepository, FolderRepository folderRepository) {
        this.noteRepository = noteRepository;
        this.folderRepository = folderRepository;
    }

    public NoteEntity postNoteRecord(NoteEntity note) {
        if (note.getFolder() == null) {
            throw new IllegalArgumentException("Folder cannot be null for the note");
        }
        // Ensure that folder exists before saving the note
        if (folderRepository.existsById(note.getFolder().getFolderId())) {
            return noteRepository.save(note);
        } else {
            throw new NoSuchElementException("Folder with ID " + note.getFolder().getFolderId() + " not found");
        }
    }

    public List<NoteEntity> getAllNotes() {
        return noteRepository.findAll();
    }

    public NoteEntity putNoteDetails(int noteId, NoteEntity newNoteDetails) {
        NoteEntity note = noteRepository.findById(noteId)
                .orElseThrow(() -> new NoSuchElementException("Note " + noteId + " not found"));

        if (newNoteDetails.getFolder() == null) {
            throw new IllegalArgumentException("Folder cannot be null when updating the note");
        }

        if (!folderRepository.existsById(newNoteDetails.getFolder().getFolderId())) {
            throw new NoSuchElementException("Folder with ID " + newNoteDetails.getFolder().getFolderId() + " not found");
        }

        note.setFolder(newNoteDetails.getFolder());
        note.setDate(newNoteDetails.getDate());
        note.setTitle(newNoteDetails.getTitle());
        note.setNote(newNoteDetails.getNote());

        return noteRepository.save(note);
    }

    public String deleteNote(int noteId) {
        NoteEntity note = noteRepository.findById(noteId)
                .orElseThrow(() -> new NoSuchElementException("Note with ID " + noteId + " not found"));

        noteRepository.delete(note);
        return "Note with ID " + noteId + " has been deleted";
    }
}

