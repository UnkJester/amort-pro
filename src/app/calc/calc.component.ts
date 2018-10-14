import { Component, OnInit } from '@angular/core';
import {MortgageInfo} from '../models/MortgageInfo';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.scss']
})
export class CalcComponent implements OnInit {
  mortgage: MortgageInfo;
  amortTrigger = false;
  constructor() { }

  ngOnInit() {
    this.mortgage = new MortgageInfo();
    // console.log(this.mortgage);
    // console.log('payment: ' + MortgageInfo.calcPaymentAmount(185250, .04 / 12, 360));
  }

  getMonthlyInterest(): number {
    if (this.mortgage.monthlyInterestRate && this.mortgage.principal) {
      return this.mortgage.principal * this.mortgage.monthlyInterestRate / 100;
    } else {
      return 0;
    }
  }

  updatePurchasePrice() {
    this.mortgage.updateLoanAmount();
    this.mortgage.updateMonthlyPayment();
  }

  updateDownPaymentPercentage() {
    this.mortgage.updateLoanAmount();
    this.mortgage.updateMonthlyPayment();
  }

  updateInterestRate() {
    this.mortgage.updateMonthlyInterestRate();
    this.mortgage.updateMonthlyPayment();
  }

  updateLoanDuration() {
    this.mortgage.updateDurationToMonths();
    this.mortgage.updateMonthlyPayment();
  }

  triggerAmortCalendar() {
    // TODO fix hardcoded start date
    console.log(this.amortTrigger);
    if (this.mortgage.principal && this.mortgage.monthlyPayment) {
      this.amortTrigger = !this.amortTrigger;
    }
  }

}
