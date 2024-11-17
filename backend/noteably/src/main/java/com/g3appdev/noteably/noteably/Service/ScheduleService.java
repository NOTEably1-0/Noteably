package com.g3appdev.noteably.noteably.Service;

import com.g3appdev.noteably.noteably.Entity.ScheduleEntity;
import com.g3appdev.noteably.noteably.Repository.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Optional;

@Service
public class ScheduleService {

    @Autowired
    private ScheduleRepository scheduleRepository;

    // Create
    public ScheduleEntity createSchedule(ScheduleEntity schedule) {
        validateSchedule(schedule);
        return scheduleRepository.save(schedule);
    }

    // Read all
    public List<ScheduleEntity> getAllSchedules() {
        return scheduleRepository.findAll();
    }

    // Read by ID
    public ScheduleEntity getScheduleById(int id) {
        return scheduleRepository.findById(id).orElse(null);
    }

    // Update
    public ScheduleEntity updateSchedule(int id, ScheduleEntity newScheduleDetails) {
        validateSchedule(newScheduleDetails); // Ensure the updated details are valid
        return scheduleRepository.findById(id).map(schedule -> {
            schedule.setTitle(newScheduleDetails.getTitle());
            schedule.setPriority(newScheduleDetails.getPriority());
            schedule.setColorCode(newScheduleDetails.getColorCode());
            schedule.setStartDate(newScheduleDetails.getStartDate());
            schedule.setEndDate(newScheduleDetails.getEndDate());
            schedule.setDescription(newScheduleDetails.getDescription());
            schedule.setDashboardID(newScheduleDetails.getDashboardID());
            return scheduleRepository.save(schedule);
        }).orElse(null);
    }

    // Delete
    public String deleteSchedule(int id) {
        Optional<ScheduleEntity> schedule = scheduleRepository.findById(id);
        if (schedule.isPresent()) {
            scheduleRepository.deleteById(id);
            return "Deleted successfully.";
        }
        return "Schedule not found.";
    }

    // Get schedules by priority
    public List<ScheduleEntity> getSchedulesByPriority(String priority) {
        return scheduleRepository.findAll()
                .stream()
                .filter(schedule -> priority.equalsIgnoreCase(schedule.getPriority()))
                .toList();
    }

    // Get schedules within a date range
    public List<ScheduleEntity> getSchedulesWithinDateRange(String startDate, String endDate) {
        return scheduleRepository.findAll()
                .stream()
                .filter(schedule -> schedule.getStartDate().compareTo(startDate) >= 0 &&
                                    schedule.getEndDate().compareTo(endDate) <= 0)
                .toList();
    }

    // Validate schedule details
    private void validateSchedule(ScheduleEntity schedule) {
        LocalDate today = LocalDate.now();

        // Validate start date
        try {
            LocalDate scheduleStartDate = LocalDate.parse(schedule.getStartDate());
            if (scheduleStartDate.isBefore(today)) {
                throw new IllegalArgumentException("Schedule start date cannot be in the past.");
            }
        } catch (DateTimeParseException e) {
            throw new IllegalArgumentException("Invalid start date format.");
        }

        // Validate priority
        List<String> validPriorities = List.of("High", "Moderate", "Low");
        if (!validPriorities.contains(schedule.getPriority())) {
            throw new IllegalArgumentException("Invalid priority. Allowed values: High, Moderate, Low.");
        }

        // Validate color code
        List<String> validColors = List.of("#EF476F", "#F78C6B", "#FFD166", "#06D6A0", "#118AB2", "#073B4C");
        if (!validColors.contains(schedule.getColorCode())) {
            throw new IllegalArgumentException("Invalid color code. Please select a valid color.");
        }
    }
}
