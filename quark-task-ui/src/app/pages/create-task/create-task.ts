import {Component, OnInit} from '@angular/core';
import { Task } from '../../models/task.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TaskService} from '../../services/task/task';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-task',
  standalone: false,
  templateUrl: './create-task.html',
  styleUrl: './create-task.css'
})
export class CreateTaskComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService, private snackBar: MatSnackBar) {
  }


  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(task: Task) {
    this.taskService.addTask(task).subscribe({
      next: () => this.snackBar.open('Tarefa criada com sucesso!', 'Fechar', { duration: 3000, panelClass: ['snackbar-success'] }),
      error: () => this.snackBar.open('Erro ao criar tarefa.', 'Fechar', { duration: 3000, panelClass: ['snackbar-error'] })
    });
  }

  private initForm() {
    this.form = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      owner: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['HIGH', Validators.required],
      deadline: [ '', Validators.required]
    });
  }
}
