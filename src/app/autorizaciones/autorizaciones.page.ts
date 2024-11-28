import { Component, OnInit } from '@angular/core';
import { SrvAutorizacionService } from '../srv-autorizacion.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SQLiteService } from '../srv-sqllite.service';

@Component({
  selector: 'app-autorizaciones',
  templateUrl: './autorizaciones.page.html',
  styleUrls: ['./autorizaciones.page.scss'],
})
export class AutorizacionesPage implements OnInit {
  autorizaciones: any[] = [];
  nombreAutorizacion: string = '';
  accion: string = '';

  constructor(
    private autorizacionService: SrvAutorizacionService,
    private alertController: AlertController,
    private router: Router,
    private dataService: SQLiteService,
  ) {}

  ngOnInit() {
    this.loadAutorizaciones();
   
  }

  loadAutorizaciones() {
    this.autorizacionService.getAutorizaciones().subscribe(
      (autorizaciones) => {
        this.autorizaciones = autorizaciones || [];
      },
      (error) => {
        console.error('Error al cargar autorizaciones', error);
      }
    );
  }

  crearAutorizacion() {
    const alert = this.alertController.create({
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
            if (data.nombre_autorizacion && data.accion) {
              const nuevaAutorizacion = {
                nombre_autorizacion: data.nombre_autorizacion,
                accion: data.accion
              };
              this.autorizacionService.crearAutorizacion(nuevaAutorizacion).subscribe(
                () => {
                  console.log('Autorización creada correctamente');
                  this.loadAutorizaciones(); // Recargar la lista
                },
                (error) => {
                  console.error('Error al crear la autorización', error);
                }
              );
            } else {
              console.error('Todos los campos son obligatorios');
            }
          }
        }
      ]
    });
  
    alert.then(alertEl => alertEl.present());
  }
  

  modificarAutorizacion(autorizacion: any) {
    const alert = this.alertController.create({
      header: 'Modificar Autorización',
      inputs: [
        {
          name: 'nombre_autorizacion' ,
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
                this.loadAutorizaciones();
              },
              (error) => {
                console.error('Error al modificar autorización', error);
              }
            );
          }
        }
      ]
    });
    this.loadAutorizaciones();
    alert.then(alertEl => alertEl.present());
  }

  eliminarAutorizacion(autorizacion: any) {
    this.alertController.create({
      header: 'Confirmar Eliminación',
      message: `¿Estás seguro de que deseas eliminar la autorización "${autorizacion.nombre_autorizacion}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Eliminación cancelada');
          }
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            // Lógica de eliminación del servicio remoto
            this.autorizacionService.eliminarAutorizacion(autorizacion.id).subscribe(
              () => {
                console.log('Autorización eliminada correctamente');
                this.loadAutorizaciones(); // Recarga la lista después de eliminar
              },
              (error) => {
                console.error('Error al eliminar autorización', error);
              }
            );
          }
        }
      ]
    }).then(alertEl => alertEl.present());
  }
  
  

  back() {
    this.router.navigate(['/menuadmin']);
  }
}
