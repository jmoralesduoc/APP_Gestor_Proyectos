import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationStart, NavigationExtras } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  })
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  isLoading: boolean = false;
  private routerEventsSubscription: Subscription | undefined;
  
  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    // Inicializa el formulario con validadores

   
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      password: [
        '', 
        [
          Validators.required,
          Validators.pattern(/^(?=(?:.*\d){4})(?=(?:.*[!@#$%^&*()_+=[\]{};':"\\|,.<>/?`~\-]){3})(?=.*[A-Z]).{8,}$/)
        ]
      ]
    });
    this.loginForm.reset();

    this.routerEventsSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart && event.url === '/login') {
        this.loginForm.reset();
      }
    });
    
  }

  // Accede al control de password
  get password() {
    return this.loginForm?.get('password');
  }

  // Función que se ejecuta al enviar el formulario
  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;  // Muestra el spinner al hacer submit
      
      setTimeout(() => {  // Simulación de un proceso de login
        const navigationExtras: NavigationExtras = {
          state: { user: this.loginForm.value }
        };
        this.router.navigate(['/dashboard'], navigationExtras);
        this.isLoading = false;  // Oculta el spinner tras completar el proceso
      }, 2000);  // Simula 2 segundos de espera

      
    } else {
      console.log('Login Failed');
    }
  }

  // Navegar a la página de nuevo usuario
  irNuevoUsuario() {
    this.router.navigate(['/registro']);
  }

  // Navegar a la página de restablecimiento de contraseña
  ir_restablecer() {
    this.router.navigate(['/contrasena']);
  }
}
