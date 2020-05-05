import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtnCrearUsuarioComponent } from './vtn-crear-usuario.component';

describe('VtnCrearUsuarioComponent', () => {
  let component: VtnCrearUsuarioComponent;
  let fixture: ComponentFixture<VtnCrearUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtnCrearUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtnCrearUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
