import * as calculator from "./calculator";

test('10 power', () => {
  expect(calculator.tenPower(0)).toBe(1);
  expect(calculator.tenPower(1)).toBe(10);
  expect(calculator.tenPower(2)).toBe(100);
  expect(calculator.tenPower(3)).toBe(1000);
});

test('the rounding', () => {
  expect(calculator.roundXDigits(0, 1.0)).toBe(1.0);
  expect(calculator.roundXDigits(1, 1.0)).toBe(1.0);
  expect(calculator.roundXDigits(0, 1.23456)).toBe(1.0);
  expect(calculator.roundXDigits(1, 1.23456)).toBe(1.2);
  expect(calculator.roundXDigits(3, 1.23456)).toBe(1.235);
  expect(calculator.roundXDigits(4, 1.23456)).toBe(1.2346);
  expect(calculator.roundXDigits(6, 1.23456)).toBe(1.23456);
});

test('the rounding with 0 digits', () => {
  expect(calculator.round0Digits(0.0)).toBe(0.0);
  expect(calculator.round0Digits(1.0)).toBe(1.0);
  expect(calculator.round0Digits(1.4)).toBe(1.0);
  expect(calculator.round0Digits(1.5)).toBe(2.0);
});

test('the rounding with 2 digits', () => {
  expect(calculator.round2Digits(0.0)).toBe(0.0);
  expect(calculator.round2Digits(1.0)).toBe(1.0);
  expect(calculator.round2Digits(1.23456)).toBe(1.23);
  expect(calculator.round2Digits(1.235)).toBe(1.24);
});

test('the conversion to percentage', () => {
  expect(calculator.toPercentage(0)).toBe(0.0);
  expect(calculator.toPercentage(100)).toBe(1.0);
  expect(calculator.toPercentage(10)).toBe(0.1);
  expect(calculator.toPercentage(123.456)).toBe(1.23);
});

test('the taxes', () => {
  expect(calculator.calculateTaxes(0.4, 0)).toBe(0);
  expect(calculator.calculateTaxes(0.0, 100)).toBe(0);
  expect(calculator.calculateTaxes(1.0, 100)).toBe(100);
  expect(calculator.calculateTaxes(0.40, 100)).toBe(40);
  expect(calculator.calculateTaxes(0.10, 100)).toBe(10);
});

test('the amount after taxes', () => {
  expect(calculator.calculateAmountAfterTaxes(0.4, 0)).toBe(0);
  expect(calculator.calculateAmountAfterTaxes(0.0, 100)).toBe(100);
  expect(calculator.calculateAmountAfterTaxes(1.0, 100)).toBe(0);
  expect(calculator.calculateAmountAfterTaxes(0.40, 100)).toBe(60);
  expect(calculator.calculateAmountAfterTaxes(0.10, 100)).toBe(90);
});

test('the future value', () => {
  expect(calculator.round0Digits(calculator.calculateFutureValue(0, 100, 0.0))).toBe(100);
  expect(calculator.round0Digits(calculator.calculateFutureValue(1, 100, 0.0))).toBe(100);
  expect(calculator.round0Digits(calculator.calculateFutureValue(3, 100, 0.0))).toBe(100);
  expect(calculator.round0Digits(calculator.calculateFutureValue(0, 100, 0.1))).toBe(100);
  expect(calculator.round0Digits(calculator.calculateFutureValue(1, 100, 0.1))).toBe(110);
  expect(calculator.round0Digits(calculator.calculateFutureValue(3, 100, 0.1))).toBe(133);
  expect(calculator.round0Digits(calculator.calculateFutureValue(0, 100, 0.2))).toBe(100);
  expect(calculator.round0Digits(calculator.calculateFutureValue(1, 100, 0.2))).toBe(120);
  expect(calculator.round0Digits(calculator.calculateFutureValue(3, 100, 0.2))).toBe(173);
});

test('the real rate of return', () => {
  expect(calculator.roundXDigits(2, calculator.calculateRealRateOfReturn(0.0, 0.0))).toBe(0.0);
  expect(calculator.roundXDigits(2, calculator.calculateRealRateOfReturn(0.1, 0.1))).toBe(0.0);
  expect(calculator.roundXDigits(2, calculator.calculateRealRateOfReturn(0.1, 0.0))).toBe(0.1);
  expect(calculator.roundXDigits(2, calculator.calculateRealRateOfReturn(0.0, 0.1))).toBe(-0.09);
  expect(calculator.roundXDigits(2, calculator.calculateRealRateOfReturn(0.1, 0.3))).toBe(-0.15);
});
