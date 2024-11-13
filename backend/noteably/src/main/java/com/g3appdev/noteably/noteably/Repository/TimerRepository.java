package com.g3appdev.noteably.noteably.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.g3appdev.noteably.noteably.entity.TimerEntity;

public interface TimerRepository extends JpaRepository<TimerEntity, Integer> {
}
