package org.example.quarktask.service;

import lombok.NonNull;
import org.example.quarktask.data.dto.CreateTaskDTO;
import org.example.quarktask.data.dto.TaskDTO;
import org.example.quarktask.data.enums.Priority;

import java.time.LocalDate;
import java.util.List;

public interface TaskService {

    @NonNull
    TaskDTO getById(Long id);

    @NonNull
    List<TaskDTO> filter(Priority priority, String owner, LocalDate deadline);

    TaskDTO create(CreateTaskDTO dto);

    TaskDTO update(Long id, CreateTaskDTO dto);

    void delete(Long id);
}
