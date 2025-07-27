package org.example.quarktask.data.dto;

import lombok.Builder;
import lombok.Data;
import org.example.quarktask.data.enums.Priority;

import java.time.LocalDateTime;

@Data
@Builder
public class TaskDTO {

    private Long id;
    private String title;
    private String description;
    private String owner;
    private LocalDateTime deadline;
    private Priority priority;
    private boolean completed;
}
