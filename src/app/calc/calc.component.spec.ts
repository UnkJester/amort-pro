import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcComponent } from './calc.component';
import { MortgageInfo } from '../models/MortgageInfo';
import { MatCardModule, MatPaginatorModule, MatTableModule } from '@angular/material';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { AmortTableComponent } from '../amort-table/amort-table.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CalcComponent', () => {
  let component: CalcComponent;
  let fixture: ComponentFixture<CalcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CalcComponent,
        AmortTableComponent
      ],
      imports: [
        FormsModule,
        MaterialModule,
        MatCardModule,
        NoopAnimationsModule,
        MatTableModule,
        MatPaginatorModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
