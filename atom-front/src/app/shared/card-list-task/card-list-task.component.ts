import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TaskModel } from 'src/app/core/_models/task.model';
import { AppState } from 'src/app/core/_reducers';

@Component({
  selector: 'atom-card-list-task',
  templateUrl: './card-list-task.component.html',
  styleUrl: './card-list-task.component.scss'
})
export class CardListTaskComponent {
  @Input() data: TaskModel = new TaskModel();

  @Output() eventEditClick = new EventEmitter<TaskModel>();
  @Output() eventDeleteClick = new EventEmitter<TaskModel>();

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
  }

  handleEdit() {
    // this.store.dispatch(new InappLoaded({ data: this.data }))
    // this.router.navigate(['/connect/inapps', this.data.id, 'edit'])
    this.eventEditClick.emit(this.data)
  }

  handleDetele() {
    this.eventDeleteClick.emit(this.data)
  }
}
