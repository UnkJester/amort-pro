import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmortTableComponent } from './amort-table.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule, MatTableModule } from '@angular/material';
import { MortgageInfo } from '../models/MortgageInfo';

describe('AmortTableComponent', () => {
  let component: AmortTableComponent;
  let fixture: ComponentFixture<AmortTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AmortTableComponent
      ],
      imports: [
        FormsModule,
        MaterialModule,
        NoopAnimationsModule,
        MatTableModule,
        MatPaginatorModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmortTableComponent);
    component = fixture.componentInstance;

    component.mortgageInfo = new MortgageInfo();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
