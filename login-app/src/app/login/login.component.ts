import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SharedDataService } from '../feedback/shared-data.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username!: string;
  password!: string;
  passwordInvalid: boolean = false;

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  sharedDataService!: SharedDataService;

  async onSubmit() {
    if (this.loginForm.valid) {
      // Access the form control values
      this.username = this.loginForm.get('username')!.value;
      this.password = this.loginForm.get('password')!.value;
  
      // Add login logic here, e.g., make an HTTP request to authenticate the user
  
      console.log('Login submitted');
      console.log('Username:', this.username);
      console.log('Password:', this.password);

      let loginData = {
        username: this.username,
        password: this.password,
      };
      // Send the HTTP POST request to the server
    
      try {
        const response = await this.http.post('/users/login', loginData, httpOptions).toPromise();
        // Handle a successful login response (e.g., save the token)
        console.log('Login successful', response);
        this.sharedDataService.setLoginData(loginData);
        this.router.navigate(['/feedback']);
      } catch (error) {
        // Handle login error (e.g., display an error message)
        console.error('Login failed', error);
      }

    }
  }
}
