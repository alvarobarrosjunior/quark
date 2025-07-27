import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-dialog',
  standalone: false,
  templateUrl: './task-dialog.html',
  styleUrls: ['./task-dialog.scss']
})
export class TaskDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task, form: FormGroup }
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(task: Task): void {
    this.dialogRef.close(task);
  }
}
