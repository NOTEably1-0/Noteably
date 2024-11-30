package com.g3appdev.noteably.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.g3appdev.noteably.Entity.TimerEntity;


@Repository
public interface TimerRepository extends JpaRepository<TimerEntity, Integer> {
}

