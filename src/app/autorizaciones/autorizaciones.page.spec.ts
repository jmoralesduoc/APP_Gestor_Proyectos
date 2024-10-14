import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutorizacionesPage } from './autorizaciones.page';

describe('AutorizacionesPage', () => {
  let component: AutorizacionesPage;
  let fixture: ComponentFixture<AutorizacionesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorizacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
