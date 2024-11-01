import { Component, Input } from '@angular/core';

@Component({
  selector: 'atom-rounded-button-xl',
  templateUrl: './rounded-button-xl.component.html',
  styleUrls: ['./rounded-button-xl.component.scss']
})
export class RoundedButtonXlComponent {
  @Input() title?: string
  @Input() color?: string

}
