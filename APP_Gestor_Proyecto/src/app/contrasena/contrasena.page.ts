import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contrasena',
  templateUrl: './contrasena.page.html',
  styleUrls: ['./contrasena.page.scss'],
})
export class ContrasenaPage implements OnInit {


  email: string;

  constructor() {
    this.email = '';
  }

  onSubmit() {
    // Implementar la lógica de envío del formulario.
  }
  
  ngOnInit() {
  }

}
