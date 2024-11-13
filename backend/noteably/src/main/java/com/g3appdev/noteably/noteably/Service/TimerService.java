package com.g3appdev.noteably.noteably.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.g3appdev.noteably.noteably.entity.TimerEntity;
import com.g3appdev.noteably.noteably.repository.TimerRepository;

@Service
public class TimerService {

    @Autowired
    TimerRepository timerRepo;

    public TimerEntity createTimer(TimerEntity timer) {
        return timerRepo.save(timer);
    }

    public List<TimerEntity> getAllTimers() {
        return timerRepo.findAll();
    }

    public TimerEntity getTimerById(int id) {
        return timerRepo.findById(id).orElse(null);
    }

    public TimerEntity updateTimer(int id, TimerEntity newTimerDetails) {
        TimerEntity timer = timerRepo.findById(id).orElse(null);
        if (timer != null) {
            timer.setTitle(newTimerDetails.getTitle());
            timer.setHours(newTimerDetails.getHours());
            timer.setMinutes(newTimerDetails.getMinutes());
            timer.setSeconds(newTimerDetails.getSeconds());
            return timerRepo.save(timer);
        }
        return null;
    }

    public String deleteTimer(int id) {
        timerRepo.deleteById(id);
        return "Timer with ID: " + id + " deleted.";
    }
}
