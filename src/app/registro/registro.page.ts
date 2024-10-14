import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import * as bcrypt from 'bcryptjs';
import { UsuarioService } from '../srv-usuario.service';
import { Usuario } from '../models/usuario.model'; // Importar la interfaz

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
    private toastController: ToastController,
    private usuarioService: UsuarioService
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=(?:[^0-9]*\d){4})(?=(?:[^a-z]*[a-z]){3})(?=(?:[^A-Z]*[A-Z]){1})[A-Za-z\d]{8,}$/)
      ]],
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]]
    });
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      const saltRounds = 10;
      const password = this.registerForm.value.password;

      // Encriptar la contraseña usando bcryptjs
      const hashedPassword = bcrypt.hashSync(password, saltRounds);

    // Obtener los valores del formulario
    const nombres = this.registerForm.value.nombres;
    const apellidos = this.registerForm.value.apellidos;

    // Obtener la primera inicial del nombre
    const inicialNombre = nombres.charAt(0).toUpperCase();
    
    // Eliminar caracteres especiales del apellido
    const apellidoLimpio = apellidos.replace(/[^a-zA-Z0-9]/g, '');

    // Crear el id
    const id = `${inicialNombre}${apellidoLimpio}`;

      const usuario: Usuario = {
        nombres: this.registerForm.value.nombres,
        apellidos: this.registerForm.value.apellidos,
        correo: this.registerForm.value.email,
        password: hashedPassword,
        cliente_id: 0,
        id: id,
      };

      // Verificar si ya existe un cliente con el mismo correo para obtener su cliente_id
      this.usuarioService.obtenerUsuarioPorCorreo(usuario.correo).subscribe(async (usuariosExistentes: Usuario[]) => {
        if (usuariosExistentes.length > 0) {
          // Si existe un usuario, obtener el cliente_id
          usuario.cliente_id = usuariosExistentes[0].cliente_id;
        } else {
          // Obtener el máximo cliente_id existente
          this.usuarioService.obtenerMaxClienteId().subscribe(async (usuarios: Usuario[]) => {
            const maxClienteId = Math.max(...usuarios.map((user: Usuario) => user.cliente_id ?? 0));
            usuario.cliente_id = maxClienteId + 1; // Generar el nuevo cliente_id correlativo

            // Luego registrar al usuario con el cliente_id ya establecido
            this.usuarioService.registrarUsuario(usuario).subscribe(async response => {
              const toast = await this.toastController.create({
                message: 'Registrado Correctamente',
                duration: 7000,
                position: 'bottom'
              });
              await toast.present();

              this.router.navigate(['/login']);
              console.log('Usuario registrado:', response);
            }, async error => {
              const toast = await this.toastController.create({
                message: 'Error al registrar usuario',
                duration: 7000,
                position: 'bottom'
              });
              await toast.present();
              console.error('Error al registrar el usuario:', error);
            });
          }, async error => {
            const toast = await this.toastController.create({
              message: 'Error al obtener el máximo cliente_id',
              duration: 7000,
              position: 'bottom'
            });
            await toast.present();
            console.error('Error al obtener el máximo cliente_id:', error);
          });
        }
      }, async error => {
        const toast = await this.toastController.create({
          message: 'Error al verificar el cliente',
          duration: 7000,
          position: 'bottom'
        });
        await toast.present();
        console.error('Error al verificar el cliente:', error);
      });

    } else {
      console.log('Formulario inválido');
    }
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
