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
    const nuevaAutorizacion = { nombre_autorizacion: this.nombreAutorizacion, accion: this.accion };

    this.autorizacionService.crearAutorizacion(nuevaAutorizacion).subscribe(
      () => {
        // Insertar en SQLite
        try {
          this.dataService.openDatabase();
          this.dataService.createTables();
         console.log('Base de datos inicializada');
       } catch (error) {
         console.error('Error al inicializar la base de datos', error);
       }

        this.dataService.insertAutorizacion(this.nombreAutorizacion, this.accion).subscribe(
          () => {
            console.log('Autorización creada correctamente');
            this.loadAutorizaciones();  // Recarga la lista después de crear
          },
          (error) => {
            console.error('Error al crear la autorización en SQLite', error);
          }
        );
      },
      (error) => {
        console.error('Error al crear la autorización en JSON', error);
      }
    );
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

    alert.then(alertEl => alertEl.present());
  }

  eliminarAutorizacion(autorizacion: any) {
    this.autorizacionService.eliminarAutorizacion(autorizacion.id).subscribe(
      () => {
        console.log('Autorización eliminada en JSON, ahora en SQLite');
        this.dataService.deleteAutorizacion(autorizacion.id).subscribe(
          () => {
            console.log('Autorización eliminada correctamente');
            this.loadAutorizaciones();  // Recarga la lista después de eliminar
          },
          (error) => {
            console.error('Error al eliminar la autorización en SQLite', error);
          }
        );
      },
      (error) => {
        console.error('Error al eliminar autorización en JSON', error);
      }
    );
  }

  back() {
    this.router.navigate(['/menuadmin']);
  }
}
