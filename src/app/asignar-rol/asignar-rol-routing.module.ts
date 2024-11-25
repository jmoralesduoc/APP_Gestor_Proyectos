import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsignarRolPage } from './asignar-rol.page';

const routes: Routes = [
  {
    path: '',
    component: AsignarRolPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsignarRolPageRoutingModule {}
