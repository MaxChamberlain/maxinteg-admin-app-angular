// init an app router component with the login register and home components
// and the auth guard
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { ProjectPageComponent } from './project/project-page/project-page.component';
import { AddProjectComponent } from './project/add/add-project/add-project.component';

import { AuthGuard } from './_guards';

const routes: Routes = [
    { path: '', component: LoginComponent, pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'project/add', component: AddProjectComponent, canActivate: [AuthGuard] },
    { path: 'project/:id', component: ProjectPageComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'home' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
