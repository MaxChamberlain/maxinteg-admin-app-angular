import { Component } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  constructor(
    private apiService: ApiService,
  ) {}

  logout(){
    this.apiService.logout().subscribe((data: any) => {
        window.location.href="/"
    });
  }
}
