import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtnEditarPostulanteComponent } from './vtn-editar-postulante.component';

describe('VtnEditarPostulanteComponent', () => {
  let component: VtnEditarPostulanteComponent;
  let fixture: ComponentFixture<VtnEditarPostulanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtnEditarPostulanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtnEditarPostulanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
