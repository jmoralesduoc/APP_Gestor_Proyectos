import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle-proyectos',
  templateUrl: './detalle-proyectos.page.html',
  styleUrls: ['./detalle-proyectos.page.scss'],
})
export class DetalleProyectosPage implements OnInit {
  project: any;

  constructor() { 
    this.project = {
      name: '',
      dueDate: new Date(),
      description: '',
      tasks: [],
      members: []
    };

  }

  editProject() {
    // Implementar la lógica para editar el proyecto.
  }

  addTask() {
    // Implementar la lógica para añadir una tarea.
  }
  ngOnInit() {
  }

}
