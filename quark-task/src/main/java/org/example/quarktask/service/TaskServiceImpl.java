package org.example.quarktask.service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.criteria.Predicate;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.example.quarktask.data.dto.CreateTaskDTO;
import org.example.quarktask.data.dto.TaskDTO;
import org.example.quarktask.data.entities.Task;
import org.example.quarktask.data.enums.Priority;
import org.example.quarktask.repository.TaskRepository;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository repository;

    @NonNull
    public TaskDTO getById(Long id) {
        Task task = repository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Tarefa não encontrada!"));
        return toDto(task);
    }

    @NonNull
    public List<TaskDTO> filter(Long id, String titleOrDescription, Priority priority, String owner) {
        List<Task> tasks = repository.findAll(filterTasks(id, titleOrDescription, priority, owner));
        return tasks.stream().map(this::toDto).collect(Collectors.toList());
    }

    private static Specification<Task> filterTasks(Long id, String titleOrDescription, Priority priority, String owner) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (id != null) {
                predicates.add(cb.equal(root.get("id"), id));
            }

            if (titleOrDescription != null && !titleOrDescription.isEmpty()) {
                String pattern = "%" + titleOrDescription.toLowerCase() + "%";
                Predicate titlePredicate = cb.like(cb.lower(root.get("title")), pattern);
                Predicate descPredicate = cb.like(cb.lower(root.get("description")), pattern);
                predicates.add(cb.or(titlePredicate, descPredicate));
            }

            if (priority != null) {
                predicates.add(cb.equal(root.get("priority"), priority.name()));
            }

            if (owner != null && !owner.isEmpty()) {
                predicates.add(cb.equal(root.get("owner"), owner));
            }

            predicates.add(cb.equal(root.get("completed"), false));

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }

    public TaskDTO create(CreateTaskDTO dto) {

        boolean exists = repository.existsByTitleContainingIgnoreCaseAndCompletedFalse(dto.getTitle());
        if (exists) {
            throw new IllegalArgumentException("Já existe uma tarefa com este título");
        }

        Task task = Task.builder()
            .title(dto.getTitle())
            .description(dto.getDescription())
            .priority(dto.getPriority())
            .deadline(dto.getDeadline())
            .owner(dto.getOwner())
            .completed(false)
            .build();

        task = repository.save(task);

        return toDto(task);
    }

    public TaskDTO update(Long id, CreateTaskDTO dto) {
        Task task = repository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Tarefa não encontrada!"));

        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setPriority(dto.getPriority());
        task.setDeadline(dto.getDeadline());
        task.setOwner(dto.getOwner());

        task = repository.save(task);

        return toDto(task);
    }

    public void delete(Long id) {
        Task task = repository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Tarefa não encontrada!"));

        repository.delete(task);
    }

    public TaskDTO completeTask(Long id) {
        Task task = repository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Tarefa não encontrada"));
        task.setCompleted(true);
        repository.save(task);
        return toDto(task);
    }

    private TaskDTO toDto(Task task) {
        return TaskDTO.builder()
            .id(task.getId())
            .title(task.getTitle())
            .description(task.getDescription())
            .owner(task.getOwner())
            .deadline(task.getDeadline())
            .priority(task.getPriority())
            .completed(task.isCompleted())
            .build();
    }
}
