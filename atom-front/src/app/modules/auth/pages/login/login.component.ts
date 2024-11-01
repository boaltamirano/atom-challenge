import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { catchError, finalize, map, of, Subscription } from 'rxjs';
import { AppState } from 'src/app/core/_reducers';
import { currentUser } from 'src/app/core/_reducers/_selectors/user.selector';
import { ScreenLoading } from 'src/app/layout/_reducers/_actions/layout.actions';
import { Login } from '../../_reducers/_actions/auth.actions';
import { AuthService } from '../../_services/auth.services';
import { LayoutUtilsServices, MessageType } from 'src/app/core/_services/layout-utils.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({})
  hide: boolean = true;
  loading: boolean = false;

  private subscriptions: Subscription[] = []

  constructor(
    private _layoutUtilsServices: LayoutUtilsServices,
    private fb: FormBuilder,
    private _authService: AuthService,
    private store: Store<AppState>,
    private router: Router,
  ) { }


  ngOnInit(): void {
    this.createForm();

    const userSub = this.store.pipe(select(currentUser))
      .subscribe((res: any) => {
        if (res && res.user_id) {
          this.router.navigate(['/'])
        }
      })
    this.subscriptions.push(userSub);

  }

  createForm() {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.email]]
    });
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
    let username = this.form.get('username')?.value;
    this._authService.login(username).pipe(
      finalize(() => {
        this.store.dispatch(new ScreenLoading({ isLoading: false }))
      }),
      map(user => {
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

  register() {
    this.router.navigate(['/auth/register'])
  }

}
