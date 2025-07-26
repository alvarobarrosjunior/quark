package org.example.quarktask.repository;

import org.example.quarktask.data.entities.Task;
import org.example.quarktask.data.enums.Priority;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByPriority(Priority priority);
    List<Task> findByOwner(String owner);
    List<Task> findByDeadlineBefore(LocalDate deadline);
    boolean existsByTitle(String title);

}
