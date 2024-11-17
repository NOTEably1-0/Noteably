package com.g3appdev.noteably.noteably.Controller;

import com.g3appdev.noteably.noteably.Entity.ScheduleEntity;
import com.g3appdev.noteably.noteably.Service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/schedule")
public class ScheduleController {

    @Autowired
    private ScheduleService scheduleService;

    // Create
    @PostMapping("/create")
    public ResponseEntity<?> createSchedule(@RequestBody ScheduleEntity schedule) {
        try {
            ScheduleEntity savedSchedule = scheduleService.createSchedule(schedule);
            return ResponseEntity.ok(savedSchedule);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Read all
    @GetMapping("/all")
    public List<ScheduleEntity> getAllSchedules() {
        return scheduleService.getAllSchedules();
    }

    // Read by ID
    @GetMapping("/{id}")
    public ResponseEntity<ScheduleEntity> getScheduleById(@PathVariable int id) {
        ScheduleEntity schedule = scheduleService.getScheduleById(id);
        return schedule != null ? ResponseEntity.ok(schedule) : ResponseEntity.notFound().build();
    }

    // Update
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateSchedule(@PathVariable int id, @RequestBody ScheduleEntity newScheduleDetails) {
        try {
            ScheduleEntity updatedSchedule = scheduleService.updateSchedule(id, newScheduleDetails);
            return updatedSchedule != null ? ResponseEntity.ok(updatedSchedule) : ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Delete
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteSchedule(@PathVariable int id) {
        String response = scheduleService.deleteSchedule(id);
        return response.equals("Deleted successfully.") ?
                ResponseEntity.ok(response) :
                ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    // Get schedules by priority
    @GetMapping("/byPriority/{priority}")
    public List<ScheduleEntity> getSchedulesByPriority(@PathVariable String priority) {
        return scheduleService.getSchedulesByPriority(priority);
    }

    // Get schedules within a date range
    @GetMapping("/byDateRange")
    public List<ScheduleEntity> getSchedulesWithinDateRange(
            @RequestParam String startDate,
            @RequestParam String endDate) {
        return scheduleService.getSchedulesWithinDateRange(startDate, endDate);
    }
}
