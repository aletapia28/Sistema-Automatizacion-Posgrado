import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtnLoginComponent } from './vtn-login.component';

describe('VtnLoginComponent', () => {
  let component: VtnLoginComponent;
  let fixture: ComponentFixture<VtnLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtnLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtnLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
