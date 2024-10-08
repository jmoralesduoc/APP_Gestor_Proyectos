import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http'; // Asegúrate de que esta línea esté presente

import { RegistroPageRoutingModule } from './registro-routing.module';
import { RegistroPage } from './registro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HttpClientModule, // Asegúrate de que esto no esté tachado
    RegistroPageRoutingModule
  ],
  declarations: [RegistroPage]
})
export class RegistroPageModule {}
