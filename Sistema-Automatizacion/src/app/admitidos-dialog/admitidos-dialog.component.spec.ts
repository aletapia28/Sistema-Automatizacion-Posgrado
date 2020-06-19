import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmitidosDialogComponent } from './admitidos-dialog.component';

describe('AdmitidosDialogComponent', () => {
  let component: AdmitidosDialogComponent;
  let fixture: ComponentFixture<AdmitidosDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmitidosDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmitidosDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
