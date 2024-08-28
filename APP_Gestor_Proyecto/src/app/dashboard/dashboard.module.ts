import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPage } from './dashboard.page';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
  }
];
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DashboardPage], // Asegúrate de que el componente está declarado
  exports: [DashboardPage,RouterModule] // Exporta el componente si es necesario
})
export class DashboardPageModule {}
