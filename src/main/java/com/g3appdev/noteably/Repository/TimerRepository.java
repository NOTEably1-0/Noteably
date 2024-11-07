package com.g3appdev.noteably.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.g3appdev.noteably.entity.TimerEntity;

public interface TimerRepository extends JpaRepository<TimerEntity, Integer> {
}
