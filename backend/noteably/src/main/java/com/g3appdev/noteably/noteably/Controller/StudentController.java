package com.g3appdev.noteably.noteably.Controller;

import com.g3appdev.noteably.noteably.Entity.StudentEntity;
import com.g3appdev.noteably.noteably.Service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/student")
public class StudentController {
    @Autowired
    private StudentService studentService;

    /*@Autowired
    private AuthenticationService authenticationService;*/

    @GetMapping("/ping")
    public String test() {
        return "Nigana";

    }

    @GetMapping("/all")
    public List<StudentEntity> getAllStudents() {
        return studentService.getAllStudents();
    }

    /*@PostMapping("/register")
    public StudentEntity registerStudent(@RequestBody StudentEntity studentEntity) {
        return studentService.saveStudent(studentEntity);
    }*/

    @PutMapping("/update")
    public String updateStudent(@RequestBody StudentEntity studentEntity, @RequestParam int id) {
        return studentService.updateStudent(studentEntity,id);
    }

    @DeleteMapping("/delete")
    public String deleteStudent(@RequestParam int id) {
        return studentService.deleteStudent(id);
    }

    /*@PostMapping("/login")
    public AuthenticationResponse createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        return authenticationService.createAuthenticationToken(authenticationRequest);
    }*/
}