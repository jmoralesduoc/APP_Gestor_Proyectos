import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ContrasenaPageRoutingModule } from './contrasena-routing.module';
import { ContrasenaPage } from './contrasena.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,   // Asegúrate de importar ReactiveFormsModule
    IonicModule,           // Importa IonicModule para los componentes de Ionic
    ContrasenaPageRoutingModule
  ],
  declarations: [ContrasenaPage]
})
export class ContrasenaPageModule {}
