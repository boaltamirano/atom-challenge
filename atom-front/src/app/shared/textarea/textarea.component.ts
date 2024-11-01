import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'atom-textarea',
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss'
})
export class TextareaComponent {
  @Input() label: string = '';
  @Input() subLabel!: string;
  @Input() placeholder: string = '';
  @Input() nameField!: string;
  @Input() required: boolean = true
  @Input() control: FormControl | any = new FormControl();
  @Input() maxlength: number | null = null;
  @Input() minlength: number | null = null
  @Input() labelClass: string = '';

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
