package org.example.quarktask.repository;

import org.example.quarktask.data.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface TaskRepository extends JpaRepository<Task, Long>, JpaSpecificationExecutor<Task> {

    boolean existsByTitleContainingIgnoreCaseAndCompletedFalse(String title);
}
