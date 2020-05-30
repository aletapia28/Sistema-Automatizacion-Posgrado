import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtnEditarFormulaComponent } from './vtn-editar-formula.component';

describe('VtnEditarFormulaComponent', () => {
  let component: VtnEditarFormulaComponent;
  let fixture: ComponentFixture<VtnEditarFormulaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtnEditarFormulaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtnEditarFormulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
