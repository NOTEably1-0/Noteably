package com.g3appdev.noteably.Service;

import com.g3appdev.noteably.Entity.ScheduleEntity;
import com.g3appdev.noteably.Repository.ScheduleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ScheduleService {

    @Autowired
    private ScheduleRepo scheduleRepository;

    // Create or Update Schedule
    public ScheduleEntity saveOrUpdate(ScheduleEntity schedule) {
        return scheduleRepository.save(schedule);
    }

    // Get all schedules
    public List<ScheduleEntity> getAllSchedules() {
        return scheduleRepository.findAll();
    }

    // Get a specific schedule by ID
    public Optional<ScheduleEntity> getScheduleById(int id) {
        return scheduleRepository.findById(id);
    }

    // Delete a schedule by ID
    public void deleteSchedule(int id) {
        scheduleRepository.deleteById(id);
    }

    // Get schedules by priority
    public List<ScheduleEntity> getSchedulesByPriority(String priority) {
        return scheduleRepository.findByPriority(priority);
    }

    // Get schedules within a date range
    public List<ScheduleEntity> getSchedulesInDateRange(String startDate, String endDate) {
        return scheduleRepository.findByStartDateBetween(startDate, endDate);
    }
}
