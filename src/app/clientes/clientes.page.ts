import { Component, OnInit } from '@angular/core';
import { SrvClientesService } from '..//srv-clientes.service';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {
  clientes: any[] = [];

  constructor(
    private clientesService: SrvClientesService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.cargarClientes();
  }

  cargarClientes() {
    this.clientesService.getClientes().subscribe((data) => {
      this.clientes = data;
    });
  }

  async editarCliente(cliente: any) {
    const alert = await this.alertController.create({
      header: 'Editar Cliente',
      inputs: [
        { name: 'nombre', type: 'text', placeholder: 'Nombre', value: cliente.nombre },
        { name: 'direccion', type: 'text', placeholder: 'Dirección', value: cliente.direccion },
        { name: 'telefono', type: 'text', placeholder: 'Teléfono', value: cliente.telefono },
        { name: 'correo', type: 'text', placeholder: 'Correo', value: cliente.correo },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (data) => {
            this.clientesService.updateCliente(cliente.id, data).subscribe(() => {
              this.cargarClientes();
            });
          },
        },
      ],
    });

    await alert.present();
  }

  async eliminarCliente(cliente: any) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: `¿Estás seguro de que deseas eliminar a "${cliente.nombre}"?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: () => {
            this.clientesService.deleteCliente(cliente.id).subscribe(() => {
              this.cargarClientes();
            });
          },
        },
      ],
    });

    await alert.present();
  }

  async cargarLogo(cliente: any) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const base64 = await this.convertToBase64(file);
        this.clientesService.updateLogo(cliente.id, base64).subscribe(() => {
          this.cargarClientes();
        });
      }
    };
    input.click();
  }

  convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  async crearCliente() {
    const alert = await this.alertController.create({
      header: 'Crear Nuevo Cliente',
      inputs: [
        { name: 'nombre', type: 'text', placeholder: 'Nombre' },
        { name: 'direccion', type: 'text', placeholder: 'Dirección' },
        { name: 'telefono', type: 'text', placeholder: 'Teléfono' },
        { name: 'correo', type: 'text', placeholder: 'Correo Electrónico' },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => true, // Asegura un retorno explícito
        },
        {
          text: 'Crear',
          handler: (data) => {
            // Validar datos ingresados
            if (!data.nombre || !data.direccion || !data.telefono || !data.correo) {
              this.mostrarAlerta('Error', 'Todos los campos son obligatorios.');
              return false; // Mantiene la ventana abierta si hay un error
            }
  
            // Llamar al servicio para crear el cliente
            this.clientesService.createCliente(data).subscribe(() => {
              this.mostrarAlerta('Éxito', 'Cliente creado correctamente.');
              this.cargarClientes();
            });
            return true; // Cierra el alert después de crear el cliente
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
