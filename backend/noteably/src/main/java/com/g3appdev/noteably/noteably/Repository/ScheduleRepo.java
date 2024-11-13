package com.g3appdev.noteably.noteably.Repository;

import com.g3appdev.noteably.noteably.Entity.ScheduleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScheduleRepo extends JpaRepository<ScheduleEntity, Integer> {
    List<ScheduleEntity> findByPriority(String priority);
    List<ScheduleEntity> findByStartDateBetween(String startDate, String endDate);
}

