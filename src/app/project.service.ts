import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './environments/environment';

@Injectable()
export class ProjectService {
    constructor(private http: HttpClient) { }

    createProject(data: object) {
        return this.http.post(`${environment.api}/project/create`, data, {
            withCredentials: true,
        }).pipe()
    }

    getProjects(){
        return this.http.get(`${environment.api}/project/list`, {
            withCredentials: true,
        }).pipe()
    }
}