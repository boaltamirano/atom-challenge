import { Overlay } from '@angular/cdk/overlay';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'atom-circular-button',
  templateUrl: './circular-button.component.html',
  styleUrls: ['./circular-button.component.scss']
})
export class CircularButtonComponent {
  @Input() title: string | null = null
  @Input() icon: string = ''
  @Input() size: 'xs' | 'sm' | 'md'  = 'md'

  @Input() color: 'dark' | 'primary' | 'light' = 'light'
  @Input() valueOrder?: number
  @Output() onClick = new EventEmitter<boolean>();

  handleClick() {
    this.onClick.emit(true)
  }
}
