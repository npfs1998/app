import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioItemComponent } from './usuario-item.component';

describe('AcaoItemComponent', () => {
  let component: UsuarioItemComponent;
  let fixture: ComponentFixture<UsuarioItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
