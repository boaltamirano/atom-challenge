
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Map } from  '../_models/abstract-map.model';


const WHITE_LIST = {
    list: ['localhost', '127.0.0.1'],
    in: function (url: string) {
        for (let list of this.list) {
            if (url.indexOf(list) !== -1) {
                return true;
            }
        }
        return false;
    }
}


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        let token: string | null = localStorage.getItem(environment.auth_token_key);

        let headers: Map = {};
        if (token !== undefined && token !== null) {
            headers['Authorization'] = 'Bearer ' + token;
        }

        if (WHITE_LIST.in(request.url)) {
            request = request.clone({
                setHeaders: headers
            });
        }

        return next.handle(request);
    }
}
