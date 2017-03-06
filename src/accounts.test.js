/*
  The functions from accounts are compositions of pure functions.
  Since those functions have already been tested,
  here I will assume that they are individually correct.

  In the following tests I will check those compositions,
  more specifically that they are correctly plugged together
  and their outputs match what is expected.

  Here is my thinking process:
  - start with the edge cases (values at 0, percentages at 0 or 100, etc)
  - continue with a baseline test (a likely scenario) where
  I will compute manually the expected output and compare it with the result of the composition
  - change one parameter at a time and check again the output
  (if more than one mistake is made, changing multiple parameters at once could trigger multiple errors
  that compensate each others and the output would be correct even if the composition is not)
*/

import * as accounts from "./accounts";

test('the getter for the current marginal tax rate', () => {
  expect(accounts.getDataCurrentMarginalTaxRate({})).toBe(undefined);
  expect(accounts.getDataCurrentMarginalTaxRate({ currentMarginalTaxRate: 123 })).toBe(123);
});

test('the getter for the retirement average tax rate', () => {
  expect(accounts.getDataRetirementAverageTaxRate({})).toBe(undefined);
  expect(accounts.getDataRetirementAverageTaxRate({ retirementAverageTaxRate: 123 })).toBe(123);
});

test('the getter for the amount of deposit', () => {
  expect(accounts.getDataAmountOfDeposit({})).toBe(undefined);
  expect(accounts.getDataAmountOfDeposit({ amountOfDeposit: 123 })).toBe(123);
});

test('the getter for the years invested', () => {
  expect(accounts.getDataYearsInvested({})).toBe(undefined);
  expect(accounts.getDataYearsInvested({ yearsInvested: 123 })).toBe(123);
});

test('the getter for the return on investment', () => {
  expect(accounts.getDataReturnOnInvestment({})).toBe(undefined);
  expect(accounts.getDataReturnOnInvestment({ returnOnInvestment: 123 })).toBe(123);
});

test('the getter for the inflation rate', () => {
  expect(accounts.getDataInflationRate({})).toBe(undefined);
  expect(accounts.getDataInflationRate({ inflationRate: 123 })).toBe(123);
});

test('the real rate of return', () => {
  expect(accounts.calculateRealRateOfReturn({ returnOnInvestment: 1.0, inflationRate: 0.0 })).toBe(1.0);
  expect(accounts.calculateRealRateOfReturn({ returnOnInvestment: 0.0, inflationRate: 1.0 })).toBe(-0.5);
  expect(accounts.calculateRealRateOfReturn({ returnOnInvestment: 0.5, inflationRate: 0.5 })).toBe(0.0);
  expect(accounts.calculateRealRateOfReturn({ returnOnInvestment: 0.1, inflationRate: 0.5 })).toBe(-0.27);
});

test('the current marginal tax rate for the TSFA', () => {
  expect(accounts.TFSA.getCurrentMarginalTaxRate({ currentMarginalTaxRate: 0.4 })).toBe(0.4);
});

test('the current marginal tax rate for the RRSP', () => {
  expect(accounts.RRSP.getCurrentMarginalTaxRate({ currentMarginalTaxRate: 0.4 })).toBe(0.0);
});

test('the retirement average tax rate for the TSFA', () => {
  expect(accounts.TFSA.getRetirementAverageTaxRate({ retirementAverageTaxRate: 0.4 })).toBe(0.0);
});

test('the retirement average tax rate for the RRSP', () => {
  expect(accounts.RRSP.getRetirementAverageTaxRate({ retirementAverageTaxRate: 0.4 })).toBe(0.4);
});

test('the amount after deposit for the TSFA', () => {
  expect(accounts.TFSA.calculateAmountAfterDeposit({ currentMarginalTaxRate: 0.4, amountOfDeposit: 0 })).toBe(0);
  expect(accounts.TFSA.calculateAmountAfterDeposit({ currentMarginalTaxRate: 0.0, amountOfDeposit: 100 })).toBe(100);
  expect(accounts.TFSA.calculateAmountAfterDeposit({ currentMarginalTaxRate: 1.0, amountOfDeposit: 100 })).toBe(0);
  expect(accounts.TFSA.calculateAmountAfterDeposit({ currentMarginalTaxRate: 0.4, amountOfDeposit: 100 })).toBe(60);
  expect(accounts.TFSA.calculateAmountAfterDeposit({ currentMarginalTaxRate: 0.1, amountOfDeposit: 100 })).toBe(90);
});

