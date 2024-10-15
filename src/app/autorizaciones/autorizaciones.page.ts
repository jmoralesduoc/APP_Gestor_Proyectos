import { Component, OnInit } from '@angular/core';
import { SrvAutorizacionService } from '../srv-autorizacion.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SQLiteService } from '../srv-data.service';

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
    this.loadAutorizaciones(); // Sin necesidad de await
  }

  loadAutorizaciones() {
    this.dataService.getAutorizaciones().subscribe(
      (autorizaciones) => {
        this.autorizaciones = autorizaciones || [];
      },
      (error) => {
        console.error('Error al cargar autorizaciones', error);
      }
    );
  }

  crearAutorizacion() {
    this.dataService.insertAutorizacion(this.nombreAutorizacion, this.accion).subscribe(
      () => {
        console.log('Autorización creada correctamente');
        this.loadAutorizaciones();  // Recarga la lista después de crear
      },
      (error) => {
        console.error('Error al crear la autorización', error);
      }
    );
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

    await alert.present();
  }

  eliminarAutorizacion(autorizacion: any) {
    this.dataService.deleteAutorizacion(autorizacion.id).subscribe(
      () => {
        console.log('Autorización eliminada correctamente');
        this.loadAutorizaciones();  // Recarga la lista después de eliminar
      },
      (error) => {
        console.error('Error al eliminar la autorización', error);
      }
    );
  }

  back() {
    this.router.navigate(['/menuadmin']);
  }
}
