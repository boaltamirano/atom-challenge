import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/core/_reducers';

import { currentUser } from 'src/app/core/_reducers/_selectors/user.selector';
import { Register } from '../../_reducers/_actions/auth.actions';
import { UserRegisterModel } from '../../_models/user-register.model';
import { selectLayoutLoading } from 'src/app/layout/_reducers/_selector/layout.selector';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({})
  hide: boolean = true;
  loading: boolean = false;
  visible: boolean = true;
  private subscriptions: Subscription[] = []

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();

    const userSub = this.store.pipe(select(currentUser))
      .subscribe(res => {
        if (res && res.id) {
          this.router.navigate(['/'])
        }
      })
    this.subscriptions.push(userSub);

    this.subscriptions.push(
      this.store.pipe(select(selectLayoutLoading)).subscribe(res => {
        this.loading = res
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  createForm() {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }
  getFormGruop(form: FormGroup, key: string): FormGroup {
    return form.controls[key] as FormGroup;
  }

  validation(validation: string, controlName: string): boolean {
    const control = this.form.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched)
  }

  onVisibleChange(eventValue: boolean) {
    this.visible = eventValue;
  }

  onSubmit() {
    if (this.loading) {
      return
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }
    const data: UserRegisterModel = this.prepareData()
    this.store.dispatch(new Register({ user: data }))
  }


  prepareData(): UserRegisterModel {
    const controls = this.form.controls;
    let data: UserRegisterModel = new UserRegisterModel();
    data.email = controls['email'].value
    data.name = controls['name'].value
    data.lastname = controls['lastname'].value
    return data
  }
}
