import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'atom-input-slide-toggle',
  templateUrl: './input-slide-toggle.component.html',
  styleUrl: './input-slide-toggle.component.scss'
})
export class InputSlideToggleComponent {
  @Input() label: string | null = null;
  @Input() subLabel: string | null = null;
  @Input() placeholder: string = '';
  @Input() control: FormControl | any = new FormControl();
  @Input() labelClass: string = '';

  controlHasError(validation: string) {
    const control = this.control;
    return control.hasError(validation) && (control.dirty || control.touched);
  }

}
