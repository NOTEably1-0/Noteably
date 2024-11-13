package com.g3appdev.noteably.noteably.Controller;

import com.g3appdev.noteably.noteably.Entity.ScheduleEntity;
import com.g3appdev.noteably.noteably.Service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/schedules")
public class ScheduleController {

    @Autowired
    private ScheduleService scheduleService;

    // Get all schedules (READ)
    @GetMapping("/getAll")
    public List<ScheduleEntity> getAllSchedules() {
        return scheduleService.getAllSchedules();
    }

    // Get a specific schedule by ID (READ)
    @GetMapping("/getSched/{id}")
    public ResponseEntity<ScheduleEntity> getScheduleById(@PathVariable int id) {
        Optional<ScheduleEntity> schedule = scheduleService.getScheduleById(id);
        return schedule.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create a new schedule (CREATE)
    @PostMapping("/postSched")
    public ScheduleEntity createSchedule(@RequestBody ScheduleEntity schedule) {
        return scheduleService.saveOrUpdate(schedule);
    }

    // Edit an existing schedule (UPDATE)
    @PutMapping("/editSched/{id}")
    public ResponseEntity<ScheduleEntity> editSchedule(@PathVariable int id, @RequestBody ScheduleEntity schedule) {
        Optional<ScheduleEntity> existingSchedule = scheduleService.getScheduleById(id);
        if (existingSchedule.isPresent()) {
            schedule.setScheduleID(id);
            return ResponseEntity.ok(scheduleService.saveOrUpdate(schedule));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a schedule by ID (DELETE)
    @DeleteMapping("/deleteSched/{id}")
    public ResponseEntity<Void> deleteSchedule(@PathVariable int id) {
        if (scheduleService.getScheduleById(id).isPresent()) {
            scheduleService.deleteSchedule(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Get schedules by priority
    @GetMapping("/getByPriority/{priority}")
    public List<ScheduleEntity> getSchedulesByPriority(@PathVariable String priority) {
        return scheduleService.getSchedulesByPriority(priority);
    }

    // Get schedules within a date range
    @GetMapping("/getByDateRange")
    public List<ScheduleEntity> getSchedulesInDateRange(@RequestParam String startDate, @RequestParam String endDate) {
        return scheduleService.getSchedulesInDateRange(startDate, endDate);
    }
}
