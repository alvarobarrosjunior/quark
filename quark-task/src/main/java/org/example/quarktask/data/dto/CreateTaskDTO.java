package org.example.quarktask.data.dto;

import lombok.Builder;
import lombok.Data;
import org.example.quarktask.data.enums.Priority;

import java.time.LocalDate;

@Data
@Builder
public class CreateTaskDTO {

    private String title;
    private String description;
    private LocalDate deadline;
    private Priority priority;
    private String owner;
}
