import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'atom-input-email',
  templateUrl: './input-email.component.html',
  styleUrls: ['./input-email.component.scss']
})
export class InputEmailComponent {
  @Input() label: string = 'Correo electrónico';
  @Input() control: FormControl | any = new FormControl();
  @Input() placeholder: string = 'Correo electrónico';
  @Input() required: boolean = true
  @Input() inputClass: string = '';
  @Input() labelClass: string = 'p-grey d-block';

  isControlInvalid(): boolean {
    const control = this.control;
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation: string) {
    const control = this.control;
    return control.hasError(validation) && (control.dirty || control.touched);
  }

}
