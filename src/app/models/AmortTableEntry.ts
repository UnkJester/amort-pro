export class AmortTableEntry {
  paymentNum: number;
  date: Date;
  balance: number;
  scheduledPayment: number;
  additionalPayment: number;
  interest: number;
  principal: number;
  newBalance: number;
  editable = true;
}
