import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcaoItemComponent } from './acao-item.component';

describe('AcaoItemComponent', () => {
  let component: AcaoItemComponent;
  let fixture: ComponentFixture<AcaoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcaoItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcaoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
