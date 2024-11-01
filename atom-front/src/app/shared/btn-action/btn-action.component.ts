import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'atom-btn-action',
  templateUrl: './btn-action.component.html',
  styleUrl: './btn-action.component.scss'
})
export class BtnActionComponent {
  @Input() color: 'primary' | 'light' | 'outline-primary' | 'outline-secondary' = 'primary'
  @Input() size: 'xs' | 'sm' | 'md' | '' | 'lg' = ''
  @Input() title: string | null = 'Button dropdown'
  @Output() onClick = new EventEmitter<boolean>();

  handleClick() {
    this.onClick.emit(true)
  }
}
