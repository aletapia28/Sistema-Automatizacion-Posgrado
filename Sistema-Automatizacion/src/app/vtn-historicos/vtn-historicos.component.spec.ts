import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtnHistoricosComponent } from './vtn-historicos.component';

describe('VtnHistoricosComponent', () => {
  let component: VtnHistoricosComponent;
  let fixture: ComponentFixture<VtnHistoricosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtnHistoricosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtnHistoricosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
