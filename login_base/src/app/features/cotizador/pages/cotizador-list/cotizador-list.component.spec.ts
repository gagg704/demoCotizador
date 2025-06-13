import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizadorListComponent } from './cotizador-list.component';

describe('CotizadorListComponent', () => {
  let component: CotizadorListComponent;
  let fixture: ComponentFixture<CotizadorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CotizadorListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CotizadorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
