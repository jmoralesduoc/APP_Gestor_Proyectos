import { Component,AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  registerForm: FormGroup;

  
  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private toastController: ToastController 
    ) {
      this.registerForm = this.formBuilder.group({
       email: ['' ,
        [Validators.required, Validators.email]
        ],
        password: ['',    
           [
            Validators.required,
            Validators.pattern(/^(?=(?:.*\d){4})(?=(?:.*[!@#$%^&*()_+=[\]{};':"\\|,.<>/?`~\-]){3})(?=.*[A-Z]).{8,}$/)
          ]
        ],
        nombres: ['',
          [Validators.required]
          ],
        apellidos :['',
          [Validators.required]
          ]
      });
 
  }



  async onSubmit() {
    if (this.registerForm.valid) {
      // Lógica para manejar el registro
      const toast = await this.toastController.create({
        message: 'Registrado Correctamente',
        duration: 7000,
        position: 'bottom'
      });
      await toast.present();

      this.router.navigate(['/login']);
      console.log('Formulario válido', this.registerForm.value);
    } else {
      console.log('Formulario inválido');
    }
  }
  logout(){
    
    this.router.navigate(['/login']);
  }

  
}
