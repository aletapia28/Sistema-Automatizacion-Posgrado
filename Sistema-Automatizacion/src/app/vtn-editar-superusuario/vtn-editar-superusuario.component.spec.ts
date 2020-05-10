import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtnEditarSuperusuarioComponent } from './vtn-editar-superusuario.component';

describe('VtnEditarSuperusuarioComponent', () => {
  let component: VtnEditarSuperusuarioComponent;
  let fixture: ComponentFixture<VtnEditarSuperusuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtnEditarSuperusuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtnEditarSuperusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
