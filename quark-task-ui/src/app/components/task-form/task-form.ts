import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  @Input() form!: FormGroup;
  @Input() readTask?: boolean = false;
  @Output() formSubmit = new EventEmitter<Task>();


  today = new Date();
  users: KeycloakUser[] = [];
  priorityEnum = Priority;
  priorityKeys = Object.keys(Priority) as Array<keyof typeof Priority>;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.initUserList();
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
