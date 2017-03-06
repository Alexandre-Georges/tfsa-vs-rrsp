import R from "ramda";
import * as calculator from "./calculator";

export const DATA_KEY_VALUES = {
  CURRENT_MARGIN_TAX_RATE: "currentMarginalTaxRate",
  RETIREMENT_AVERAGE_TAX_RATE: "retirementAverageTaxRate",
  AMOUNT_OF_DEPOSIT: "amountOfDeposit",
  YEARS_INVESTED: "yearsInvested",
  RETURN_ON_INVESTMENT: "returnOnInvestment",
  INFLATION_RATE: "inflationRate"
};

export var getDataCurrentMarginalTaxRate = (data) => {
  return R.prop(
    DATA_KEY_VALUES.CURRENT_MARGIN_TAX_RATE,
    data
  );
};

export var getDataRetirementAverageTaxRate = (data) => {
  return R.prop(
    DATA_KEY_VALUES.RETIREMENT_AVERAGE_TAX_RATE,
    data
  );
};

export var getDataAmountOfDeposit = (data) => {
  return R.prop(
    DATA_KEY_VALUES.AMOUNT_OF_DEPOSIT,
    data
  );
};

export var getDataYearsInvested = (data) => {
  return R.prop(
    DATA_KEY_VALUES.YEARS_INVESTED,
    data
  );
};

export var getDataReturnOnInvestment = (data) => {
  return R.prop(
    DATA_KEY_VALUES.RETURN_ON_INVESTMENT,
    data
  );
};

export var getDataInflationRate = (data) => {
  return R.prop(
    DATA_KEY_VALUES.INFLATION_RATE,
    data
  );
};

export var calculateRealRateOfReturn = (data) => {
  return R.compose(
    calculator.round2Digits,
    calculator.calculateRealRateOfReturn
  )(
    getDataReturnOnInvestment(
      data
    ),
    getDataInflationRate(
      data
    )
  );
};

class Account {

  getCurrentMarginalTaxRate (data) {
    return 0.0;
  }

  getRetirementAverageTaxRate (data) {
    return 0.0;
  }

  calculateAmountAfterDeposit (data) {
    return R.compose(
      calculator.round0Digits,
      calculator.calculateAmountAfterTaxes
    )(
      this.getCurrentMarginalTaxRate(
        data
      ),
      getDataAmountOfDeposit(
        data
      )
    );
  }

  calculateFutureValue (data) {
    return R.compose(
      calculator.round0Digits,
      calculator.calculateFutureValue
    )(
      getDataYearsInvested(
        data
      ),
      this.calculateAmountAfterDeposit(
        data
      ),
      calculateRealRateOfReturn(
        data
      )
    );
  }

  calculateTaxesAtWithdrawal (data) {
    return R.compose(
      calculator.round0Digits,
      calculator.calculateTaxes
    )(
      this.getRetirementAverageTaxRate(
        data
      ),
      this.calculateFutureValue(
        data
      )
    );
  }

  calculateAmountAfterWithdrawal (data) {
    return R.compose(
      calculator.round0Digits,
      calculator.calculateAmountAfterTaxes
    )(
      this.getRetirementAverageTaxRate(
        data
      ),
      this.calculateFutureValue(
        data
      )
    );
  }

};

class TSFAAccount extends Account {

  getCurrentMarginalTaxRate (data) {
    return getDataCurrentMarginalTaxRate(data);
  }

}

class RRSPAccount extends Account {

  getRetirementAverageTaxRate (data) {
    return getDataRetirementAverageTaxRate(data);
  }

}

export var TFSA = new TSFAAccount();
export var RRSP = new RRSPAccount();
