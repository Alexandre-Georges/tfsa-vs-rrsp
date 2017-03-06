import React from "react";
import * as accounts from "./accounts";

class Comparison extends React.Component {

  constructor (props) {
    super(props);
    this.generateDefaultCell = this.generateDefaultCell.bind(this);
    this.formatCurrency = this.formatCurrency.bind(this);
  }

  formatCurrency (value) {
    return numeral(value).format('$0,0');
  }

  generateDefaultCell (content = 0) {
    return (
      <div className="cell">{this.formatCurrency(content)}</div>
    )
  }

  isAmountAfterDepositDisplayed (state) {
    return state.currentMarginalTaxRate !== null &&
      state.amountOfDeposit !== null;
  }

  isFutureValueDisplayed (state) {
    return state.currentMarginalTaxRate !== null &&
      state.amountOfDeposit !== null &&
      state.yearsInvested !== null &&
      state.returnOnInvestment !== null &&
      state.inflationRate !== null;
  }

  isTaxesAtWithdrawalDisplayed (state) {
    return state.currentMarginalTaxRate !== null &&
      state.amountOfDeposit !== null &&
      state.yearsInvested !== null &&
      state.returnOnInvestment !== null &&
      state.inflationRate !== null &&
      state.retirementAverageTaxRate !== null;
  }

  isAmountAfterWithdrawalDisplayed (state) {
    return state.currentMarginalTaxRate !== null &&
      state.amountOfDeposit !== null &&
      state.yearsInvested !== null &&
      state.returnOnInvestment !== null &&
      state.inflationRate !== null &&
      state.retirementAverageTaxRate !== null;
  }

  render() {

    var amountAfterDepositTSFA = this.generateDefaultCell();
    var amountAfterDepositRRSP = this.generateDefaultCell();

    if (this.isAmountAfterDepositDisplayed(this.props.parentState.data)) {
      amountAfterDepositTSFA = this.generateDefaultCell(accounts.TFSA.calculateAmountAfterDeposit(this.props.parentState.data));
      amountAfterDepositRRSP = this.generateDefaultCell(accounts.RRSP.calculateAmountAfterDeposit(this.props.parentState.data));
    }

    var futureValueTFSA = this.generateDefaultCell();
    var futureValueRRSP = this.generateDefaultCell();

    if (this.isFutureValueDisplayed(this.props.parentState.data)) {
      futureValueTFSA = this.generateDefaultCell(accounts.TFSA.calculateFutureValue(this.props.parentState.data));
      futureValueRRSP = this.generateDefaultCell(accounts.RRSP.calculateFutureValue(this.props.parentState.data));
    }

    var taxesAtWithdrawalTFSA = this.generateDefaultCell();
    var taxesAtWithdrawalRRSP = this.generateDefaultCell();

    if (this.isTaxesAtWithdrawalDisplayed(this.props.parentState.data)) {
      taxesAtWithdrawalTFSA = this.generateDefaultCell(accounts.TFSA.calculateTaxesAtWithdrawal(this.props.parentState.data));
      taxesAtWithdrawalRRSP = this.generateDefaultCell(accounts.RRSP.calculateTaxesAtWithdrawal(this.props.parentState.data));
    }

    var amountAfterWithdrawalTFSA = this.generateDefaultCell();
    var amountAfterWithdrawalRRSP = this.generateDefaultCell();

    if (this.isAmountAfterWithdrawalDisplayed(this.props.parentState.data)) {
      amountAfterWithdrawalTFSA = this.generateDefaultCell(accounts.TFSA.calculateAmountAfterWithdrawal(this.props.parentState.data));
      amountAfterWithdrawalRRSP = this.generateDefaultCell(accounts.RRSP.calculateAmountAfterWithdrawal(this.props.parentState.data));
    }

    return (
      <div id="results" className="table">
        <div className="row">
          <div className="cell"></div>
          <div className="cell">
            RRSP
          </div>
          <div className="cell">
            TFSA
          </div>
        </div>
        <div className="row">
          <div className="cell">Amount after deposit</div>
          {amountAfterDepositRRSP}
          {amountAfterDepositTSFA}
        </div>
        <div className="row">
          <div className="cell">Future value</div>
          {futureValueRRSP}
          {futureValueTFSA}
        </div>
        <div className="row">
          <div className="cell">Taxes at withdrawal</div>
          {taxesAtWithdrawalRRSP}
          {taxesAtWithdrawalTFSA}
        </div>
        <div className="row">
          <div className="cell">Amount after withdrawal</div>
          {amountAfterWithdrawalRRSP}
          {amountAfterWithdrawalTFSA}
        </div>
      </div>
    );
  }
}

export default Comparison;
