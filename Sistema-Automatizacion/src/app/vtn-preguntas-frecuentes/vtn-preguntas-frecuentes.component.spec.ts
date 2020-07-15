import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtnPreguntasFrecuentesComponent } from './vtn-preguntas-frecuentes.component';

describe('VtnPreguntasFrecuentesComponent', () => {
  let component: VtnPreguntasFrecuentesComponent;
  let fixture: ComponentFixture<VtnPreguntasFrecuentesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtnPreguntasFrecuentesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtnPreguntasFrecuentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
