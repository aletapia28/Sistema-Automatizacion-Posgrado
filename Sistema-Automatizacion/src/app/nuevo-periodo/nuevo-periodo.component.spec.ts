import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoPeriodoComponent } from './nuevo-periodo.component';

describe('NuevoPeriodoComponent', () => {
  let component: NuevoPeriodoComponent;
  let fixture: ComponentFixture<NuevoPeriodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoPeriodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoPeriodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
