import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleProyectosPageRoutingModule } from './detalle-proyectos-routing.module';

import { DetalleProyectosPage } from './detalle-proyectos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleProyectosPageRoutingModule
  ],
  declarations: [DetalleProyectosPage]
})
export class DetalleProyectosPageModule {}