test('the amount after deposit for the RRSP', () => {
  expect(accounts.RRSP.calculateAmountAfterDeposit({ currentMarginalTaxRate: 0.4, amountOfDeposit: 0 })).toBe(0);
  expect(accounts.RRSP.calculateAmountAfterDeposit({ currentMarginalTaxRate: 0.0, amountOfDeposit: 100 })).toBe(100);
  expect(accounts.RRSP.calculateAmountAfterDeposit({ currentMarginalTaxRate: 1.0, amountOfDeposit: 100 })).toBe(100);
  expect(accounts.RRSP.calculateAmountAfterDeposit({ currentMarginalTaxRate: 0.4, amountOfDeposit: 100 })).toBe(100);
  expect(accounts.RRSP.calculateAmountAfterDeposit({ currentMarginalTaxRate: 0.1, amountOfDeposit: 100 })).toBe(100);
});

test('the future value for the TSFA', () => {

  expect(accounts.TFSA.calculateFutureValue({
    currentMarginalTaxRate: 0.0,
    amountOfDeposit: 0,
    yearsInvested: 0,
    returnOnInvestment: 0.0,
    inflationRate: 0.0
  })).toBe(0);

  expect(accounts.TFSA.calculateFutureValue({
    currentMarginalTaxRate: 0.0,
    amountOfDeposit: 100,
    yearsInvested: 0,
    returnOnInvestment: 0.0,
    inflationRate: 0.0
  })).toBe(100);

  expect(accounts.TFSA.calculateFutureValue({
    currentMarginalTaxRate: 0.1,
    amountOfDeposit: 100,
    yearsInvested: 0,
    returnOnInvestment: 0.0,
    inflationRate: 0.0
  })).toBe(90);

  expect(accounts.TFSA.calculateFutureValue({
    currentMarginalTaxRate: 0.0,
    amountOfDeposit: 100,
    yearsInvested: 1,
    returnOnInvestment: 0.0,
    inflationRate: 0.0
  })).toBe(100);

  expect(accounts.TFSA.calculateFutureValue({
    currentMarginalTaxRate: 0.0,
    amountOfDeposit: 100,
    yearsInvested: 0,
    returnOnInvestment: 0.1,
    inflationRate: 0.0
  })).toBe(100);

  expect(accounts.TFSA.calculateFutureValue({
    currentMarginalTaxRate: 0.0,
    amountOfDeposit: 100,
    yearsInvested: 0,
    returnOnInvestment: 0.0,
    inflationRate: 0.1
  })).toBe(100);

  expect(accounts.TFSA.calculateFutureValue({
    currentMarginalTaxRate: 0.0,
    amountOfDeposit: 100,
    yearsInvested: 1,
    returnOnInvestment: 0.1,
    inflationRate: 0.0
  })).toBe(110);

  expect(accounts.TFSA.calculateFutureValue({
    currentMarginalTaxRate: 0.0,
    amountOfDeposit: 100,
    yearsInvested: 1,
    returnOnInvestment: 0.0,
    inflationRate: 0.1
  })).toBe(91);

  expect(accounts.TFSA.calculateFutureValue({
    currentMarginalTaxRate: 0.4,
    amountOfDeposit: 100,
    yearsInvested: 9,
    returnOnInvestment: 0.05,
    inflationRate: 0.02
  })).toBe(78);

});

