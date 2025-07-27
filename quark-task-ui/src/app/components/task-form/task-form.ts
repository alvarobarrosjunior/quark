import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../models/task.model';
import {KeycloakUser} from '../../models/user.enum';
import {UserService} from '../../services/user/user';
import {Priority} from '../../models/priority.enum';

@Component({
  selector: 'app-task-form',
  standalone: false,
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss'
})
export class TaskForm implements OnInit {
  @Input() task?: Task;
  @Input() readTask?: boolean = false;
  @Output() formSubmit = new EventEmitter<Task>();

  form!: FormGroup;
  users: KeycloakUser[] = [];
  priorityEnum = Priority;
  priorityKeys = Object.keys(Priority) as Array<keyof typeof Priority>;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit() {
    this.initUserList();

    console.log(this.priorityKeys)

    this.form = this.fb.group({
      id: [this.task?.id ?? null],
      title: [this.task?.title ?? '', Validators.required],
      owner: [this.task?.owner ?? '', Validators.required],
      description: [this.task?.description ?? '', Validators.required],
      priority: [this.task?.priority ?? 'HIGH', Validators.required],
      deadline: [this.task?.deadline ?? '', Validators.required]
    });
  }

  submit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  private initUserList() {
    this.userService.getUsers().subscribe(response => {
      this.users = response;
    });
  }
}
