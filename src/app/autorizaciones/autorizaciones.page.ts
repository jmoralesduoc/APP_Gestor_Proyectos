// src/app/autorizaciones/autorizaciones.page.ts
import { Component, OnInit } from '@angular/core';
import { SrvAutorizacionService } from '../srv-autorizacion.service';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-autorizaciones',
  templateUrl: './autorizaciones.page.html',
  styleUrls: ['./autorizaciones.page.scss'],
})
export class AutorizacionesPage implements OnInit {
  autorizaciones: any[] = [];

  constructor(
    private autorizacionService: SrvAutorizacionService,
    private alertController: AlertController,
    private router: Router,
  ) {}

  ngOnInit() {
    this.cargarAutorizaciones();
  }

  cargarAutorizaciones() {
    this.autorizacionService.obtenerAutorizaciones().subscribe(
      (data) => {
        this.autorizaciones = data;
      },
      (error) => {
        console.error('Error al cargar autorizaciones', error);
      }
    );
  }

  async crearAutorizacion() {
    const alert = await this.alertController.create({
      header: 'Crear Autorización',
      inputs: [
        {
          name: 'nombre_autorizacion',
          type: 'text',
          placeholder: 'Nombre de Autorización'
        },
        {
          name: 'accion',
          type: 'text',
          placeholder: 'Acción'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Crear',
          handler: (data) => {
            this.autorizacionService.crearAutorizacion(data).subscribe(
              () => {
                this.cargarAutorizaciones();
              },
              (error) => {
                console.error('Error al crear autorización', error);
              }
            );
          }
        }
      ]
    });

    await alert.present();
  }

  async modificarAutorizacion(autorizacion: any) {
    const alert = await this.alertController.create({
      header: 'Modificar Autorización',
      inputs: [
        {
          name: 'nombre_autorizacion',
          type: 'text',
          value: autorizacion.nombre_autorizacion,
          placeholder: 'Nombre de Autorización'
        },
        {
          name: 'accion',
          type: 'text',
          value: autorizacion.accion,
          placeholder: 'Acción'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Modificar',
          handler: (data) => {
            this.autorizacionService.modificarAutorizacion(autorizacion.id, data).subscribe(
              () => {
                this.cargarAutorizaciones();
              },
              (error) => {
                console.error('Error al modificar autorización', error);
              }
            );
          }
        }
      ]
    });

    await alert.present();
  }

  async eliminarAutorizacion(autorizacion: any) {
    const alert = await this.alertController.create({
      header: 'Eliminar Autorización',
      message: '¿Estás seguro de que quieres eliminar esta autorización?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.autorizacionService.eliminarAutorizacion(autorizacion.id).subscribe(
              () => {
                this.cargarAutorizaciones();
              },
              (error) => {
                console.error('Error al eliminar autorización', error);
              }
            );
          }
        }
      ]
    });

    await alert.present();
  }
  back(){
    this.router.navigate(['/menuadmin']);
  }
}
