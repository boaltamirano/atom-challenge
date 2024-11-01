import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { CreateTaskModel, TaskModel } from 'src/app/core/_models/task.model';
import { AppState } from 'src/app/core/_reducers';
import { TaskCreateRequested, TaskUpdateRequested } from 'src/app/core/_reducers/_actions/task.actions';
import { ScreenLoading } from 'src/app/layout/_reducers/_actions/layout.actions';

@Component({
  selector: 'atom-task-create-dialog',
  templateUrl: './task-create-dialog.component.html',
  styleUrl: './task-create-dialog.component.scss'
})
export class TaskCreateDialogComponent {
  form: FormGroup = new FormGroup({})
  updateTask: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<TaskCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskModel,
    private fb: FormBuilder,
    private store: Store<AppState>,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    if (this.data.id) {
      this.updateTask = true
    }
    this.createForm(this.data)
  }

  createForm(data: TaskModel) {
    if (data.id) {
      this.form = this.fb.group({
        title: [data.title, [Validators.required, Validators.minLength(3)]],
        description: [data.description, [Validators.required, Validators.minLength(3)]],
        statusComplete: [data.statusComplete],
      })
      return
    }
    this.form = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(3)]],
      description: ["", [Validators.required, Validators.minLength(3)]],
      statusComplete: [false],
    })
  }

  prepareData(): CreateTaskModel {
    return this.form.value
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }

    if (this.data.id) {
      this.updateData(this.data, this.prepareData())
      return
    }
    this.addData(this.prepareData())
  }

  addData(data: CreateTaskModel) {
    this.store.dispatch(new ScreenLoading({ isLoading: true }))
    this.dialogRef.close();
    this.store.dispatch(new TaskCreateRequested({ task: data }))
  }

  updateData(taskSelected: TaskModel, data: CreateTaskModel) {
    this.store.dispatch(new ScreenLoading({ isLoading: true }))
    this.dialogRef.close();
    this.store.dispatch(new TaskUpdateRequested({ task: data, taskId: taskSelected.id }))
  }
}
