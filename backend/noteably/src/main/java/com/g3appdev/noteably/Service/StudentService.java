package com.g3appdev.noteably.Service;

import com.g3appdev.noteably.Entity.StudentEntity;
import com.g3appdev.noteably.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepo;

    // Get all students
    public List<StudentEntity> getAllStudents() {
        return studentRepo.findAll();
    }

    // Get a student by their ID
    public StudentEntity getStudentById(int id) {
        return studentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with ID: " + id));
    }

    // Get a student by their custom StudentID
    public StudentEntity getStudentByStudentId(String studentId) {
        return studentRepo.findByStudentId(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found with StudentID: " + studentId));
    }

    // Register (save) a new student with custom StudentID
    public StudentEntity registerStudent(StudentEntity studentEntity) {
        // Log plain password for debugging
        System.out.println("Registering student with password: " + studentEntity.getPassword());

        // Save the entity to assign an auto-increment ID
        StudentEntity savedStudent = studentRepo.save(studentEntity);

        // Generate and set the custom StudentID
        savedStudent.generateStudentId();

        // Save again to update the StudentID in the database
        return studentRepo.save(savedStudent);
    }

    // Update an existing student
    public StudentEntity updateStudent(StudentEntity studentEntity, int id) {
        StudentEntity existingStudent = studentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with ID: " + id));

        // Log plain password for debugging
        System.out.println("Updating student with password: " + studentEntity.getPassword());

        existingStudent.setName(studentEntity.getName());
        existingStudent.setCourse(studentEntity.getCourse());
        existingStudent.setContactNumber(studentEntity.getContactNumber());
        existingStudent.setEmail(studentEntity.getEmail());
        existingStudent.setPassword(studentEntity.getPassword());

        return studentRepo.save(existingStudent);
    }

    // Delete a student by ID
    public String deleteStudent(int id) {
        studentRepo.deleteById(id);
        return "Student deleted successfully";
    }

    // Login student
    public StudentEntity loginStudent(String email, String password) {
        StudentEntity student = studentRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Student not found with email: " + email));
        
        if (!student.getPassword().equals(password)) {
            throw new RuntimeException("Invalid password");
        }
        
        return student;
    }
}
