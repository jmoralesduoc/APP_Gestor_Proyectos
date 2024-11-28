import { Component, OnInit } from '@angular/core';
import { ProyectosService } from '../proyectos.service';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.page.html',
  styleUrls: ['./proyectos.page.scss'],
})
export class ProyectosPage implements OnInit {
  clientesConProyectos: any[] = [];

  constructor(
    private proyectosService: ProyectosService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.cargarClientesConProyectos();
  }

  cargarClientesConProyectos() {
    this.proyectosService.getClientesConProyectos().subscribe({
      next: (data) => {
        // Agregar la propiedad `mostrarProyectos` a cada cliente
        this.clientesConProyectos = data.map((cliente) => ({
          ...cliente,
          mostrarProyectos: false, // Inicialmente los proyectos están ocultos
        }));
      },
      error: (err) => {
        console.error('Error al cargar clientes con proyectos:', err);
      },
    });
  }

  toggleProyectos(cliente: any) {
    cliente.mostrarProyectos = !cliente.mostrarProyectos;
  }

  async crearProyecto(cliente: any) {
    const alert = await this.alertController.create({
      header: 'Crear Nuevo Proyecto',
      inputs: [
        { name: 'nombre_proyecto', type: 'text', placeholder: 'Nombre del Proyecto' },
        { name: 'descripcion', type: 'textarea', placeholder: 'Descripción del Proyecto' },
        { name: 'fecha_inicio', type: 'datetime-local', placeholder: 'Fecha de Inicio' },
        { name: 'fecha_fin', type: 'datetime-local', placeholder: 'Fecha de Fin (Opcional)' },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Crear',
          handler: (data) => {
            if (!data.nombre_proyecto || !data.descripcion || !data.fecha_inicio) {
              this.mostrarAlerta('Error', 'Todos los campos obligatorios deben completarse.');
              return false;
            }

            const nuevoProyecto = {
              nombre_proyecto: data.nombre_proyecto,
              descripcion: data.descripcion,
              fecha_inicio: data.fecha_inicio,
              fecha_fin: data.fecha_fin || null,
              estado: 'Inicial', // Estado predeterminado
              responsable: 1, // Responsable predeterminado
              cliente_id: cliente.id,
            };

            this.proyectosService.createProyecto(nuevoProyecto).subscribe(() => {
              this.mostrarAlerta('Éxito', 'Proyecto creado correctamente.');
              this.cargarClientesConProyectos(); // Recargar la lista
            });

            return true;
          },
        },
      ],
    });

    await alert.present();
  }

  mostrarAlerta(header: string, message: string) {
    this.alertController
      .create({
        header,
        message,
        buttons: ['OK'],
      })
      .then((alertEl) => alertEl.present());
  }

  back() {
    this.router.navigate(['/menuadmin']);
  }
}
