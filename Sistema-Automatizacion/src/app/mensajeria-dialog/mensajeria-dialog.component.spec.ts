import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeriaDialogComponent } from './mensajeria-dialog.component';

describe('MensajeriaDialogComponent', () => {
  let component: MensajeriaDialogComponent;
  let fixture: ComponentFixture<MensajeriaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensajeriaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajeriaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
