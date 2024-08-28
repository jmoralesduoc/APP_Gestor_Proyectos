import { Component, OnInit } from '@angular/core';
import { Project } from '..//proyectos/proyectos.module'; // Asegúrate de la ruta correcta
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss']
})
export class DashboardPage implements OnInit {
  projects: Project[] = [];

  data: any = {};  // Inicializar como un objeto vacío

  constructor(
    private router: Router,
    private activeroute: ActivatedRoute
  ) {
    this.activeroute.queryParams.subscribe(params => {
      const navigation = this.router.getCurrentNavigation();
      
      if (navigation && navigation.extras.state && navigation.extras.state) {
        this.data = navigation.extras.state;
        console.log(this.data.user);
        console.log(this.data.user.usuario);
        console.log(this.data.user.password);
      }
    });
  }

  ngOnInit() {
    // Inicializa proyectos aquí
  }

  openProject(id: number) {
    // Lógica para abrir el proyecto
  }

  createProject() {
    // Lógica para crear un nuevo proyecto
  }

  goToProfile() {
    // Lógica para ir al perfil
  }
}
