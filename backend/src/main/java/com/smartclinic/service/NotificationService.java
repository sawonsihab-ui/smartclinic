package com.smartclinic.service;

import com.smartclinic.dto.NotificationDto;
import com.smartclinic.entity.Notification;
import com.smartclinic.entity.User;
import com.smartclinic.exception.ResourceNotFoundException;
import com.smartclinic.repository.NotificationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public List<NotificationDto> getUserNotifications(Long userId) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(NotificationDto::new).toList();
    }

    @Transactional
    public void createNotification(User user, String title, String message) {
        if (user == null) return;
        Notification notification = new Notification(user, title, message);
        notificationRepository.save(notification);
    }

    @Transactional
    public NotificationDto markAsRead(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found with id: " + notificationId));
        notification.setIsRead(true);
        Notification saved = notificationRepository.save(notification);
        return new NotificationDto(saved);
    }
}
