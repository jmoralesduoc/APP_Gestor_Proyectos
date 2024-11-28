import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'; // Importa el AuthGuard

//DEFINE LAS RUTAS 
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',  
    pathMatch: 'full'
  },

  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'access',
    loadChildren: () => import('./access/access.module').then(m => m.AccessPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then(m => m.RegistroPageModule)
  },
  {
    path: 'contrasena',
    loadChildren: () => import('./contrasena/contrasena.module').then(m => m.ContrasenaPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule),
    canActivate: [AuthGuard]  // Usa el AuthGuard para proteger esta ruta
  },

  {
    path: 'detalle-proyectos',
    loadChildren: () => import('./detalle-proyectos/detalle-proyectos.module').then(m => m.DetalleProyectosPageModule)
  },
  {
    path: 'perfil-usuario',
    loadChildren: () => import('./perfil-usuario/perfil-usuario.module').then(m => m.PerfilUsuarioPageModule)
  },
  {
    path: 'configuracion',
    loadChildren: () => import('./configuracion/configuracion.module').then(m => m.ConfiguracionPageModule)
  },
  {
    path: 'reportes',
    loadChildren: () => import('./reportes/reportes.module').then(m => m.ReportesPageModule)
  },
  {
    path: 'menuadmin',
    loadChildren: () => import('./menuadmin/menuadmin.module').then(m => m.MenuadminPageModule)
  },
  {
    path: 'autorizaciones',
    loadChildren: () => import('./autorizaciones/autorizaciones.module').then(m => m.AutorizacionesPageModule)
  },
  {
    path: 'asignar-rol',
    loadChildren: () => import('./asignar-rol/asignar-rol.module').then( m => m.AsignarRolPageModule)
  },
  {
    path: 'clientes',
    loadChildren: () => import('./clientes/clientes.module').then( m => m.ClientesPageModule)
  },
  {
    path: 'proyectos',
    loadChildren: () => import('./proyectos/proyectos.module').then( m => m.ProyectosPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })  // Carga diferida para mejorar el rendimiento
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
