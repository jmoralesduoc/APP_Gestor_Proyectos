import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  registerForm: FormGroup;
  loginForm!: FormGroup;  // Aserción no nula
  
  constructor(private formBuilder: FormBuilder,private router: Router) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=(?:.*\d){4})(?=(?:.*[!@#$%^&*()_+=[\]{};':"\\|,.<>/?`~\-]){3})(?=.*[A-Z]).{8,}$/)
        ]
      ],
      nombres: ['',[Validators.required]],
      apellidos :['',[Validators.required]]
    });
  }



  onSubmit() {
    if (this.registerForm.valid) {
      // Lógica para manejar el registro
      console.log('Formulario válido', this.registerForm.value);
    } else {
      console.log('Formulario inválido');
    }
  }
  
}
