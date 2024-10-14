import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationStart, NavigationExtras } from '@angular/router';
import { Subscription } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { UsuarioService } from '../srv-usuario.service'; 
import { SrvAutorizacionUserService } from '../srv-autorizacion-user.service'; 
import * as bcrypt from 'bcryptjs';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  isLoading: boolean = false;
  private routerEventsSubscription: Subscription | undefined;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private storage: Storage,
    private usuarioService: UsuarioService,
    private usuarioAutorizacion: SrvAutorizacionUserService,
    private alertController: AlertController
  ) {
    this.storage.create(); // Inicializa el Storage
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      password: [
        '', 
        [
          Validators.required,
          Validators.pattern(/^(?=(?:[^0-9]*\d){4})(?=(?:[^a-z]*[a-z]){3})(?=(?:[^A-Z]*[A-Z]){1})[A-Za-z\d]{8,}$/)
        ]
      ]
    });

    this.loginForm.reset();

    this.routerEventsSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart && event.url === '/login') {
        this.loginForm.reset();
        this.isLoading = false;
      }
    });
  }

  get password() {
    return this.loginForm?.get('password');
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true; 
      
      const email = this.loginForm.value.usuario;
      const password = this.loginForm.value.password;
      
      setTimeout(() => {
        this.usuarioService.obtenerUsuarioPorCorreo(email).subscribe(
          async (usuario) => {
            if (usuario[0] && usuario[0].password) {
              if (usuario[0].password === "") {
                await this.presentAlert('Error', 'El usuario no tiene una contraseña asignada.');
              } else {
                const isMatch = bcrypt.compareSync(password, usuario[0].password);
                const user_name = usuario[0].nombres + " " + usuario[0].apellidos;
                const admin = usuario[0].nombres;

                if (isMatch) {
                  // Llamada al servicio de autorizaciones
                  this.usuarioAutorizacion.obtenerAutorizacionUsuario(usuario[0].id).subscribe(
                    async (autorizaciones) => {
                      const autorizacionMenu = autorizaciones.find((aut: any) => aut.autorizacion_id === 1);

                      if (autorizacionMenu) {
                        // Si tiene autorización con ID 1, redirige al menú
                        this.storage.set('user', usuario).then(() => {
                          const navigationExtras: NavigationExtras = {
                            state: { user: admin },
                          };
                          this.router.navigate(['/menuadmin'], navigationExtras); 
                        });
                      } else {
                        const autorizacionD = autorizaciones.find((aut: any) => aut.autorizacion_id === 2);
                        
                        if (autorizacionD) {
                          // Si tiene autorización con ID 2, redirige al dashboard
                          this.storage.set('user', usuario).then(() => {
                            const navigationExtras: NavigationExtras = {
                              state: { user: user_name },
                            };
                            this.router.navigate(['/dashboard'], navigationExtras); 
                          });
                        } else {
                          // Si no tiene autorización, mostrar alerta y no permitir el ingreso
                          await this.presentAlert('Error', 'Usuario sin autorización para acceder al sistema');
                          this.isLoading = false; // Ocultar el spinner
                        }                        
                      }
                    },
                    async (error) => {
                      console.error('Error al obtener autorizaciones', error);
                      await this.presentAlert('Error', 'Error al obtener autorizaciones');
                      this.isLoading = false; // Ocultar el spinner
                    }
                  );
                } else {
                  await this.presentAlert('Error', 'Contraseña incorrecta');
                  this.isLoading = false; // Ocultar el spinner
                }
              }
            } else {
              await this.presentAlert('Error', 'Usuario no encontrado');
              this.isLoading = false; // Ocultar el spinner
            }
          },
          async (error) => {
            console.error('Error al obtener el usuario', error);
            await this.presentAlert('Error', 'Error al obtener el usuario');
            this.isLoading = false; // Ocultar el spinner
          }
        );
      }, 2000);
    } else {
      await this.presentAlert('Error', 'Login fallido, por favor complete todos los campos correctamente.');
    }
  }
  
  irNuevoUsuario() {
    this.router.navigate(['/registro']);
  }

  ir_restablecer() {
    this.router.navigate(['/contrasena']);
  }
}
