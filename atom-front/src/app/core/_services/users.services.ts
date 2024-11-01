import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from './http.services';
import { UserModel } from '../_models/user.model';

@Injectable({ providedIn: 'root' })
export class UsersService {
    constructor(
        private httpx: HttpService,
    ) { }

    getCurrentUser(): Observable<UserModel> {
        return this.httpx.get('current_user').pipe(map((res: any) => new UserModel(res?.user)));
    }

}
