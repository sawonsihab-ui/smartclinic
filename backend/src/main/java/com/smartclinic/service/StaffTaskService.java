package com.smartclinic.service;

import com.smartclinic.dto.CreateStaffTaskRequest;
import com.smartclinic.dto.StaffTaskDto;
import com.smartclinic.entity.StaffTask;
import com.smartclinic.entity.User;
import com.smartclinic.exception.ResourceNotFoundException;
import com.smartclinic.repository.StaffTaskRepository;
import com.smartclinic.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class StaffTaskService {

    private final StaffTaskRepository staffTaskRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    public StaffTaskService(StaffTaskRepository staffTaskRepository,
                            UserRepository userRepository,
                            NotificationService notificationService) {
        this.staffTaskRepository = staffTaskRepository;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
    }

    @Transactional
    public StaffTaskDto createTask(CreateStaffTaskRequest request, Long assignedByUserId) {
        User assignedTo = null;
        if (request.getAssignedToId() != null) {
            assignedTo = userRepository.findById(request.getAssignedToId()).orElse(null);
        }

        User assignedBy = null;
        if (assignedByUserId != null) {
            assignedBy = userRepository.findById(assignedByUserId).orElse(null);
        }

        StaffTask task = new StaffTask(
                request.getTitle(),
                request.getDescription(),
                assignedTo,
                assignedBy,
                request.getPriority() != null ? request.getPriority() : "MEDIUM",
                "TODO",
                request.getDueDate()
        );

        StaffTask saved = staffTaskRepository.save(task);

        if (assignedTo != null) {
            notificationService.createNotification(assignedTo, "New Task Assigned",
                    "Task: " + request.getTitle() + " (Priority: " + saved.getPriority() + ")");
        }

        return new StaffTaskDto(saved);
    }

    public List<StaffTaskDto> getTasksForUser(Long userId) {
        return staffTaskRepository.findByAssignedToId(userId).stream().map(StaffTaskDto::new).toList();
    }

    public List<StaffTaskDto> getAllTasks() {
        return staffTaskRepository.findAll().stream().map(StaffTaskDto::new).toList();
    }

    @Transactional
    public StaffTaskDto updateTaskStatus(Long taskId, String status) {
        StaffTask task = staffTaskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Staff task not found with id: " + taskId));

        task.setStatus(status);
        StaffTask saved = staffTaskRepository.save(task);
        return new StaffTaskDto(saved);
    }
}
