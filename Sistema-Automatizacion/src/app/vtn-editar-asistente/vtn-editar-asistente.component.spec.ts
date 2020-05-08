import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtnEditarAsistenteComponent } from './vtn-editar-asistente.component';

describe('VtnEditarAsistenteComponent', () => {
  let component: VtnEditarAsistenteComponent;
  let fixture: ComponentFixture<VtnEditarAsistenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtnEditarAsistenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtnEditarAsistenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
