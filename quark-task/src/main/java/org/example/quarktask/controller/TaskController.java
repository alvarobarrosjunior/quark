package org.example.quarktask.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.example.quarktask.data.dto.CreateTaskDTO;
import org.example.quarktask.data.dto.TaskDTO;
import org.example.quarktask.data.enums.Priority;
import org.example.quarktask.service.TaskService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    @Operation(summary = "Tarefa", description = "Busca tarefa por id")
    @ApiResponse(responseCode = "200", description = "Tarefa",
        content = @Content(mediaType = "application/json", schema = @Schema(implementation = TaskDTO.class)))
    @GetMapping("/{id}")
    public TaskDTO getById(@RequestParam Long id) {
        return taskService.getById(id);
    }

    @Operation(summary = "Lista tarefas", description = "Listar tarefa com filtros opcionais")
    @ApiResponse(responseCode = "200", description = "Lista de tarefas",
        content = @Content(mediaType = "application/json", schema = @Schema(implementation = TaskDTO.class)))
    @GetMapping
    public List<TaskDTO> list(
        @RequestParam(required = false) Priority priority,
        @RequestParam(required = false) String owner,
        @RequestParam(required = false) LocalDate deadline
    ) {
        return taskService.filter(priority, owner, deadline);
    }

    @Operation(summary = "Cria uma nova tarefa", description = "Cria uma nova tarefa com os dados fornecidos")
    @ApiResponse(responseCode = "201", description = "Tarefa criada",
        content = @Content(mediaType = "application/json", schema = @Schema(implementation = TaskDTO.class)))
    @ApiResponse(responseCode = "500", description = "Já existe uma tarefa com este título")
    @PostMapping
    public TaskDTO create(@RequestBody CreateTaskDTO dto) {
        return taskService.create(dto);
    }

    @Operation(summary = "Atualiza uma tarefa", description = "Atualiza os dados de uma tarefa existente")
    @ApiResponse(responseCode = "201", description = "Tarefa atualizada",
        content = @Content(mediaType = "application/json", schema = @Schema(implementation = TaskDTO.class)))
    @ApiResponse(responseCode = "404", description = "Tarefa não encontrada")
    @PutMapping("/{id}")
    public TaskDTO update(@RequestParam Long id, @RequestBody CreateTaskDTO dto) {
        return taskService.update(id, dto);
    }

    @Operation(summary = "Deleta uma tarefa", description = "Remove uma tarefa existente")
    @ApiResponse(responseCode = "204", description = "Tarefa deletada")
    @ApiResponse(responseCode = "404", description = "Tarefa não encontrada")
    @PostMapping("/{id}/delete")
    public void delete(@RequestParam Long id) {
        taskService.delete(id);
    }
}
