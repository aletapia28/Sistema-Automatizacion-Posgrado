import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtnEditarPeriodoComponent } from './vtn-editar-periodo.component';

describe('VtnEditarPeriodoComponent', () => {
  let component: VtnEditarPeriodoComponent;
  let fixture: ComponentFixture<VtnEditarPeriodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtnEditarPeriodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtnEditarPeriodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
