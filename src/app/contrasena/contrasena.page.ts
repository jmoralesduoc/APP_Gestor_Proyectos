import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';  // Importa el controlador de toast
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-contrasena',
  templateUrl: './contrasena.page.html',
  styleUrls: ['./contrasena.page.scss'],
})
export class ContrasenaPage {
  resetForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastController: ToastController ,
    private fb: FormBuilder, private router: Router
  ) {
    // Inicializa el formulario reactivo
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]  // Validación del campo email
    });
  }

  // Función para manejar el envío del formulario
  async onSubmit() {
    if (this.resetForm.valid) {
      console.log('Formulario válido:', this.resetForm.value);

      // Muestra el toast cuando el formulario es enviado correctamente
      const toast = await this.toastController.create({
        message: 'Contraseña enviada al Correo Registrado',
        duration: 7000,
        position: 'bottom'
      });
      await toast.present();

      this.router.navigate(['/login']);
      // Aquí podrías agregar la lógica para enviar el correo, por ejemplo:
      // this.authService.resetPassword(this.resetForm.value.email);
    } else {
      console.log('Formulario inválido');
    }
  }
}
