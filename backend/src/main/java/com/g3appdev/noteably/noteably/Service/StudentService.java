package com.g3appdev.noteably.noteably.Service;

import com.g3appdev.noteably.noteably.Entity.StudentEntity;
import com.g3appdev.noteably.noteably.Repository.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
public class StudentService {

    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Cacheable("students")
    public List<StudentEntity> getAllStudents() {
        return studentRepo.findAll();
    }

    public StudentEntity saveStudent(StudentEntity studentEntity) {
        studentEntity.setPassword(passwordEncoder.encode(studentEntity.getPassword()));
        return studentRepo.save(studentEntity);
    }

    public StudentEntity getStudentByEmail(String email) {
        return studentRepo.findByEmail(email);
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

    public StudentEntity registerStudent(StudentEntity studentEntity) {
        StudentEntity student = new StudentEntity();
        student.setName(studentEntity.getName());
        student.setEmail(studentEntity.getEmail());
        student.setCourse(studentEntity.getCourse());
        student.setContactNumber(studentEntity.getContactNumber());
        student.setPassword(passwordEncoder.encode(studentEntity.getPassword()));
        return studentRepo.save(student);
    }
}