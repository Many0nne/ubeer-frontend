import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiyAgePopupComponent } from './verifiy-age-popup.component';

describe('VerifiyAgePopupComponent', () => {
  let component: VerifiyAgePopupComponent;
  let fixture: ComponentFixture<VerifiyAgePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifiyAgePopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifiyAgePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
