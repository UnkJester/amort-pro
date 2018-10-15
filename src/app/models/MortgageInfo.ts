export class MortgageInfo {
  purchasePrice?: number;
  percentDownPayment?: number;
  loanAmount?: number;
  principal?: number;
  interestRate?: number;
  loanDurationYears?: number;
  loanDurationMonths?: number;
  periodsPerYear = 12; // default to months for now, update later
  monthlyInterestRate?: number;
  monthlyPayment?: number;
  nextPaymentDate = Date.now();

  public static calcPaymentAmount(loanAmount: number, interestRate: number, numPayments: number): number {
    const top = interestRate * Math.pow(1 + interestRate, numPayments);
    const bottom = Math.pow(1 + interestRate, numPayments) - 1;
    // Round result to two decimal places
    return Math.round(loanAmount * (top / bottom) * 100) / 100;
  }

  constructor(purchasePrice?: number, percentDownPayment?: number, loanAmount?: number, principal?: number,
              interestRate?: number, loanDurationYears?: number, loanDurationMonths?: number,
              monthlyInterestRate?: number, monthlyPayment?: number, nextPaymentDate?: number) {
    this.purchasePrice = purchasePrice;
    this.percentDownPayment = percentDownPayment;
    this.loanAmount = loanAmount;
    this.principal = principal;
    this.interestRate = interestRate;
    this.loanDurationYears = loanDurationYears;
    this.loanDurationMonths = loanDurationMonths;
    this.monthlyInterestRate = monthlyInterestRate;
    this.monthlyPayment = monthlyPayment;
    this.nextPaymentDate = nextPaymentDate;
  }

  updateLoanAmount = () => {
    this.loanAmount = this.purchasePrice * (1 - this.percentDownPayment / 100);
  }
  updateDurationToMonths = () => {
    this.loanDurationMonths = this.loanDurationYears * this.periodsPerYear;
  }

  updateMonthlyInterestRate = () => {
    this.monthlyInterestRate = this.interestRate / this.periodsPerYear;
  }

  updateMonthlyPayment() {
    const p = this.loanAmount;
    const i = this.interestRate / 100 / 12;
    const n = this.periodsPerYear * this.loanDurationYears;

    this.monthlyPayment = MortgageInfo.calcPaymentAmount(p, i, n);
  }
}
