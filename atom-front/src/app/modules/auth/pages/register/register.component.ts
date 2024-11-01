import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { catchError, map, of, Subscription } from 'rxjs';
import { AppState } from 'src/app/core/_reducers';

import { currentUser } from 'src/app/core/_reducers/_selectors/user.selector';
import { Login, Register } from '../../_reducers/_actions/auth.actions';
import { UserRegisterModel } from '../../_models/user-register.model';
import { selectLayoutLoading } from 'src/app/layout/_reducers/_selector/layout.selector';
import { AuthService } from '../../_services/auth.services';
import { AuthModel } from '../../_models/auth.model';
import { LayoutUtilsServices, MessageType } from 'src/app/core/_services/layout-utils.services';


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
    private router: Router,
    private _authService: AuthService,
    private _layoutUtilsServices: LayoutUtilsServices,
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

  onSubmit() {
    if (this.loading) {
      return
    }
    if (this.form.invalid) {
      this.showErrors();
      this.form.markAllAsTouched()
      return
    }

    const userRegister: UserRegisterModel = {
      name: this.form.get('name')?.value,
      lastname: this.form.get('lastname')?.value,
      email: this.form.get('email')?.value
    }

    this._authService.register(userRegister).pipe(
      map((user: AuthModel) => {
        if (user?.token) {
          this.store.dispatch(new Login({ authToken: user?.token, user: user?.user }));
          this.router.navigate(['/task'])
        }
        return user
      }), catchError((error: any) => {
        this._layoutUtilsServices.showNotification('Ha ocurrido un error', MessageType.Danger, 5000)
        return of()
      })).subscribe()

    this.router.navigate(['/task'])

  }

  showErrors() {
    const errors = this.form.controls['username'].errors;
    if (errors?.['required']) {
      alert("El campo 'email' es obligatorio.");
    }
  }

  prepareData(): UserRegisterModel {
    const controls = this.form.controls;
    let data: UserRegisterModel = new UserRegisterModel();
    data.email = controls['email'].value
    data.name = controls['name'].value
    data.lastname = controls['lastname'].value
    return data
  }

  register() {
    this.router.navigate(['/auth/login'])
  }
}
