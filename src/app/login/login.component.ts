import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
  ) {}

  loginForm = this.formBuilder.group({
    user_email: '',
    user_password: '',
  });

  onSubmit() {
    this.loginService.login(this.loginForm.value).subscribe((data: any) => {
      console.log(data);
    });
  }
  
}
