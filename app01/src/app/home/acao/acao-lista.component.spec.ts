import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcaoListaComponent } from './acao-lista.component';

describe('AcaoListaComponent', () => {
  let component: AcaoListaComponent;
  let fixture: ComponentFixture<AcaoListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcaoListaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcaoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
