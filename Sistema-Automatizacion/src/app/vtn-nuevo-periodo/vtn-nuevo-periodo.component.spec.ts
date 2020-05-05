import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtnNuevoPeriodoComponent } from './vtn-nuevo-periodo.component';

describe('VtnNuevoPeriodoComponent', () => {
  let component: VtnNuevoPeriodoComponent;
  let fixture: ComponentFixture<VtnNuevoPeriodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtnNuevoPeriodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtnNuevoPeriodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
