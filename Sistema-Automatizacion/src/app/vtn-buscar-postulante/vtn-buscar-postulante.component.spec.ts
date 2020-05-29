import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtnBuscarPostulanteComponent } from './vtn-buscar-postulante.component';

describe('VtnBuscarPostulanteComponent', () => {
  let component: VtnBuscarPostulanteComponent;
  let fixture: ComponentFixture<VtnBuscarPostulanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtnBuscarPostulanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtnBuscarPostulanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
