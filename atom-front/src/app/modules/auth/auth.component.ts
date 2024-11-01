import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/core/_reducers';
import { currentUser } from 'src/app/core/_reducers/_selectors/user.selector';

@Component({
  selector: 'atom-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {

  private subscriptions: Subscription[] = []

  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    const userSub = this.store.pipe(select(currentUser))
      .subscribe(res => {
        if (res && res.id) {
          this.router.navigate(['/'])
        }
      })

    this.subscriptions.push(userSub);

  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

}