import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskModel } from 'src/app/core/_models/task.model';

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
  ) {
  }

  handleEdit() {
    this.eventEditClick.emit(this.data)
  }

  handleDetele() {
    this.eventDeleteClick.emit(this.data)
  }
}
