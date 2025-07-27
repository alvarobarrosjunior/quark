package org.example.quarktask.service;

import lombok.NonNull;
import org.example.quarktask.data.dto.CreateTaskDTO;
import org.example.quarktask.data.dto.TaskDTO;
import org.example.quarktask.data.enums.Priority;

import java.util.List;

public interface TaskService {

    @NonNull
    TaskDTO getById(Long id);

    @NonNull
    List<TaskDTO> filter(Long id, String titleOrDescription, Priority priority, String owner);

    TaskDTO create(CreateTaskDTO dto);

    TaskDTO update(Long id, CreateTaskDTO dto);

    void delete(Long id);

    TaskDTO completeTask(Long id);
}
