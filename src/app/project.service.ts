import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './environments/environment';

@Injectable()
export class ProjectService {
    constructor(private http: HttpClient) { }

    createProject(data: object) {
        return this.http.put(`${environment.api}/project`, data, {
            withCredentials: true,
        }).pipe()
    }

    getProjects(){
        return this.http.get(`${environment.api}/project`, {
            withCredentials: true,
        }).pipe()
    }

    getProject(id: string){
        return this.http.get(`${environment.api}/project/${id}`, {
            withCredentials: true,
        }).pipe()
    }
}