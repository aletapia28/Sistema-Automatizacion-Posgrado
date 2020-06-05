import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtnRecuperarPassComponent } from './vtn-recuperar-pass.component';

describe('VtnRecuperarPassComponent', () => {
  let component: VtnRecuperarPassComponent;
  let fixture: ComponentFixture<VtnRecuperarPassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtnRecuperarPassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtnRecuperarPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
