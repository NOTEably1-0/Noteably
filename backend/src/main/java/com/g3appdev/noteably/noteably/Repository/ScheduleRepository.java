package com.g3appdev.noteably.noteably.Repository;

import com.g3appdev.noteably.noteably.Entity.ScheduleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ScheduleRepository extends JpaRepository<ScheduleEntity, Integer> {
}

