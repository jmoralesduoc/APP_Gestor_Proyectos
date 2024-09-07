import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;  // Aserción no nula

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      password: [
        '', 
       [
          Validators.required
          //Validators.pattern(/^(?=(?:.*\d){4})(?=(?:.*[!@#$%^&*()_+=[\]{};':"\\|,.<>/?`~\-]){3})(?=.*[A-Z]).{8,}$/)
        ]
      ]
    });
  }

  get password() {
    return this.loginForm?.get('password');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const navigationExtras: NavigationExtras = {
        state: { user: this.loginForm.value }
      };
      this.router.navigate(['/dashboard'], navigationExtras);
    } else {
      console.log('Login Failed');
    }
  }

  irNuevoUsuario() {
    this.router.navigate(['/registro']);  
  }

}
