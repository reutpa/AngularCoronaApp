import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpidemiologyReportComponent } from './epidemiology-report.component';

describe('EpidemiologyReportComponent', () => {
  let component: EpidemiologyReportComponent;
  let fixture: ComponentFixture<EpidemiologyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpidemiologyReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpidemiologyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
