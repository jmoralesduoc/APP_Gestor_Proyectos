import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { SrvClientesService } from '../srv-clientes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit {
  @ViewChild('modal', { static: false }) modal!: IonModal;

  searchControl = new FormControl('');
  searchQuery: string = '';
  allClients: any[] = [];
  filteredClients: any[] = [];
  isModalOpen = false;
  selectedClient: any;
  data: any = {};

  constructor(
    private router: Router,
    private activeroute: ActivatedRoute,
    private clientesService: SrvClientesService
  ) {
    this.activeroute.queryParams.subscribe(params => {
      const navigation = this.router.getCurrentNavigation();
      if (navigation && navigation.extras.state) {
        this.data = navigation.extras.state;
      }
    });
  }

  ngOnInit() {
    this.fetchClients();
  }

  fetchClients() {
    this.clientesService.getClientes().subscribe(
      (data) => {
        this.allClients = data.map(client => ({
          name: client.nombre,
          description: client.logo,
          detalle: client.detalle,
        }));
        this.filteredClients = [...this.allClients];
      },
      (error) => {
        console.error('Error al obtener los clientes:', error);
      }
    );
  }

  onSearch(event: any) {
    const query = event.target.value ? event.target.value.toLowerCase() : '';
    if (query.trim() === '') {
      this.filteredClients = [...this.allClients];
      return;
    }
    this.filteredClients = this.allClients.filter(client =>
      (client.name && client.name.toLowerCase().includes(query)) ||
      (client.detalle && client.detalle.toLowerCase().includes(query))
    );
  }

  openModal(client: any) {
    this.selectedClient = client;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedClient = null;
  }

  logout() {
    this.router.navigate(['/login']);
  }

  navigateToProjects(client: any) {
    this.router.navigate(['/proyectos'], {
      state: { clientId: client.id, clientName: client.name }
    });
  }
  
}
