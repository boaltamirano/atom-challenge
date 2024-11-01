import { Injectable } from '@angular/core';
import { UrlService } from './url.services';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Map } from '../_models/abstract-map.model';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(private http: HttpClient, private routing: UrlService) { }

    post(url: string, body: any, url_params: Map = {}, headers: Map | undefined = undefined) {
        let route = this.routing.getUrl(url, url_params);
        let options = { 'headers': this.routing.getHeaders(headers) };

        return this.http.post<any>(`${route}`, body, options)
            .pipe(
                map((res) => {
                    return res;
                }, catchError(error => {
                    return of()
                })));
    }

    get(url: string, url_params: Map = {}, query_params: Map = {}) {
        var route = this.routing.getUrl(url, url_params)
        var querystring = this.routing.getQueryString(query_params)
        return this.http.get<any>(`${route}`, { params: querystring })
            .pipe(map(res => {
                return res;
            }));
    }

    put(url: string, body: Map, url_params: Map = {}) {
        var route = this.routing.getUrl(url, url_params)

        return this.http.put<any>(`${route}`, body)
            .pipe(map(res => {
                return res;
            }));
    }

    patch(url: string, body: Map, url_params: Map = {}) {
        var route = this.routing.getUrl(url, url_params)

        return this.http.patch<any>(`${route}`, body)
            .pipe(map(res => {
                return res;
            }));
    }

    delete(url: string, body: Map = {}, url_params: Map = {}, query_params: Map = {}) {
        var route = this.routing.getUrl(url, url_params)
        var querystring = this.routing.getQueryString(query_params)
        return this.http.delete<any>(`${route}`, { body: body, params: querystring })
            .pipe(map(res => {
                return res;
            }));
    }
}

