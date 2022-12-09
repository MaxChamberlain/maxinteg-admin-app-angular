// generate a service file that fetches the environment variable api and checks if a user is returned
// ng g service api
//
// // Path: src/app/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable()
export class LoginService {
    constructor(private http: HttpClient) { }

    login(data: object) {
        return this.http.post(`${environment.api}/user/login`, data, {
            withCredentials: true,
        }).pipe()
    }
}