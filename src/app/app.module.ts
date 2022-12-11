import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from './environments/environment';

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
import { ToolbarComponent } from './components/toolbar/toolbar.component';

/*************  MUI  **************/
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ProjectPageComponent } from './project/project-page/project-page.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { SocketService } from './services/socket.service';

const config: SocketIoConfig = {
	url: environment.socketUrl,
	options: {
	}
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AddProjectComponent,
    StepperComponent,
    ToolbarComponent,
    ProjectPageComponent
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
    MatTooltipModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressSpinnerModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    AuthGuard, 
    ApiService,
    LoginService,
    ProjectService,
    StepperComponent,
    SocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
