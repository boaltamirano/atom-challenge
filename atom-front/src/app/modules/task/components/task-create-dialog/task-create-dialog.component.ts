import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, finalize, map, of } from 'rxjs';
import { CreateTaskModel, TaskModel } from 'src/app/core/_models/task.model';
import { AppState } from 'src/app/core/_reducers';
import { SaveTask } from 'src/app/core/_reducers/_actions/task.actions';
// import { StoreLoaded } from 'src/app/core/_reducers/_actions/store.actions';
import { LayoutUtilsServices, MessageType } from 'src/app/core/_services/layout-utils.services';
import { TaskService } from 'src/app/core/_services/task.services';
// import { StoresService } from 'src/app/core/_services/stores.services';
import { ScreenLoading } from 'src/app/layout/_reducers/_actions/layout.actions';

@Component({
  selector: 'atom-task-create-dialog',
  templateUrl: './task-create-dialog.component.html',
  styleUrl: './task-create-dialog.component.scss'
})
export class TaskCreateDialogComponent {
  form: FormGroup = new FormGroup({})

  constructor(
    public dialogRef: MatDialogRef<TaskCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>,
    private _layoutUtilsServices: LayoutUtilsServices,
    private _taskService: TaskService,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
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
    this.addData(this.prepareData())
  }

  addData(data: CreateTaskModel) {
    console.log("DATA -> ", data)
    this.store.dispatch(new ScreenLoading({ isLoading: true }))
    this._taskService.createUserTask(data).pipe(
      finalize(() => {
        this.store.dispatch(new ScreenLoading({ isLoading: false }))
      }),
      map((res: TaskModel) => {
        // this._layoutUtilsServices.showNotification(`Se ha registrado el comercio`, MessageType.Sussess, 5000)
        this.dialogRef.close();
        this.store.dispatch(new SaveTask({ task: res }))
      }), catchError((error) => {
        // this._layoutUtilsServices.showNotification(`Ha ocurrido un error al tratar de registrar el comercio`, MessageType.Danger, 5000)
        return of(error)
      })
    ).subscribe()
  }
}
