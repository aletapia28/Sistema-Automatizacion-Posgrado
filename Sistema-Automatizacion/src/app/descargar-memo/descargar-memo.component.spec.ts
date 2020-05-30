import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescargarMemoComponent } from './descargar-memo.component';

describe('DescargarMemoComponent', () => {
  let component: DescargarMemoComponent;
  let fixture: ComponentFixture<DescargarMemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescargarMemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescargarMemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
