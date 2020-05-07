import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraSistemaComponent } from './barra-sistema.component';

describe('BarraSistemaComponent', () => {
  let component: BarraSistemaComponent;
  let fixture: ComponentFixture<BarraSistemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarraSistemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarraSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
