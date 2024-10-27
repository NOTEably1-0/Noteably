package com.g3appdev.noteably.Service;

import com.g3appdev.noteably.Entity.StudentEntity;
import com.g3appdev.noteably.Repository.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<StudentEntity> getAllStudents() {
        return studentRepo.findAll();
    }

    public StudentEntity saveStudent(StudentEntity studentEntity) {
        studentEntity.setPassword(passwordEncoder.encode(studentEntity.getPassword()));
        return studentRepo.save(studentEntity);
    }

    public String updateStudent(StudentEntity studentEntity, int id) {
        StudentEntity existingStudent = studentRepo.findById(id).orElseThrow(() -> new RuntimeException("Student not found"));
        existingStudent.setName(studentEntity.getName());
        existingStudent.setEmail(studentEntity.getEmail());
        existingStudent.setPassword(passwordEncoder.encode(studentEntity.getPassword()));
        studentRepo.save(existingStudent);
        return "Student updated successfully";
    }

    public String deleteStudent(int id) {
        studentRepo.deleteById(id);
        return "Student deleted successfully";
    }
}