import { Component, OnInit } from '@angular/core';
import { Project } from '../proyectos/proyectos.module'; // Asegúrate de la ruta correcta

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.page.html',
  styleUrls: ['./proyectos.page.scss']
})
export class ProyectosPage implements OnInit {
  project: Project = {
    id: 0,
    name: '',
    description: '',
    dueDate: ''
  };

  isEditing: boolean = false; // Define la propiedad isEditing

  constructor() {}

  ngOnInit() {
    // Inicializa o carga el proyecto aquí
  }

  onSubmit() {
    // Lógica para manejar el envío del formulario
  }
}
