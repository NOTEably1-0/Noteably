package com.g3appdev.noteably.noteably.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.g3appdev.noteably.noteably.Entity.TimerEntity;

public interface TimerRepository extends JpaRepository<TimerEntity, Integer> {
}
