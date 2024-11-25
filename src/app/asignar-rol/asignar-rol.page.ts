import { Component, OnInit } from '@angular/core';
import { SrvAsignarRolService } from '..//srv-asignar-rol.service.service';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertInput } from '@ionic/core'; // Agrega esta línea


@Component({
  selector: 'app-asignar-rol',
  templateUrl: './asignar-rol.page.html',
  styleUrls: ['./asignar-rol.page.scss'],
  
})
export class AsignarRolPage implements OnInit {
  usuarios: any[] = [];
  autorizaciones: any[] = [];
  usuarioAutorizaciones: any[] = [];
  usuarioSeleccionado: any;
  autorizacionSeleccionada: any;

  constructor(
    private asignarRolService: SrvAsignarRolService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    // Cargar usuarios
    this.asignarRolService.getUsuarios().subscribe((usuarios) => {
      this.usuarios = usuarios;
  
      // Cargar autorizaciones
      this.asignarRolService.getAutorizaciones().subscribe((autorizaciones) => {
        this.autorizaciones = autorizaciones;
  
        // Cargar usuario-autorizaciones y mapear con usuarios
        this.asignarRolService.getUsuarioAutorizaciones().subscribe((data) => {
          this.usuarioAutorizaciones = data
            .map((asignacion) => {
              // Buscar el usuario por ID
              const usuario = this.usuarios.find((u) => u.id === asignacion.usuario_id);
              if (usuario) {
                return {
                  ...asignacion,
                  nombreUsuario: `${usuario.nombres} ${usuario.apellidos}`,
                };
              } else {
                return null; // Si no se encuentra el usuario, devolver null
              }
            })
            .filter((asignacion) => asignacion !== null); // Filtrar asignaciones no válidas
        });
      });
    });
  }
  
  
  asignarRol() {
    if (!this.usuarioSeleccionado || !this.autorizacionSeleccionada) {
      this.mostrarAlerta('Error', 'Debe seleccionar un usuario y un rol.');
      return;
    }
  
    // Construir el objeto de datos
    const data = {
      usuario_id: this.usuarioSeleccionado.id, // Usuario seleccionado
      autorizacion_id: this.autorizacionSeleccionada.id, // Rol seleccionado
    };
  
    console.log('Datos enviados al backend:', data); // Agregar log para debug
  
    this.asignarRolService.asignarAutorizacion(data).subscribe(() => {
      this.mostrarAlerta('Éxito', 'El rol ha sido asignado correctamente.');
      this.cargarDatos();
    }, (error) => {
      console.error('Error en la asignación:', error); // Agregar log para debug
      this.mostrarAlerta('Error', 'No se pudo asignar el rol.');
    });
  }
  

  modificarAsignacion(asignacion: any) {
    // Crear opciones de autorizaciones como radio buttons
    const opcionesAutorizaciones: AlertInput[] = this.autorizaciones.map((autorizacion) => ({
      type: 'radio', // Asegúrate de usar el literal "radio"
      label: autorizacion.nombre_autorizacion, // Nombre del rol
      value: autorizacion.id, // ID del rol
      checked: autorizacion.id === asignacion.autorizacion_id, // Seleccionar si es el rol actual
    }));
  
    // Crear el alert
    this.alertController
      .create({
        header: 'Modificar Rol',
        inputs: opcionesAutorizaciones, // Añadir las opciones de roles
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'Modificar',
            handler: (autorizacion_id) => {
              if (!autorizacion_id) {
                this.mostrarAlerta('Error', 'Debe seleccionar un rol.');
                return;
              }
  
              // Crear la nueva asignación con el nuevo rol
              const nuevaAsignacion = {
                usuario_id: asignacion.usuario_id, // Usuario actual
                autorizacion_id, // Nuevo rol seleccionado
              };
  
              // Llamar al servicio para guardar los cambios
              this.asignarRolService.asignarAutorizacion(nuevaAsignacion).subscribe(() => {
                this.mostrarAlerta('Éxito', 'Rol modificado correctamente.');
                this.cargarDatos(); // Recargar lista
              }, () => {
                this.mostrarAlerta('Error', 'No se pudo modificar el rol.');
              });
            },
          },
        ],
      })
      .then((alertEl) => alertEl.present());
  }
  
  
  
  

  eliminarAsignacion(asignacion: any) {
    this.alertController
      .create({
        header: 'Confirmar Eliminación',
        message: `¿Estás seguro de que deseas eliminar la asignación del usuario "${asignacion.nombreUsuario}" con el rol ID "${asignacion.autorizacion_id}"?`,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'Eliminar',
            handler: () => {
              // Crear objeto de eliminación
              const data = {
                usuario_id: asignacion.usuario_id, // ID del usuario
                autorizacion_id: asignacion.autorizacion_id, // ID del rol o asignación
              };
  
              // Llamar al servicio de eliminación
              this.asignarRolService.eliminarAutorizacion(data).subscribe(() => {
                this.mostrarAlerta('Éxito', 'Asignación eliminada correctamente.');
                this.cargarDatos();
              }, () => {
                this.mostrarAlerta('Error', 'No se pudo eliminar la asignación.');
              });
            },
          },
        ],
      })
      .then((alertEl) => alertEl.present());
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

