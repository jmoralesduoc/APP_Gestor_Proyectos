import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProyectosPage } from './proyectos.page';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [ProyectosPage], // Asegúrate de que el componente está declarado
  exports: [ProyectosPage] // Exporta el componente si es necesario
})
export class ProyectosPageModule {}


export interface Project {
  id: number;
  name: string;
  description: string;
  dueDate: string;
}
