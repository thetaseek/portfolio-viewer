import round from "lodash/round";
import {
  changeEachPeriod,
  changeOverall,
  changeOverPeriodEnd,
  movingAverage,
  sharpeRatio,
} from "./calcs";

const data = [
  {
    date: "01/04/2020",
    balance: 4.9911,
  },
  {
    date: "02/04/2020",
    balance: 5.0044,
  },
  {
    date: "03/04/2020",
    balance: 5.0083,
  },
  {
    date: "04/04/2020",
    balance: 5.0204,
  },
  {
    date: "05/04/2020",
    balance: 5.0208,
  },
  {
    date: "06/04/2020",
    balance: 5.0047,
  },
  {
    date: "07/04/2020",
    balance: 4.9467,
  },
  {
    date: "08/04/2020",
    balance: 4.9737,
  },
];

test("Can calculate simple moving average", () => {
  const values = data.map((x) => x.balance);
  const ma = movingAverage(values, 3);
  expect(ma.map((x) => round(x, 6))).toStrictEqual([
    NaN,
    NaN,
    5.001267,
    5.011033,
    5.0165,
    5.0153,
    4.990733,
    4.975033,
  ]);
});

test("Can calculate change", () => {
  const performance = changeEachPeriod(data.map((x) => x.balance));
  expect(performance.map((x) => round(x, 10))).toStrictEqual([
    NaN,
    0.0026647432,
    0.0007793142,
    0.0024159895,
    0.0000796749,
    -0.0032066603,
    -0.0115891062,
    0.0054581842,
  ]);
});

test("Can calculate overall performance from initial", () => {
  const performance = changeOverall(
    data.map((x) => x.balance),
    5
  );
  expect(performance.map((x) => round(x, 10))).toStrictEqual([
    -0.00178,
    0.00088,
    0.00166,
    0.00408,
    0.00416,
    0.00094,
    -0.01066,
    -0.00526,
  ]);
});

test("Can calculate overall performance from start", () => {
  const performance = changeOverall([5, ...data.map((x) => x.balance)]);
  expect(performance.map((x) => round(x, 10))).toStrictEqual([
    0,
    -0.00178,
    0.00088,
    0.00166,
    0.00408,
    0.00416,
    0.00094,
    -0.01066,
    -0.00526,
  ]);
});

test("Can calculate Sharpe Ratio", () => {
  const ratio = sharpeRatio(data.map((x) => x.balance), 0);
  expect(round(ratio, 10)).toBe(-0.0871154784);
});

test("Can calculate Sharpe Ratio with risk free rate", () => {
  const ratio = sharpeRatio(data.map((x) => x.balance), (6 / 100) / 365);
  expect(round(ratio, 10)).toBe(-0.116617122);
});

test("Can calculate change over period end", () => {
  const values = data.map((x) => x.balance);
  expect(round(changeOverPeriodEnd(values, 3), 10)).toBe(-0.0061941775);
  expect(round(changeOverPeriodEnd(values, 7), 10)).toBe(-0.0061346016);
  expect(round(changeOverPeriodEnd(values, 30), 10)).toBe(NaN);
});