test('the future value for the RRSP', () => {

  expect(accounts.RRSP.calculateFutureValue({
    currentMarginalTaxRate: 0.0,
    amountOfDeposit: 0,
    yearsInvested: 0,
    returnOnInvestment: 0.0,
    inflationRate: 0.0
  })).toBe(0);

  expect(accounts.RRSP.calculateFutureValue({
    currentMarginalTaxRate: 0.0,
    amountOfDeposit: 100,
    yearsInvested: 0,
    returnOnInvestment: 0.0,
    inflationRate: 0.0
  })).toBe(100);

  expect(accounts.RRSP.calculateFutureValue({
    currentMarginalTaxRate: 0.1,
    amountOfDeposit: 100,
    yearsInvested: 0,
    returnOnInvestment: 0.0,
    inflationRate: 0.0
  })).toBe(100);

  expect(accounts.RRSP.calculateFutureValue({
    currentMarginalTaxRate: 0.0,
    amountOfDeposit: 100,
    yearsInvested: 1,
    returnOnInvestment: 0.0,
    inflationRate: 0.0
  })).toBe(100);

  expect(accounts.RRSP.calculateFutureValue({
    currentMarginalTaxRate: 0.0,
    amountOfDeposit: 100,
    yearsInvested: 0,
    returnOnInvestment: 0.1,
    inflationRate: 0.0
  })).toBe(100);

  expect(accounts.RRSP.calculateFutureValue({
    currentMarginalTaxRate: 0.0,
    amountOfDeposit: 100,
    yearsInvested: 0,
    returnOnInvestment: 0.0,
    inflationRate: 0.1
  })).toBe(100);

  expect(accounts.RRSP.calculateFutureValue({
    currentMarginalTaxRate: 0.0,
    amountOfDeposit: 100,
    yearsInvested: 1,
    returnOnInvestment: 0.1,
    inflationRate: 0.0
  })).toBe(110);

  expect(accounts.RRSP.calculateFutureValue({
    currentMarginalTaxRate: 0.0,
    amountOfDeposit: 100,
    yearsInvested: 1,
    returnOnInvestment: 0.0,
    inflationRate: 0.1
  })).toBe(91);

  expect(accounts.RRSP.calculateFutureValue({
    currentMarginalTaxRate: 0.4,
    amountOfDeposit: 100,
    yearsInvested: 9,
    returnOnInvestment: 0.05,
    inflationRate: 0.02
  })).toBe(130);

});

test('the taxes for the TSFA', () => {

  expect(accounts.TFSA.calculateTaxesAtWithdrawal({
    currentMarginalTaxRate: 0.0,
    amountOfDeposit: 0,
    yearsInvested: 0,
    returnOnInvestment: 0.0,
    inflationRate: 0.0,
    retirementAverageTaxRate: 0.0
  })).toBe(0);

  expect(accounts.TFSA.calculateTaxesAtWithdrawal({
    currentMarginalTaxRate: 0.0,
    amountOfDeposit: 100,
    yearsInvested: 0,
    returnOnInvestment: 0.0,
    inflationRate: 0.0,
    retirementAverageTaxRate: 0.0
  })).toBe(0);

  expect(accounts.TFSA.calculateTaxesAtWithdrawal({
    currentMarginalTaxRate: 0.1,
    amountOfDeposit: 100,
    yearsInvested: 0,
    returnOnInvestment: 0.0,
    inflationRate: 0.0,
    retirementAverageTaxRate: 0.0
  })).toBe(0);

  expect(accounts.TFSA.calculateTaxesAtWithdrawal({
    currentMarginalTaxRate: 0.0,
    amountOfDeposit: 100,
    yearsInvested: 1,
    returnOnInvestment: 0.0,
    inflationRate: 0.0,
    retirementAverageTaxRate: 0.0
  })).toBe(0);

  expect(accounts.TFSA.calculateTaxesAtWithdrawal({
    currentMarginalTaxRate: 0.0,
    amountOfDeposit: 100,
    yearsInvested: 0,
    returnOnInvestment: 0.1,
    inflationRate: 0.0,
    retirementAverageTaxRate: 0.0
  })).toBe(0);

  expect(accounts.TFSA.calculateTaxesAtWithdrawal({
    currentMarginalTaxRate: 0.0,
    amountOfDeposit: 100,
    yearsInvested: 0,
    returnOnInvestment: 0.0,
    inflationRate: 0.1,
    retirementAverageTaxRate: 0.0
  })).toBe(0);

  expect(accounts.TFSA.calculateTaxesAtWithdrawal({
    currentMarginalTaxRate: 0.0,
    amountOfDeposit: 100,
    yearsInvested: 0,
    returnOnInvestment: 0.0,
    inflationRate: 0.0,
    retirementAverageTaxRate: 0.1
  })).toBe(0);

  expect(accounts.TFSA.calculateTaxesAtWithdrawal({
    currentMarginalTaxRate: 0.0,
    amountOfDeposit: 100,
    yearsInvested: 1,
    returnOnInvestment: 0.1,
    inflationRate: 0.0,
    retirementAverageTaxRate: 0.0
  })).toBe(0);

  expect(accounts.TFSA.calculateTaxesAtWithdrawal({
    currentMarginalTaxRate: 0.0,
    amountOfDeposit: 100,
    yearsInvested: 1,
    returnOnInvestment: 0.0,
    inflationRate: 0.1,
    retirementAverageTaxRate: 0.0
  })).toBe(0);

  expect(accounts.TFSA.calculateTaxesAtWithdrawal({
    currentMarginalTaxRate: 0.0,
    amountOfDeposit: 100,
    yearsInvested: 1,
    returnOnInvestment: 0.0,
    inflationRate: 0.0,
    retirementAverageTaxRate: 0.1
  })).toBe(0);

  expect(accounts.TFSA.calculateTaxesAtWithdrawal({
    currentMarginalTaxRate: 0.4,
    amountOfDeposit: 100,
    yearsInvested: 9,
    returnOnInvestment: 0.05,
    inflationRate: 0.02,
    retirementAverageTaxRate: 0.2
  })).toBe(0);

});

