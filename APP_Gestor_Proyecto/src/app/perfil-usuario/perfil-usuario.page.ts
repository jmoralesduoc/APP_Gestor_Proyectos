import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {
  user: any;

  constructor() {
    this.user = {
      name: '',
      email: ''
    };

   }

   updateProfile() {
    // Implementar la lógica para actualizar el perfil de usuario.
  }
  ngOnInit() {
  }

}
