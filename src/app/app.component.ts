import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ENV } from './services/environment.service';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mintg-admin-angular';
  constructor(
    public router: Router,
    @Inject(ENV) public envVars: string
  ){}

  ngOnInit(){
    const data = JSON.parse(this.envVars);
    console.log(data);
  }

  showToolbar(){
    return !['/','/login','/register'].includes(this.router.url)
  }
}
