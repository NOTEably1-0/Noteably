package com.g3appdev.noteably.Service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g3appdev.noteably.Entity.NoteEntity;
import com.g3appdev.noteably.Repository.NoteRepository;



@Service
public class NoteService {
    @Autowired 
    NoteRepository nrepo;

    public NoteEntity postNoteRecord(NoteEntity note) {
        return nrepo.save(note);
    }

    public List<NoteEntity> getAllNotes() {
        return nrepo.findAll();
    }

    public NoteEntity putNoteDetails(int noteId, NoteEntity newNoteDetails) {
        NoteEntity note = nrepo.findById(noteId)
            .orElseThrow(() -> new NoSuchElementException("Note " + noteId + " not found"));

        
        note.setFolderId(newNoteDetails.getFolderId()); 
        note.setDate(newNoteDetails.getDate());
        note.setTitle(newNoteDetails.getTitle());
        note.setNote(newNoteDetails.getNote()); 

        return nrepo.save(note);
    }

    public String deleteNote(int noteId) {
        NoteEntity note = nrepo.findById(noteId)
            .orElseThrow(() -> new NoSuchElementException("Note with ID " + noteId + " not found"));

        nrepo.delete(note);
        return "Note with ID " + noteId + " has been deleted";
    }
}
