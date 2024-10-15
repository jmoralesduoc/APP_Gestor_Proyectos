import { Component, OnInit } from '@angular/core';
import { SrvAutorizacionService } from '../srv-autorizacion.service';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../srv-data.service';


@Component({
  selector: 'app-autorizaciones',
  templateUrl: './autorizaciones.page.html',
  styleUrls: ['./autorizaciones.page.scss'],
})
export class AutorizacionesPage implements OnInit {
  autorizaciones: any[] = [];
  nombreAutorizacion: string = '';
  accion: string = '';
  autorizacionId: number = 0;
  
  constructor(
    private autorizacionService: SrvAutorizacionService,
    private alertController: AlertController,
    private router: Router,
    private dataService: DataService,
  ) {}

  async ngOnInit() {
    await this.loadAutorizaciones();
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

  async loadAutorizaciones() {
    try {
      this.autorizaciones = await this.DataService.getAutorizaciones();
    } catch (error) {
      console.error('Error al cargar autorizaciones', error);
    }
  }



  
  async crearAutorizacion() {
    try {
      await this.dataService.insertAutorizacion(this.nombreAutorizacion, this.accion);
      console.log('Autorización creada correctamente');
    } catch (error) {
      console.error('Error al crear la autorización', error);
    }
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

  async eliminarAutorizacion() {
    try {
      await this.dataService.deleteAutorizacion(this.autorizacionId);
      console.log('Autorización eliminada correctamente');
    } catch (error) {
      console.error('Error al eliminar la autorización', error);
    }
  }

    await alert.present();
  }
  back(){
    this.router.navigate(['/menuadmin']);
  }
}
