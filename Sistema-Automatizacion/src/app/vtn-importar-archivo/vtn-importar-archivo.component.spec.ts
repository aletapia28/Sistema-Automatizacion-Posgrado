import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtnImportarArchivoComponent } from './vtn-importar-archivo.component';

describe('VtnImportarArchivoComponent', () => {
  let component: VtnImportarArchivoComponent;
  let fixture: ComponentFixture<VtnImportarArchivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtnImportarArchivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtnImportarArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
