import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtnRepostularComponent } from './vtn-repostular.component';

describe('VtnRepostularComponent', () => {
  let component: VtnRepostularComponent;
  let fixture: ComponentFixture<VtnRepostularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtnRepostularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtnRepostularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
