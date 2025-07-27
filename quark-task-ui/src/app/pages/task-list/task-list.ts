import {Component, OnInit, ViewChild} from '@angular/core';
import {TaskService} from '../../services/task/task';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Task} from '../../models/task.model';
import {MatTableDataSource} from '@angular/material/table';
import {UserService} from '../../services/user/user';
import {KeycloakUser} from '../../models/user.enum';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Priority} from '../../models/priority.enum';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TaskDialogComponent} from '../../components/task-dialog/task-dialog';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss'
})
export class TaskListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'owner', 'actions'];
  dataSource = new MatTableDataSource<Task>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  users: KeycloakUser[] = [];
  filterForm!: FormGroup;
  priorityKeys = Object.keys(Priority) as Array<keyof typeof Priority>;

  constructor(private fb: FormBuilder, private taskService: TaskService, private userService: UserService,
              private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.initUserList();

    this.initFilterForm();

    this.taskService.getTasks().subscribe(tasks => {
      this.dataSource.data = tasks;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  initFilterForm() {
    this.filterForm = this.fb.group({
      id: [''],
      titleOrDescription: [''],
      owner: [''],
      priority: [''],
    });
  }

  private initUserList() {
    this.userService.getUsers().subscribe(response => {
      this.users = response;
    });
  }

  getOwnerName(ownerId: string): string {
    const user = this.users.find(u => u.username === ownerId);
    return user ? `${user.firstName} ${user.lastName}` : ownerId;
  }

  applyFilters() {
    this.taskService.getTasks(this.filterForm.value).subscribe(tasks => {
      this.dataSource.data = tasks;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  editTask(task: Task) {

    const form = this.fb.group({
      id: [task.id],
      title: [task.title, Validators.required],
      description: [task.description],
      owner: [task.owner, Validators.required],
      priority: [task.priority, Validators.required],
      deadline: [task.deadline ?? '', Validators.required]
    });

    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '80%',
      maxWidth: 'none',
      data: { task, form }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // result é a tarefa editada vinda do dialog
        this.taskService.updateTask(task.id , result).subscribe({
          next: () => {
            this.snackBar.open('Tarefa atualizada com sucesso!', 'Fechar', {
              duration: 3000,
            });
            this.applyFilters()
          },
          error: () => {
            this.snackBar.open('Erro ao atualizar tarefa.', 'Fechar', {
              duration: 3000,
            });
          }
        });
      }
    });
  }

  removeTask(task: Task) {
    this.taskService.deleteTask(task.id).subscribe({
      next: () => {
        this.snackBar.open('Tarefa removida com sucesso!', 'Fechar', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
        this.applyFilters();
      },
      error: () => {
        this.snackBar.open('Erro ao remover tarefa.', 'Fechar', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    })
  }

  concludeTask(task: Task) {
    this.taskService.completeTask(task.id).subscribe({
      next: () => {
        this.snackBar.open('Tarefa concluída com sucesso!', 'Fechar', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
        this.applyFilters();
      },
      error: () => {
        this.snackBar.open('Erro ao concluir tarefa.', 'Fechar', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    })
  }

  protected readonly priorityEnum = Priority;
}
