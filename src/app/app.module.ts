import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/*************  Components  **************/
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AddProjectComponent } from './project/add/add-project/add-project.component';

/*************  Services  **************/
import { AuthGuard } from './_guards';
import { ApiService } from './api.service';
import { LoginService } from './login/login.service';
import { ProjectService } from './project.service';
import { AppRoutingModule } from './app.router';

/*************  Feature Components  **************/
import { StepperComponent } from './components/stepper/stepper/stepper.component';

/*************  MUI  **************/
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AddProjectComponent,
    StepperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatSelectModule,
    MatTooltipModule
  ],
  providers: [
    AuthGuard, 
    ApiService,
    LoginService,
    ProjectService,
    StepperComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
