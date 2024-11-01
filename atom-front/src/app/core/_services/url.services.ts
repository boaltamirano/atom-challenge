import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { Map } from '../_models/abstract-map.model';


let urls: Map = {
    /** API Users */
    'register': '/api/users',
    'login': '/api/users/{email}',

    /** API Tasks */
    'save_task': '/api/tasks',
    'list_task': '/api/tasks',
    'update_task': '/api/tasks/{taskId}',
    'delete_task': '/api/tasks/{taskId}',
}

@Injectable({
    providedIn: 'root'
})
export class UrlService {

    constructor() { }

    getUrl(route: string, url_params: Map = {}) {
        var url = environment.api_url + urls[route];
        for (var key in url_params) {
            if (url.search(key) > -1) {
                url = url.replace('{' + key + '}', url_params[key])
            }
        }
        return url;
    }

    getQueryString(params: Map = {}) {

        if (params != undefined || Object.keys(params).length > 0) {
            let querystring = new HttpParams();
            for (let key in params) {
                querystring = querystring.set(key, params[key])
            }
            return querystring;
        }

        return new HttpParams();
    }

    getHeaders(headers: Map | undefined = undefined) {
        if (headers != undefined && Object.keys(headers).length > 0) {
            return new HttpHeaders(headers);
        }
        return new HttpHeaders();
    }
}

