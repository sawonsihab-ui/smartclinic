package com.smartclinic.repository;

import com.smartclinic.entity.StaffTask;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StaffTaskRepository extends JpaRepository<StaffTask, Long> {
    List<StaffTask> findByAssignedToId(Long userId);
    List<StaffTask> findByStatus(String status);
}
