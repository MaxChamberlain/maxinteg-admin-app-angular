// generate an angular route guard that fetches the environment variable api and checks if a user is returned
// ng g guard auth

// Path: src/app/auth.guard.ts
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private api: ApiService, private router: Router) { }

    canActivate() {
        return this.api.checkAuth()
    }
}
