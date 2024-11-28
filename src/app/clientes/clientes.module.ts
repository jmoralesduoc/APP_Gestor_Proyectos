import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ClientesPageRoutingModule } from './clientes-routing.module';
import { ClientesPage } from './clientes.page';
import { SharedModule } from '../shared/shared.module'; // Importa el módulo compartido

@NgModule({
  declarations: [
    ClientesPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientesPageRoutingModule,
    SharedModule, // Asegúrate de importarlo aquí
  ],
})
export class ClientesPageModule {}
