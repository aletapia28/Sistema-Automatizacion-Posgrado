import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraInferiorComponent } from './barra-inferior.component';

describe('BarraInferiorComponent', () => {
  let component: BarraInferiorComponent;
  let fixture: ComponentFixture<BarraInferiorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarraInferiorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarraInferiorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
