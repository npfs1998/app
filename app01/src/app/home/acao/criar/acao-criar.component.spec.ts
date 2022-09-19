import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcaoCriarComponent } from './acao-criar.component';

describe('AcaoCriarComponent', () => {
  let component: AcaoCriarComponent;
  let fixture: ComponentFixture<UsuarioCriarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcaoCriarComponent ]
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
