import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/core/_reducers';
import { ScreenLoading } from 'src/app/layout/_reducers/_actions/layout.actions';
import { TaskModel } from 'src/app/core/_models/task.model';
import { TaskCreateDialogComponent } from '../../components/task-create-dialog/task-create-dialog.component';
import { currentIsLoad, currentTaskCompleted, currentTaskPending } from 'src/app/core/_reducers/_selectors/task.selector';
import { LayoutUtilsServices } from 'src/app/core/_services/layout-utils.services';
import { TaskDeleteRequested } from 'src/app/core/_reducers/_actions/task.actions';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrl: './init.component.scss'
})
export class InitComponent implements OnInit {
  form: FormGroup = new FormGroup({})
  completedTask: TaskModel[] = []
  pendingTask: TaskModel[] = []
  isLoading: boolean = false
  completedTotalTask: number = 0
  pendingTotalTask: number = 0

  private subscriptions: Subscription[] = []

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    public dialog: MatDialog,
    private _layoutUtilsService: LayoutUtilsServices,
  ) { }


  ngOnInit(): void {

    this.subscriptions.push(this.store.pipe(select(currentTaskCompleted)).subscribe(res => {
      this.completedTask = res
      this.completedTotalTask = res.length
    })
    );

    this.subscriptions.push(this.store.pipe(select(currentTaskPending))
      .subscribe(res => {
        this.pendingTask = res
        this.pendingTotalTask = res.length
      })
    );

    this.subscriptions.push(this.store.pipe(select(currentIsLoad)).subscribe(res => {
      this.isLoading = res
    }))

    this.createForm();

  }

  createForm() {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.email]]
    });
  }

  showErrors() {
    const errors = this.form.controls['username'].errors;
    if (errors?.['required']) {
      alert("El campo 'username' es obligatorio.");
    }
  }

  editItem(task: TaskModel) {
    console.log(task)

    this.dialog.open(TaskCreateDialogComponent, {
      width: '580px',
      data: task
    }).afterClosed().subscribe(res => {
    });
  }

  deleteItem(task: TaskModel) {
    this._layoutUtilsService.showConfirmation({
      title: 'Eliminar tarea',
      message: `Esta acción no podra revertirce. ¿Seguro deseas eliminar esta tarea?`
    }).afterClosed().subscribe(res => {
      if (res) {
        this.store.dispatch(new TaskDeleteRequested({ taskId: task.id }))
      }
    })
  }

  handleOpenCreateModal() {
    this.dialog.open(TaskCreateDialogComponent, {
      width: '580px',
      data: {}
    }).afterClosed().subscribe(res => {
    });
  }

  trackByParentId(index: number, item: TaskModel): string {
    return item.id;
  }
}
