import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mintg-admin-angular';
  constructor(
    public router: Router
  ){}

  showToolbar(){
    return !['/','/login','/register'].includes(this.router.url)
  }
}
