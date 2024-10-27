package com.g3appdev.noteably.Controller;

import com.g3appdev.noteably.Entity.StudentEntity;
import com.g3appdev.noteably.Service.AuthenticationService;
import com.g3appdev.noteably.JWT.AuthenticationRequest;
import com.g3appdev.noteably.JWT.AuthenticationResponse;
import com.g3appdev.noteably.Service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/student")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @Autowired
    private AuthenticationService authenticationService;

    @GetMapping("/all")
    public List<StudentEntity> getAllStudents() {
        return studentService.getAllStudents();
    }

    @PostMapping("/add")
    public StudentEntity addStudent(@RequestBody StudentEntity studentEntity) {
        return studentService.saveStudent(studentEntity);
    }

    @PutMapping("/update")
    public String updateStudent(@RequestBody StudentEntity studentEntity, @RequestParam int id) {
        return studentService.updateStudent(studentEntity,id);
    }

    @DeleteMapping("/delete")
    public String deleteStudent(@RequestParam int id) {
        return studentService.deleteStudent(id);
    }

    @PostMapping("/login")
    public AuthenticationResponse createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        return authenticationService.createAuthenticationToken(authenticationRequest);
    }

    //Kupal si Carla
}
