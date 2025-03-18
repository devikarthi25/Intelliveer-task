import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedModule } from '../../../shared/shared/shared.module';
import { DataService } from '../../../service/data.service';

@Component({
  selector: 'app-login',
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  showPassword : boolean = false
  private UserData = [
    {
      "id": 1,
      "name": "John",
      "email": "john@example.com",
      "password": "123456",
      "role": "user"
    },
    {
      "id": 2,
      "name": "Admin",
      "email": "admin@example.com",
      "password": "admin123",
      "role": "admin"
    }
  ];
  fb = inject(FormBuilder);
  router = inject(Router);

  loginForm: FormGroup | any;
  submitted: boolean = false;
  constructor(private callApi : DataService) {}
  ngOnInit() {
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {    
    this.submitted = true;
    if (this.loginForm.valid) {      
      const user = this.UserData.find((u:any)=> u.name === this.loginForm.value.name && u.password === this.loginForm.value.password);              
        if (user) {
          sessionStorage.setItem('authToken', JSON.stringify({ isAuthenticated: true }));
          sessionStorage.setItem('role', user.role.toString())
          sessionStorage.setItem('userData', JSON.stringify(user))
          this.callApi.showSuccess('Login Successfully');
          this.router.navigate(['/events'])
        } 
        else {
          this.callApi.showError('Invalid username or password' );
        }
    }
    else{
      this.callApi.showError('User not found')
    }
  }
}
