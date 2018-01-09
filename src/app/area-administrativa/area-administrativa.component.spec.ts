import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaAdministrativaComponent } from './area-administrativa.component';

describe('AreaAdministrativaComponent', () => {
  let component: AreaAdministrativaComponent;
  let fixture: ComponentFixture<AreaAdministrativaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaAdministrativaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaAdministrativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
