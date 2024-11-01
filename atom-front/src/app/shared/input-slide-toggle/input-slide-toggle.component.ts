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
  @Input() required: boolean = true
  @Input() control: FormControl | any = new FormControl();
  @Input() labelClass: string = '';
  @Input() styleClass: string = 'mb-3'

  isControlValid(): boolean {
    const control = this.control;
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(): boolean {
    const control = this.control;
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation: string) {
    const control = this.control;
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(): boolean {
    const control = this.control;
    return control.dirty || control.touched;
  }
}
