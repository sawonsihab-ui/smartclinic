package com.smartclinic.repository;

import com.smartclinic.entity.LabResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LabResultRepository extends JpaRepository<LabResult, Long> {
    Optional<LabResult> findByLabTestId(Long labTestId);
}
