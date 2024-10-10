
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import type { Animation } from '@ionic/angular';
import { AnimationController, IonModal } from '@ionic/angular';


@Component({
  selector: 'app-menuadmin',
  templateUrl: './menuadmin.page.html',
  styleUrls: ['./menuadmin.page.scss'],
})
export class MenuadminPage implements OnInit {
  data: any = {};

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
  }

  logout() {
    this.router.navigate(['/login']);
  }
  irAutorizaciones(){

  }
  irClientes(){

  }
  irProyectos(){
    
  }
}
