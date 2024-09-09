import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AnimationController } from '@ionic/angular';
import type { Animation } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit {

  @ViewChild('card', { static: false }) card: ElementRef | undefined;  // Referencia al IonCard

  searchControl = new FormControl('');
  searchQuery: string = '';
  allClients: any[] = [];
  filteredClients: any[] = [];
  isModalOpen = false;
  selectedClient: any;

  data: any = {};  // Inicializar como un objeto vacío

  private animation!: Animation;

  constructor(
    private router: Router,
    private activeroute: ActivatedRoute,
    private animationCtrl: AnimationController
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
    this.allClients = [
      { name: 'CCU', description: 'assets/img/ccu.png', detalle: 'CCU es una empresa multicategoría...' },
      { name: 'Coca-Cola', description: 'assets/img/cocacola.png', detalle: 'Somos el embotellador más grande del mundo...' },
      { name: 'Meta', description: 'assets/img/meta.png', detalle: 'Meta desarrolla tecnologías que ayudan a las personas...' },
    ];
    this.filteredClients = [...this.allClients];
    
  }

  ngAfterViewInit() {
    if (this.card) {  // Asegúrate de que this.card no es undefined
      this.animation = this.animationCtrl
        .create()
        .addElement(this.card.nativeElement)
        .duration(3000)
        .iterations(Infinity)
        .keyframes([
          { offset: 0, width: '80px' },
          { offset: 0.72, width: 'var(--width)' },
          { offset: 1, width: '240px' },
        ]);
      
    }
  }

  onSearch(event: any) {
    this.searchQuery = event.detail.value.toLowerCase();
    this.filteredClients = this.allClients.filter(client =>
      client.name.toLowerCase().includes(this.searchQuery) ||
      client.description.toLowerCase().includes(this.searchQuery)
    );
  }

  logout() {
    this.router.navigate(['/login']);
  }

  openModal(client: any) {
    this.selectedClient = client;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedClient = null;
  }
}
