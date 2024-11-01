import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'atom-toolbar-filter',
  templateUrl: './toolbar-filter.component.html',
  styleUrls: ['./toolbar-filter.component.scss']
})
export class ToolbarFilterComponent {

  @Output() eventAddClick = new EventEmitter<boolean>();
  
  constructor(
    public dialog: MatDialog,
  ) { }

}
