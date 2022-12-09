// generate a service file that fetches the environment variable api and checks if a user is returned
// ng g service api
//
// // Path: src/app/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './environments/environment';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    user = null;
    isLoggedIn = false;

    constructor(private http: HttpClient) { }

    

    getUser() {
        return this.http.post(`${environment.api}/user/by-token`, {}, {
            withCredentials: true,
        })
    }

    checkAuth() {
        return this.http.post(`${environment.api}/user/by-token`, {}, {
            withCredentials: true,
        }).pipe(
            map((data: any) => {
                if (data) {
                    this.user = data;
                    this.isLoggedIn = true;
                }
                return data;
            })
        )
    }
}