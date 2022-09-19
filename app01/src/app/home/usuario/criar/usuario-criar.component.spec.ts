import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioCriarComponent } from './usuario-criar.component';

describe('UsuarioCriarComponent', () => {
  let component: UsuarioCriarComponent;
  let fixture: ComponentFixture<UsuarioCriarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioCriarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioCriarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
