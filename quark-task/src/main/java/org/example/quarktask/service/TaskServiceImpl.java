package org.example.quarktask.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.example.quarktask.data.dto.CreateTaskDTO;
import org.example.quarktask.data.dto.TaskDTO;
import org.example.quarktask.data.entities.Task;
import org.example.quarktask.data.enums.Priority;
import org.example.quarktask.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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
    public List<TaskDTO> listAll() {
        return repository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @NonNull
    public List<TaskDTO> filter(Priority priority, String owner, LocalDate deadline) {
        List<Task> tasks = repository.findAll();
        return tasks.stream()
            .filter(t -> priority == null || t.getPriority() == priority)
            .filter(t -> owner == null || t.getOwner().equals(owner))
            .filter(t -> deadline == null || t.getDeadline().isBefore(deadline))
            .map(this::toDto)
            .collect(Collectors.toList());
    }

    public TaskDTO create(CreateTaskDTO dto) {

        boolean exists = repository.existsByTitle(dto.getTitle());
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
