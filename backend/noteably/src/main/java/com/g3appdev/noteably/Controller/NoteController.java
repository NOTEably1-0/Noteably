package com.g3appdev.noteably.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.g3appdev.noteably.Entity.NoteEntity;
import com.g3appdev.noteably.Service.NoteService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/note")  // Make sure this is consistent with React
public class NoteController {

    @Autowired
    private NoteService noteservice;

    @GetMapping("/print")
    public String print() {
        return "Hello, Firstname Lastname";
    }

    // Create operation
    @PostMapping("/postnoterecord")
    public NoteEntity postNoteRecord(@RequestBody NoteEntity note) {
        return noteservice.postNoteRecord(note);
    }

    // Read operation
    @GetMapping("/getAllNotes")
    public List<NoteEntity> getAllNotes() {
        return noteservice.getAllNotes();
    }

     // Read all Note for a specific student

    // Update operation
    @PutMapping("/putNoteDetails/{id}")
    public NoteEntity putNoteDetails(@PathVariable int id, @RequestBody NoteEntity newNoteDetails) {
        return noteservice.putNoteDetails(id, newNoteDetails);
    }

    // Delete operation
    @DeleteMapping("/deleteNoteDetails/{id}")
    public String deleteNote(@PathVariable int id) {
        return noteservice.deleteNote(id);
    }
}
