import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsignarRolPage } from './asignar-rol.page';

describe('AsignarRolPage', () => {
  let component: AsignarRolPage;
  let fixture: ComponentFixture<AsignarRolPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarRolPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
