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

import com.g3appdev.noteably.entity.TimerEntity;
import com.g3appdev.noteably.service.TimerService;

@RestController
@RequestMapping("/api/timer")
@CrossOrigin(origins = "http://localhost:3000")
public class TimerController {

    @Autowired
    TimerService timerService;

    // Create Timer
    @PostMapping("/create")
    public TimerEntity createTimer(@RequestBody TimerEntity timer) {
        return timerService.createTimer(timer);
    }

    // Read all Timers
    @GetMapping("/getAll")
    public List<TimerEntity> getAllTimers() {
        return timerService.getAllTimers();
    }
    
    // Read Timer by ID
    @GetMapping("/get/{id}")
    public TimerEntity getTimerById(@PathVariable int id) {
        return timerService.getTimerById(id);
    }

    // Update Timer
    @PutMapping("/update/{id}")
    public TimerEntity updateTimer(@PathVariable int id, @RequestBody TimerEntity newTimerDetails) {
        return timerService.updateTimer(id, newTimerDetails);
    }

    // Delete Timer
    @DeleteMapping("/delete/{id}")
    public String deleteTimer(@PathVariable int id) {
        return timerService.deleteTimer(id);
    }

    // Restart Timer (sets time to 00:00:00)
    @PutMapping("/restart/{id}")
    public TimerEntity restartTimer(@PathVariable int id) {
        TimerEntity timer = timerService.getTimerById(id);
        timer.setHours(0);
        timer.setMinutes(0);
        timer.setSeconds(0);
        return timerService.updateTimer(id, timer);
    }

    // Start Timer (implementation would vary based on frontend or background job)
    @PostMapping("/start/{id}")
    public String startTimer(@PathVariable int id) {
        // This will depend on your actual timer logic.
        return "Timer started";
    }
}
