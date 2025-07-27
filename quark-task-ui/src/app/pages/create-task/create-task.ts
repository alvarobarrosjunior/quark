import { Component } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-create-task',
  standalone: false,
  templateUrl: './create-task.html',
  styleUrl: './create-task.css'
})
export class CreateTaskComponent {
  onSubmit(task: Task) {
    // Aqui você pode chamar um serviço para salvar a tarefa
    console.log('Nova tarefa:', task);
    // Redirecionar, mostrar mensagem, etc.
  }
}
