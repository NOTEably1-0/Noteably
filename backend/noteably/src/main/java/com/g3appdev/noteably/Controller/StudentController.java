package com.g3appdev.noteably.Controller;

import com.g3appdev.noteably.Entity.StudentEntity;
import com.g3appdev.noteably.Service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React app
public class StudentController {

    @Autowired
    private StudentService studentService;

    // Get all students
    @GetMapping
    public List<StudentEntity> getAllStudents() {
        return studentService.getAllStudents();
    }

    // Get a student by their ID
    @GetMapping("/{id}")
    public StudentEntity getStudentById(@PathVariable int id) {
        return studentService.getStudentById(id);
    }

    // Get a student by their custom StudentID
    @GetMapping("/find/{studentId}")
    public StudentEntity getStudentByStudentId(@PathVariable String studentId) {
        return studentService.getStudentByStudentId(studentId);
    }

    // Register a new student
    @PostMapping("/register")
    public StudentEntity registerStudent(@RequestBody StudentEntity studentEntity) {
        return studentService.registerStudent(studentEntity);
    }

    // Update an existing student
    @PutMapping("/{id}")
    public StudentEntity updateStudent(@RequestBody StudentEntity studentEntity, @PathVariable int id) {
        return studentService.updateStudent(studentEntity, id);
    }

    // Delete a student by ID
    @DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable int id) {
        return studentService.deleteStudent(id);
    }
}