test('the taxes for the RRSP', () => {

  expect(accounts.RRSP.calculateTaxesAtWithdrawal({
    currentMarginalTaxRate: 0.0,
    amountOfDeposit: 0,
    yearsInvested: 0,
    returnOnInvestment: 0.0,
    inflationRate: 0.0,
    retirementAverageTaxRate: 0.0
  })).toBe(0);

  expect(accounts.RRSP.calculateTaxesAtWithdrawal({
    currentMarginalTaxRate: 0.0,
    amountOfDeposit: 100,
    yearsInvested: 0,
    returnOnInvestment: 0.0,
    inflationRate: 0.0,
    retirementAverageTaxRate: 0.0
  })).toBe(0);

  expect(accounts.RRSP.calculateTaxesAtWithdrawal({
    currentMarginalTaxRate: 0.1,
    amountOfDeposit: 100,
    yearsInvested: 0,
    returnOnInvestment: 0.0,
    inflationRate: 0.0,
    retirementAverageTaxRate: 0.0
  })).toBe(0);

  expect(accounts.RRSP.calculateTaxesAtWithdrawal({
    currentMarginalTaxRate: 0.0,
    amountOfDeposit: 100,
    yearsInvested: 1,
    returnOnInvestment: 0.0,
    inflationRate: 0.0,
    retirementAverageTaxRate: 0.0
  })).toBe(0);

  expect(accounts.RRSP.calculateTaxesAtWithdrawal({
    currentMarginalTaxRate: 0.0,
    amountOfDeposit: 100,
    yearsInvested: 0,
    returnOnInvestment: 0.1,
    inflationRate: 0.0,
    retirementAverageTaxRate: 0.0
  })).toBe(0);

  expect(accounts.RRSP.calculateTaxesAtWithdrawal({
    currentMarginalTaxRate: 0.0,
    amountOfDeposit: 100,
    yearsInvested: 0,
    returnOnInvestment: 0.0,
    inflationRate: 0.1,
    retirementAverageTaxRate: 0.0
  })).toBe(0);

  expect(accounts.RRSP.calculateTaxesAtWithdrawal({
    currentMarginalTaxRate: 0.0,
    amountOfDeposit: 100,
    yearsInvested: 0,
    returnOnInvestment: 0.0,
    inflationRate: 0.0,
    retirementAverageTaxRate: 0.1
  })).toBe(10);

  expect(accounts.RRSP.calculateTaxesAtWithdrawal({
    currentMarginalTaxRate: 0.0,
    amountOfDeposit: 100,
    yearsInvested: 1,
    returnOnInvestment: 0.1,
    inflationRate: 0.0,
    retirementAverageTaxRate: 0.0
  })).toBe(0);

  expect(accounts.RRSP.calculateTaxesAtWithdrawal({
    currentMarginalTaxRate: 0.0,
    amountOfDeposit: 100,
    yearsInvested: 1,
    returnOnInvestment: 0.0,
    inflationRate: 0.1,
    retirementAverageTaxRate: 0.0
  })).toBe(0);

  expect(accounts.RRSP.calculateTaxesAtWithdrawal({
    currentMarginalTaxRate: 0.0,
    amountOfDeposit: 100,
    yearsInvested: 1,
    returnOnInvestment: 0.0,
    inflationRate: 0.0,
    retirementAverageTaxRate: 0.1
  })).toBe(10);

  expect(accounts.RRSP.calculateTaxesAtWithdrawal({
    currentMarginalTaxRate: 0.4,
    amountOfDeposit: 100,
    yearsInvested: 9,
    returnOnInvestment: 0.05,
    inflationRate: 0.02,
    retirementAverageTaxRate: 0.2
  })).toBe(26);

});

