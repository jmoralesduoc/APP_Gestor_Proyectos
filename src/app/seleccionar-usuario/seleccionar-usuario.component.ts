import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '..//srv-usuario.service'; // Asegúrate de que la ruta sea correcta
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-seleccionar-usuario',
  templateUrl: './seleccionar-usuario.component.html',
  styleUrls: ['./seleccionar-usuario.component.scss'],
})
export class SeleccionarUsuarioComponent implements OnInit {
  usuarios: any[] = []; // Lista de usuarios que se mostrará en el modal

  constructor(
    private usuarioService: UsuarioService, // Servicio para interactuar con la API
    private modalController: ModalController // Para cerrar el modal
  ) {}

  ngOnInit() {
    this.cargarUsuarios(); // Cargar usuarios al inicializar el componente
  }

  // Método para cargar usuarios desde el servicio
  cargarUsuarios() {
    this.usuarioService.obtenerMaxClienteId().subscribe(
      (data) => {
        this.usuarios = data; // Asigna los usuarios obtenidos al array
      },
      (error) => {
        console.error('Error al cargar usuarios:', error); // Manejo de errores
      }
    );
  }

  // Método para seleccionar un usuario
  seleccionarUsuario(usuario: any) {
    this.modalController.dismiss({
      usuarioId: usuario.id, // Retorna el ID del usuario seleccionado
    });
  }

  // Método para cerrar el modal sin seleccionar un usuario
  cerrarModal() {
    this.modalController.dismiss();
  }
}
