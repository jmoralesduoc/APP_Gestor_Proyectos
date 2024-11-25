import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsignarRolPageRoutingModule } from './asignar-rol-routing.module';

import { AsignarRolPage } from './asignar-rol.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsignarRolPageRoutingModule
  ],
  declarations: [AsignarRolPage]
})
export class AsignarRolPageModule {}
