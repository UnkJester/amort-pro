import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MortgageInfo } from '../models/MortgageInfo';
import { AmortTableEntry } from '../models/AmortTableEntry';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import * as _ from 'lodash';

@Component({
  selector: 'app-amort-table',
  templateUrl: './amort-table.component.html',
  styleUrls: ['./amort-table.component.scss']
})
export class AmortTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['paymentNum', 'date', 'balance', 'scheduledPayment', 'additionalPayment',
    'interest', 'principal', 'newBalance'];
  dataSource = new MatTableDataSource<AmortTableEntry>();
  dataEntries: AmortTableEntry[];
  @Input() mortgageInfo: MortgageInfo;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  private dataDirty: boolean;

  constructor() { }

  ngOnInit() {
    this.dataDirty = false;
    this.computeFillTable();
    this.dataSource = new MatTableDataSource<AmortTableEntry>(this.dataEntries);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  initTable() {
    this.dataEntries = [];
    this.dataEntries.push({
      paymentNum: 1,
      date: new Date(2018, 9, 1), // TODO update to get next available date
      balance: this.mortgageInfo.principal,
      scheduledPayment: this.mortgageInfo.monthlyPayment,
      additionalPayment: 0,
      interest: this.mortgageInfo.monthlyInterestRate * this.mortgageInfo.principal / 100,
      principal: this.mortgageInfo.monthlyPayment - this.mortgageInfo.monthlyInterestRate * this.mortgageInfo.principal / 100,
      newBalance: this.mortgageInfo.principal -
        (this.mortgageInfo.monthlyPayment - this.mortgageInfo.monthlyInterestRate * this.mortgageInfo.principal / 100),
      editable: true
    });
  }

  computeFillTable() {
    this.initTable();
    let remainingBalance = this.dataEntries[0].newBalance;
    let count = 0;
    while (remainingBalance > 0 && count <= this.mortgageInfo.loanDurationMonths) {
      const entry = new AmortTableEntry();
      const prevEntry = this.dataEntries[this.dataEntries.length - 1];
      entry.paymentNum = prevEntry.paymentNum + 1;
      entry.date = this.addMonth(prevEntry.date);
      entry.balance = prevEntry.newBalance;
      entry.scheduledPayment = entry.balance > prevEntry.scheduledPayment ? prevEntry.scheduledPayment : entry.balance;
      entry.additionalPayment = 0;
      entry.interest = this.mortgageInfo.monthlyInterestRate * entry.balance / 100;
      entry.principal = entry.balance === entry.scheduledPayment ? entry.balance :
        entry.scheduledPayment - entry.interest + entry.additionalPayment;
      entry.newBalance = entry.balance - entry.principal;
      this.dataEntries.push(entry);
      remainingBalance = entry.newBalance;
      count += 1;
    }
  }

  addMonth(date: Date): Date {
    const newDate = new Date(date.getTime());
    newDate.setMonth(newDate.getMonth() + 1);
    return newDate;
  }

  updateTable(paymentNum: number) {
    if (this.dataDirty) {
      this.updateDataSourceChanges(paymentNum);
      this.dataDirty = false;
    }
  }

  addlPayDirty() {
    this.dataDirty = true;
  }

  updateDataSourceChanges(paymentChanged: number) {
    if (paymentChanged === 1) {
      const entry = this.dataEntries[0];
      entry.principal = entry.scheduledPayment - entry.interest + entry.additionalPayment;
      entry.newBalance = entry.balance - entry.principal;
      paymentChanged += 1; // Use this to pass below to update all other rows
    }
    for (let i = paymentChanged - 1; i < this.dataEntries.length; i++) {
      const entry = this.dataEntries[i];
      const prevEntry = this.dataEntries[i - 1];
      entry.balance = prevEntry.newBalance;
      entry.scheduledPayment = entry.balance > prevEntry.scheduledPayment ? prevEntry.scheduledPayment : entry.balance;
      entry.interest = this.mortgageInfo.monthlyInterestRate * entry.balance / 100;
      entry.principal = entry.balance === entry.scheduledPayment ? entry.balance :
        entry.scheduledPayment - entry.interest + entry.additionalPayment;
      entry.newBalance = entry.balance - entry.principal;
    }
  }

  getTotalAddl() {
    return this.dataEntries.reduce(function(prev, cur) {
      return prev + cur.additionalPayment;
    }, 0);
  }

  getTotalInt() {
    return this.dataEntries.reduce(function(prev, cur) {
      return prev + cur.interest;
    }, 0);
  }

  getTotalPrin() {
    return this.dataEntries.reduce(function(prev, cur) {
      return prev + cur.principal;
    }, 0);
  }

  getLastPaymentDate() {
    const index = _.findIndex(this.dataEntries, {'newBalance': 0});
    if (index >= 0) {
      return this.dataEntries[index].date;
    }
    return 0;
  }
}