test('the amount after withdrawal for the TSFA', () => {

  expect(accounts.TFSA.calculateAmountAfterWithdrawal({
    currentMarginalTaxRate: 0.0,
    amountOfDeposit: 0,
    yearsInvested: 0,
    returnOnInvestment: 0.0,
    inflationRate: 0.0,
    retirementAverageTaxRate: 0.0
  })).toBe(0);

  expect(accounts.TFSA.calculateAmountAfterWithdrawal({
    currentMarginalTaxRate: 0.0,
    amountOfDeposit: 100,
    yearsInvested: 0,
    returnOnInvestment: 0.0,
    inflationRate: 0.0,
    retirementAverageTaxRate: 0.0
  })).toBe(100);

  expect(accounts.TFSA.calculateAmountAfterWithdrawal({
    currentMarginalTaxRate: 0.1,
    amountOfDeposit: 100,
    yearsInvested: 0,
    returnOnInvestment: 0.0,
    inflationRate: 0.0,
    retirementAverageTaxRate: 0.0
  })).toBe(90);

  expect(accounts.TFSA.calculateAmountAfterWithdrawal({
    currentMarginalTaxRate: 0.0,
    amountOfDeposit: 100,
    yearsInvested: 1,
    returnOnInvestment: 0.0,
    inflationRate: 0.0,
    retirementAverageTaxRate: 0.0
  })).toBe(100);

  expect(accounts.TFSA.calculateAmountAfterWithdrawal({
    currentMarginalTaxRate: 0.0,
    amountOfDeposit: 100,
    yearsInvested: 0,
    returnOnInvestment: 0.1,
    inflationRate: 0.0,
    retirementAverageTaxRate: 0.0
  })).toBe(100);

  expect(accounts.TFSA.calculateAmountAfterWithdrawal({
    currentMarginalTaxRate: 0.0,
    amountOfDeposit: 100,
    yearsInvested: 0,
    returnOnInvestment: 0.0,
    inflationRate: 0.1,
    retirementAverageTaxRate: 0.0
  })).toBe(100);

  expect(accounts.TFSA.calculateAmountAfterWithdrawal({
    currentMarginalTaxRate: 0.0,
    amountOfDeposit: 100,
    yearsInvested: 0,
    returnOnInvestment: 0.0,
    inflationRate: 0.0,
    retirementAverageTaxRate: 0.1
  })).toBe(100);

  expect(accounts.TFSA.calculateAmountAfterWithdrawal({
    currentMarginalTaxRate: 0.0,
    amountOfDeposit: 100,
    yearsInvested: 1,
    returnOnInvestment: 0.1,
    inflationRate: 0.0,
    retirementAverageTaxRate: 0.0
  })).toBe(110);

  expect(accounts.TFSA.calculateAmountAfterWithdrawal({
    currentMarginalTaxRate: 0.0,
    amountOfDeposit: 100,
    yearsInvested: 1,
    returnOnInvestment: 0.0,
    inflationRate: 0.1,
    retirementAverageTaxRate: 0.0
  })).toBe(91);

  expect(accounts.TFSA.calculateAmountAfterWithdrawal({
    currentMarginalTaxRate: 0.0,
    amountOfDeposit: 100,
    yearsInvested: 1,
    returnOnInvestment: 0.0,
    inflationRate: 0.0,
    retirementAverageTaxRate: 0.1
  })).toBe(100);

  expect(accounts.TFSA.calculateAmountAfterWithdrawal({
    currentMarginalTaxRate: 0.4,
    amountOfDeposit: 100,
    yearsInvested: 9,
    returnOnInvestment: 0.05,
    inflationRate: 0.02,
    retirementAverageTaxRate: 0.2
  })).toBe(78);

});

