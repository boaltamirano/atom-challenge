import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/core/_services/http.services';
import { AuthModel } from '../_models/auth.model';
import { UserRegisterModel } from '../_models/user-register.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(
        private httpx: HttpService
    ) { }

    login(username: string): Observable<AuthModel> {
        try {
            return this.httpx.get('login', { email: username }).pipe(
                map((res: AuthModel) => {
                    return {
                        token: res?.token,
                        user: {
                            id: res.user?.id,
                            email: res.user?.email,
                            name: res.user?.name,
                            lastname: res.user?.lastname,
                            createdAt: res.user?.createdAt,
                            updatedAt: res.user?.updatedAt
                        }
                    }
                }));
        } catch (error) {
            return of()
        }
    }

    register(user: UserRegisterModel): Observable<AuthModel> {
        return this.httpx.post('register', user).pipe(
            map((res: AuthModel) => {
                return {
                    token: res?.token,
                    user: {
                        id: res.user?.id,
                        email: res.user?.email,
                        name: res.user?.name,
                        lastname: res.user?.lastname,
                        createdAt: res.user?.createdAt,
                        updatedAt: res.user?.updatedAt
                    }
                }
            }));
    }

    logout(): Observable<any> {
        localStorage.removeItem(environment.auth_token_key);
        localStorage.removeItem('user');

        return of()
    }

}
