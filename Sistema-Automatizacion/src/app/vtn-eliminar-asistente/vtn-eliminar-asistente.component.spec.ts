import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtnEliminarAsistenteComponent } from './vtn-eliminar-asistente.component';

describe('VtnEliminarAsistenteComponent', () => {
  let component: VtnEliminarAsistenteComponent;
  let fixture: ComponentFixture<VtnEliminarAsistenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtnEliminarAsistenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtnEliminarAsistenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
