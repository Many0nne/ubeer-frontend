import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerComponent } from './beer.component';

describe('BeerComponent', () => {
  let component: BeerComponent;
  let fixture: ComponentFixture<BeerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
