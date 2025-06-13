import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizadorTableComponent } from './cotizador-table.component';

describe('CotizadorTableComponent', () => {
  let component: CotizadorTableComponent;
  let fixture: ComponentFixture<CotizadorTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CotizadorTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CotizadorTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
