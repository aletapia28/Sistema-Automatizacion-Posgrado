import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtnAnalisisTabularComponent } from './vtn-analisis-tabular.component';

describe('VtnAnalisisTabularComponent', () => {
  let component: VtnAnalisisTabularComponent;
  let fixture: ComponentFixture<VtnAnalisisTabularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtnAnalisisTabularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtnAnalisisTabularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
