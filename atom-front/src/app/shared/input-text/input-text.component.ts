import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'atom-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent {
  @Input() label: string | null = null;
  @Input() subLabel!: string;
  @Input() formGroup: FormGroup | any = new FormGroup({})
  @Input() placeholder: string = '';
  @Input() nameField!: string;
  @Input() required: boolean = true
  @Input() control: FormControl | any = new FormControl();
  @Input() styleClass: string = 'mb-3'
  @Input() maxlength: number | null = null
  @Input() minlength: number | null = null
  @Input() labelClass: string = '';
  @Input() labelBottom: string | null = null
  @Output() keyupEvent = new EventEmitter<any>();

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