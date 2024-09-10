import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleProyectosPage } from './detalle-proyectos.page';

describe('DetalleProyectosPage', () => {
  let component: DetalleProyectosPage;
  let fixture: ComponentFixture<DetalleProyectosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleProyectosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
