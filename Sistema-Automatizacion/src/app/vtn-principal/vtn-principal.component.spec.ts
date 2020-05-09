import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtnPrincipalComponent } from './vtn-principal.component';

describe('VtnPrincipalComponent', () => {
  let component: VtnPrincipalComponent;
  let fixture: ComponentFixture<VtnPrincipalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtnPrincipalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtnPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
