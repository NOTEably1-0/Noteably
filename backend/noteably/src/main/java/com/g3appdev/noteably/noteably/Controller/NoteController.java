package com.g3appdev.noteably.noteably.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.g3appdev.noteably.noteably.Entity.NoteEntity;
import com.g3appdev.noteably.noteably.Service.NoteService;


@RestController
@CrossOrigin(origins = "http://localhost:3000") 
@RequestMapping("/api/note")
public class NoteController {

    @Autowired  
    NoteService nserv;

    @GetMapping("/print")
    public String print() {
        return "Hello, Firstname Lastname";
    }

    // Create operation
    @PostMapping("/postnoterecord")
    public NoteEntity postNoteRecord(@RequestBody NoteEntity note) {
        return nserv.postNoteRecord(note);
    }

    // Read operation
    @GetMapping("/getAllNotes")
    public List<NoteEntity> getAllNotes() {
        return nserv.getAllNotes();
    }

    // Update operation
    @PutMapping("/putNoteDetails/{noteId}")
    public NoteEntity putNoteDetails(@PathVariable int noteId, @RequestBody NoteEntity newNoteDetails) {
        return nserv.putNoteDetails(noteId, newNoteDetails);
    }

    // Delete operation
    @DeleteMapping("/deleteNoteDetails/{noteId}")
    public String deleteNote(@PathVariable int noteId) {
        return nserv.deleteNote(noteId);
    }
}
