import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtnImportarPeriodoComponent } from './vtn-importar-periodo.component';

describe('ImportarPeriodoComponent', () => {
  let component: VtnImportarPeriodoComponent;
  let fixture: ComponentFixture<VtnImportarPeriodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtnImportarPeriodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtnImportarPeriodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
