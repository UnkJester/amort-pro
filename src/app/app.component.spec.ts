import { async, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule, MatTableModule } from '@angular/material';
import { CalcComponent } from './calc/calc.component';
import { AmortTableComponent } from './amort-table/amort-table.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CalcComponent,
        AmortTableComponent
      ],
      imports: [
        FormsModule,
        MaterialModule,
        NoopAnimationsModule,
        MatTableModule,
        MatPaginatorModule
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
