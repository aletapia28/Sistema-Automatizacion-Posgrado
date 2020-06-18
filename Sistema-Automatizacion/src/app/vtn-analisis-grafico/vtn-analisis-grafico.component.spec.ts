import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtnAnalisisGraficoComponent } from './vtn-analisis-grafico.component';

describe('VtnAnalisisGraficoComponent', () => {
  let component: VtnAnalisisGraficoComponent;
  let fixture: ComponentFixture<VtnAnalisisGraficoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtnAnalisisGraficoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtnAnalisisGraficoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