test('the amount after withdrawal for the RRSP', () => {

  expect(accounts.RRSP.calculateAmountAfterWithdrawal({
    currentMarginalTaxRate: 0.0,
    amountOfDeposit: 0,
    yearsInvested: 0,
    returnOnInvestment: 0.0,
    inflationRate: 0.0,
    retirementAverageTaxRate: 0.0
  })).toBe(0);

  expect(accounts.RRSP.calculateAmountAfterWithdrawal({
    currentMarginalTaxRate: 0.0,
    amountOfDeposit: 100,
    yearsInvested: 0,
    returnOnInvestment: 0.0,
    inflationRate: 0.0,
    retirementAverageTaxRate: 0.0
  })).toBe(100);

  expect(accounts.RRSP.calculateAmountAfterWithdrawal({
    currentMarginalTaxRate: 0.1,
    amountOfDeposit: 100,
    yearsInvested: 0,
    returnOnInvestment: 0.0,
    inflationRate: 0.0,
    retirementAverageTaxRate: 0.0
  })).toBe(100);

  expect(accounts.RRSP.calculateAmountAfterWithdrawal({
    currentMarginalTaxRate: 0.0,
    amountOfDeposit: 100,
    yearsInvested: 1,
    returnOnInvestment: 0.0,
    inflationRate: 0.0,
    retirementAverageTaxRate: 0.0
  })).toBe(100);

  expect(accounts.RRSP.calculateAmountAfterWithdrawal({
    currentMarginalTaxRate: 0.0,
    amountOfDeposit: 100,
    yearsInvested: 0,
    returnOnInvestment: 0.1,
    inflationRate: 0.0,
    retirementAverageTaxRate: 0.0
  })).toBe(100);

  expect(accounts.RRSP.calculateAmountAfterWithdrawal({
    currentMarginalTaxRate: 0.0,
    amountOfDeposit: 100,
    yearsInvested: 0,
    returnOnInvestment: 0.0,
    inflationRate: 0.1,
    retirementAverageTaxRate: 0.0
  })).toBe(100);

  expect(accounts.RRSP.calculateAmountAfterWithdrawal({
    currentMarginalTaxRate: 0.0,
    amountOfDeposit: 100,
    yearsInvested: 0,
    returnOnInvestment: 0.0,
    inflationRate: 0.0,
    retirementAverageTaxRate: 0.1
  })).toBe(90);

  expect(accounts.RRSP.calculateAmountAfterWithdrawal({
    currentMarginalTaxRate: 0.0,
    amountOfDeposit: 100,
    yearsInvested: 1,
    returnOnInvestment: 0.1,
    inflationRate: 0.0,
    retirementAverageTaxRate: 0.0
  })).toBe(110);

  expect(accounts.RRSP.calculateAmountAfterWithdrawal({
    currentMarginalTaxRate: 0.0,
    amountOfDeposit: 100,
    yearsInvested: 1,
    returnOnInvestment: 0.0,
    inflationRate: 0.1,
    retirementAverageTaxRate: 0.0
  })).toBe(91);

  expect(accounts.RRSP.calculateAmountAfterWithdrawal({
    currentMarginalTaxRate: 0.0,
    amountOfDeposit: 100,
    yearsInvested: 1,
    returnOnInvestment: 0.0,
    inflationRate: 0.0,
    retirementAverageTaxRate: 0.1
  })).toBe(90);

  expect(accounts.RRSP.calculateAmountAfterWithdrawal({
    currentMarginalTaxRate: 0.4,
    amountOfDeposit: 100,
    yearsInvested: 9,
    returnOnInvestment: 0.05,
    inflationRate: 0.02,
    retirementAverageTaxRate: 0.2
  })).toBe(104);

});
