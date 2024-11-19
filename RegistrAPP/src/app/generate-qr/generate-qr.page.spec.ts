import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenerateQRPage } from './generate-qr.page';

describe('GenerateQRPage', () => {
  let component: GenerateQRPage;
  let fixture: ComponentFixture<GenerateQRPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateQRPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
