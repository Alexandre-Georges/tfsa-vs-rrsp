import R from "ramda";

export var tenPower = R.curry(Math.pow)(10);

export var roundXDigits = R.curry(function (digits, value) {
  return R.divide(
      Math.round(
        R.multiply(
          value,
          tenPower(
            digits
          )
        )
      ),
      tenPower(
        digits
      )
    );
});

export var round0Digits = roundXDigits(0);
export var round2Digits = roundXDigits(2);

export var toPercentage = R.compose(round2Digits, R.divide(R.__, 100));

export var calculateTaxes = function (taxeRate, amount) {
  return R.multiply(
    taxeRate,
    amount
  );
};

export var calculateAmountAfterTaxes = function (taxeRate, amount) {
  return R.multiply(
    R.subtract(
      1,
      taxeRate
    ),
    amount
  );
};

export var calculateFutureValue = function (numberOfYears, currentValue, rate) {
  return R.multiply(
    currentValue,
    Math.pow(
      R.add(
        1,
        rate
      ),
      numberOfYears
    )
  );
};

export var calculateRealRateOfReturn = function (nominalRate, inflationRate) {
  return R.subtract(
    R.divide(
      R.add(
        1,
        nominalRate
      ),
      R.add(
        1,
        inflationRate
      ),
    ),
    1
  );
};
