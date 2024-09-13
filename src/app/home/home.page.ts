import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

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

  ngOnInit() { }
}
