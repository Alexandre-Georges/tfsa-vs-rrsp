import React from "react";
import * as calculator from "./calculator";
import * as accounts from "./accounts";

class Form extends React.Component {

  constructor() {
    super();
    this.NUMBER_ERROR = "Number expected e.g. 5";
    this.PERCENTAGE_ERROR = "Percentage expected e.g. 40";
  }

  updateCurrentMarginalTaxRate (event) {
    var value = parseInt(event.target.value);
    var message = null;
    if (!Number.isInteger(value)) {
      value = null;
      message = this.PERCENTAGE_ERROR;
    } else {
      value = calculator.round2Digits(value / 100);
    }
    this.props.updatePropertyInState(accounts.DATA_KEY_VALUES.CURRENT_MARGIN_TAX_RATE, value, message);
  }

  updateRetirementAverageTaxRate (event) {
    var value = parseInt(event.target.value);
    var message = null;
    if (!Number.isInteger(value)) {
      value = null;
      message = this.PERCENTAGE_ERROR;
    } else {
      value = calculator.round2Digits(value / 100);
    }
    this.props.updatePropertyInState(accounts.DATA_KEY_VALUES.RETIREMENT_AVERAGE_TAX_RATE, value, message);
  }

  updateAmountOfDeposit (event) {
    var value = parseInt(event.target.value);
    var message = null;
    if (!Number.isInteger(value)) {
      value = null;
      message = this.NUMBER_ERROR;
    }
    this.props.updatePropertyInState(accounts.DATA_KEY_VALUES.AMOUNT_OF_DEPOSIT, value, message);
  }

  updateYearsInvested (event) {
    var value = parseInt(event.target.value);
    var message = null;
    if (!Number.isInteger(value)) {
      value = null;
      message = this.NUMBER_ERROR;
    }
    this.props.updatePropertyInState(accounts.DATA_KEY_VALUES.YEARS_INVESTED, value, message);
  }

  updateReturnOnInvestment (event) {
    var value = parseInt(event.target.value);
    var message = null;
    if (!Number.isInteger(value)) {
      value = null;
      message = this.PERCENTAGE_ERROR;
    } else {
      value = calculator.round2Digits(value / 100);
    }
    this.props.updatePropertyInState(accounts.DATA_KEY_VALUES.RETURN_ON_INVESTMENT, value, message);
  }

  updateInflationRate (event) {
    var value = parseInt(event.target.value);
    var message = null;
    if (!Number.isInteger(value)) {
      value = null;
      message = this.PERCENTAGE_ERROR;
    } else {
      value = calculator.round2Digits(value / 100);
    }
    this.props.updatePropertyInState(accounts.DATA_KEY_VALUES.INFLATION_RATE, value, message);
  }

  render() {
    return (
      <form id="form" action="#" className="table">
        <section className="row">
          <label className="cell" htmlFor="amount-of-deposit">Amount of deposit</label>
          <input className="cell" type="number" id="amount-of-deposit" onChange={this.updateAmountOfDeposit.bind(this)} />
          <span className="cell">{this.props.getMessage(accounts.DATA_KEY_VALUES.AMOUNT_OF_DEPOSIT)}</span>
        </section>
        <section className="row">
          <label className="cell" htmlFor="current-marginal-tax-rate">Current margin tax rate</label>
          <input className="cell" type="number" id="current-marginal-tax-rate" onChange={this.updateCurrentMarginalTaxRate.bind(this)} />
          <span className="cell">{this.props.getMessage(accounts.DATA_KEY_VALUES.CURRENT_MARGIN_TAX_RATE)}</span>
        </section>
        <section className="row">
          <label className="cell" htmlFor="average-tax-rate-retirement">Average tax rate in retirement</label>
          <input className="cell" type="number" id="retirement-average-tax-rate" onChange={this.updateRetirementAverageTaxRate.bind(this)} />
          <span className="cell">{this.props.getMessage(accounts.DATA_KEY_VALUES.RETIREMENT_AVERAGE_TAX_RATE)}</span>
        </section>
        <section className="row">
          <label className="cell" htmlFor="years-invested">Years invested</label>
          <input className="cell" type="number" id="years-invested" onChange={this.updateYearsInvested.bind(this)} />
          <span className="cell">{this.props.getMessage(accounts.DATA_KEY_VALUES.YEARS_INVESTED)}</span>
        </section>
        <section className="row">
          <label className="cell" htmlFor="return-on-investment">Return on investment</label>
          <input className="cell" type="number" id="return-on-investment" onChange={this.updateReturnOnInvestment.bind(this)} />
          <span className="cell">{this.props.getMessage(accounts.DATA_KEY_VALUES.RETURN_ON_INVESTMENT)}</span>
        </section>
        <section className="row">
          <label className="cell" htmlFor="inflation-rate">Inflation rate</label>
          <input className="cell" type="number" id="inflation-rate" onChange={this.updateInflationRate.bind(this)} />
          <span className="cell">{this.props.getMessage(accounts.DATA_KEY_VALUES.INFLATION_RATE)}</span>
        </section>
      </form>
    );
  }
}

export default Form;
