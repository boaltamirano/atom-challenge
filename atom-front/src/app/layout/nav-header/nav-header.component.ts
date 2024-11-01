import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/core/_models/user.model';
import { AppState } from 'src/app/core/_reducers';
import { currentUser } from 'src/app/core/_reducers/_selectors/user.selector';
import { Logout } from 'src/app/modules/auth/_reducers/_actions/auth.actions';
import { AuthService } from 'src/app/modules/auth/_services/auth.services';

@Component({
  selector: 'atom-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss']
})
export class NavHeaderComponent {

  user: UserModel = new UserModel()
  private subscriptions: Subscription[] = []

  constructor(
    private _authService: AuthService,
    private store: Store<AppState>,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store.pipe(select(currentUser))
        .subscribe((res: UserModel) => {
          this.user = res
        })
    )
  }

  logout() {
    this._authService.logout().subscribe()
    this.store.dispatch(new Logout());
    this.router.navigate(['/auth/login'])
  }
}
