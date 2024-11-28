import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SeleccionarUsuarioComponent } from '../seleccionar-usuario/seleccionar-usuario.component';

@NgModule({
  declarations: [
    SeleccionarUsuarioComponent, // Declara el componente
  ],
  imports: [
    CommonModule,
    IonicModule, // Importa los módulos necesarios para componentes de Ionic
  ],
  exports: [
    SeleccionarUsuarioComponent, // Exporta el componente si se usará en otros módulos
  ],
})
export class SharedModule {}
