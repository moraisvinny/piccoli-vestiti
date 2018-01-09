import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAdministrativoComponent } from './login-administrativo.component';

describe('LoginAdministrativoComponent', () => {
  let component: LoginAdministrativoComponent;
  let fixture: ComponentFixture<LoginAdministrativoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginAdministrativoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
