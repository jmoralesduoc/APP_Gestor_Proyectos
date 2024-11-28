import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contrasena',
  templateUrl: './contrasena.page.html',
  styleUrls: ['./contrasena.page.scss'],
})
export class ContrasenaPage {
  resetForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private router: Router
  ) {
    // Inicializa el formulario reactivo con validaciones
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  // Se llama cuando la vista está a punto de ser cargada
  ionViewWillEnter() {
    // Resetea el formulario cuando el usuario entra nuevamente a la pantalla
    this.resetForm.reset();
  }

  // Función para manejar el envío del formulario
  async onSubmit() {
    if (this.resetForm.valid) {
      console.log('Formulario válido:', this.resetForm.value);

      // Aquí puedes agregar la lógica para enviar el correo al backend
      // Ejemplo: this.authService.resetPassword(this.resetForm.value.email);

      // Muestra un mensaje de éxito al usuario
      const toast = await this.toastController.create({
        message: 'Contraseña enviada al Correo Registrado',
        duration: 7000,
        position: 'bottom',
      });
      await toast.present();

      // Redirige al usuario a la página de login
      this.router.navigate(['/login']);
    } else {
      // Muestra un mensaje de error si el formulario no es válido
      const toast = await this.toastController.create({
        message: 'Por favor, ingrese un correo válido.',
        duration: 3000,
        position: 'bottom',
      });
      await toast.present();
    }
  }

  // Función para cancelar el proceso y redirigir al login
  logout() {
    this.router.navigate(['/login']);
  }

  // Getter para un acceso más limpio al control de email
  get email() {
    return this.resetForm.get('email');
  }
}
