import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/core/_reducers';
import { ScreenLoading } from 'src/app/layout/_reducers/_actions/layout.actions';
import { Login } from 'src/app/modules/auth/_reducers/_actions/auth.actions';
import { TaskModel } from 'src/app/core/_models/task.model';
import { TaskCreateDialogComponent } from '../../components/task-create-dialog/task-create-dialog.component';
import { currentIsLoad, currentTaskCompleted, currentTaskPending } from 'src/app/core/_reducers/_selectors/task.selector';

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
    
    // this._layoutUtilsService.showConfirmation({
    //   title: 'Eliminar inapp',
    //   message: `¿Seguro deseas eliminar este inapp "${item.title}"?`
    // }).afterClosed().subscribe(res => {
    //   if (res) {
    //     this.store.dispatch(new InappDeleteRequested({ id: item.id, filters: this.getFilters() }))
    //   }
    // })
  }

  deleteItem(item: TaskModel) {
    // this._layoutUtilsService.showConfirmation({
    //   title: 'Eliminar inapp',
    //   message: `¿Seguro deseas eliminar este inapp "${item.title}"?`
    // }).afterClosed().subscribe(res => {
    //   if (res) {
    //     this.store.dispatch(new InappDeleteRequested({ id: item.id, filters: this.getFilters() }))
    //   }
    // })
  }

  // Desde aqui vale
  handleOpenCreateModal() {
    this.dialog.open(TaskCreateDialogComponent, {
      width: '580px',
      data: {
        // organization_id: this.filterForm.get('organization_id')?.value
      }
    }).afterClosed().subscribe(res => {
      this.loadData()
    });
  }

  loadData() {
    // this.store.dispatch(new StoreLoader({ status: { tableStore: true }}));
    // this.store.dispatch(new StoresListRequested({ filters: { ...this.getFilters() } }))
  }

  trackByParentId(index: number, item: TaskModel): string {
    return item.id;
  }
}
