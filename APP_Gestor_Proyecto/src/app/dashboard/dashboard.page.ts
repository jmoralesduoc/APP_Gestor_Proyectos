import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import type { Animation } from '@ionic/angular';
import { AnimationController, IonModal } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit {

  @ViewChild('modal', { static: false }) modal!: IonModal;  // Asegúrate de tener #modal en el HTML

  searchControl = new FormControl('');
  searchQuery: string = '';
  allClients: any[] = [];
  filteredClients: any[] = [];
  isModalOpen = false;
  selectedClient: any;

  data: any = {};

  private enterAnimation!: (baseEl: HTMLElement) => Animation;
  private leaveAnimation!: (baseEl: HTMLElement) => Animation;

  constructor(
    private router: Router,
    private activeroute: ActivatedRoute,
    private animationCtrl: AnimationController
  ) {
    this.activeroute.queryParams.subscribe(params => {
      const navigation = this.router.getCurrentNavigation();
      if (navigation && navigation.extras.state && navigation.extras.state) {
        this.data = navigation.extras.state;
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
    this.enterAnimation = (baseEl: HTMLElement) => {
      const root = baseEl.shadowRoot;
      const backdropAnimation = this.animationCtrl
        .create()
        .addElement(root!.querySelector('ion-backdrop')!)
        .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');
      const wrapperAnimation = this.animationCtrl
        .create()
        .addElement(root!.querySelector('.modal-wrapper')!)
        .keyframes([
          { offset: 0, opacity: '0', transform: 'scale(0)' },
          { offset: 1, opacity: '0.99', transform: 'scale(1)' },
        ]);
      return this.animationCtrl
        .create()
        .addElement(baseEl)
        .easing('ease-out')
        .duration(500)
        .addAnimation([backdropAnimation, wrapperAnimation]);
    };

    this.leaveAnimation = (baseEl: HTMLElement) => {
      return this.enterAnimation(baseEl).direction('reverse');
    };

    this.modal.enterAnimation = this.enterAnimation;
    this.modal.leaveAnimation = this.leaveAnimation;
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
    this.modal.dismiss();
  }
}
