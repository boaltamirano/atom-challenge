import { Component, Input } from '@angular/core';

@Component({
  selector: 'atom-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss'
})
export class ProgressBarComponent {
  @Input() value: boolean = false
}
