import round from "lodash/round";
import {
  calcBitmexDailyPerformance,
  changeOverPeriodEnd,
  changeRunning,
  movingAverage,
  sharpeRatio, sortinoRatio,
} from "./calcs";

test("Can calculate performance with deposit/withdrawals", () => {
  const data = [
    {
      transactTime: "2020-04-08T12:00:00.000Z",
      transactStatus: "Completed",
      transactType: "RealisedPNL",
      walletBalance: 697370000,
    },
    {
      transactTime: "2020-04-07T12:00:00.000Z",
      transactStatus: "Completed",
      transactType: "RealisedPNL",
      walletBalance: 694670000,
    },
    {
      amount: -200000000,
      transactTime: "2020-04-07T09:00:00.000Z",
      transactStatus: "Completed",
      transactType: "Withdrawal",
    },
    {
      amount: 100000000,
      transactTime: "2020-04-07T08:00:00.000Z",
      transactStatus: "Completed",
      transactType: "Deposit",
    },
    {
      transactTime: "2020-04-06T12:00:00.000Z",
      transactStatus: "Completed",
      transactType: "RealisedPNL",
      walletBalance: 800470000,
    },
    {
      transactTime: "2020-04-05T12:00:00.000Z",
      transactStatus: "Completed",
      transactType: "RealisedPNL",
      walletBalance: 802080000,
    },
    {
      amount: -200000000,
      transactTime: "2020-04-05T08:00:00.000Z",
      transactStatus: "Completed",
      transactType: "Withdrawal",
    },
    {
      transactTime: "2020-04-04T12:00:00.000Z",
      transactStatus: "Completed",
      transactType: "RealisedPNL",
      walletBalance: 1002040000,
    },
    {
      transactTime: "2020-04-03T12:00:00.000Z",
      transactStatus: "Completed",
      transactType: "RealisedPNL",
      walletBalance: 1000830000,
    },
    {
      amount: 500000000,
      transactTime: "2020-04-03T08:00:00.000Z",
      transactStatus: "Completed",
      transactType: "Deposit",
    },
    {
      transactTime: "2020-04-02T12:00:00.000Z",
      transactStatus: "Completed",
      transactType: "RealisedPNL",
      walletBalance: 500440000,
    },
    {
      transactTime: "2020-04-01T12:00:00.000Z",
      transactStatus: "Completed",
      transactType: "RealisedPNL",
      walletBalance: 499110000,
    },
    {
      amount: 500000000,
      transactTime: "2020-04-01T08:17:23.944Z",
      transactStatus: "Completed",
      transactType: "Deposit",
    },
  ];

  const resp = calcBitmexDailyPerformance(data);
  expect(resp.length).toBe(8);

  expect(resp.map((x) => ({ ...x, change: round(x.change, 4) }))).toStrictEqual(
    [
      {
        balance: 4.9911,
        change: -0.0036,
        date: new Date("2020-04-01T12:00:00.000Z"),
        deposit: 5,
        flow: 5,
        withdrawal: 0,
      },
      {
        balance: 5.0044,
        change: 0.0027,
        date: new Date("2020-04-02T12:00:00.000Z"),
        deposit: 0,
        flow: 0,
        withdrawal: 0,
      },
      {
        balance: 10.0083,
        change: 0.0005,
        date: new Date("2020-04-03T12:00:00.000Z"),
        deposit: 5,
        flow: 5,
        withdrawal: 0,
      },
      {
        balance: 10.0204,
        change: 0.0012,
        date: new Date("2020-04-04T12:00:00.000Z"),
        deposit: 0,
        flow: 0,
        withdrawal: 0,
      },
      {
        balance: 8.0208,
        change: 0.0,
        date: new Date("2020-04-05T12:00:00.000Z"),
        deposit: 0,
        flow: -2,
        withdrawal: 2,
      },
      {
        balance: 8.0047,
        change: -0.002,
        date: new Date("2020-04-06T12:00:00.000Z"),
        deposit: 0,
        flow: 0,
        withdrawal: 0,
      },
      {
        balance: 6.9467,
        change: -0.0077,
        date: new Date("2020-04-07T12:00:00.000Z"),
        deposit: 1,
        flow: -1,
        withdrawal: 2,
      },
      {
        balance: 6.9737,
        change: 0.0039,
        date: new Date("2020-04-08T12:00:00.000Z"),
        deposit: 0,
        flow: 0,
        withdrawal: 0,
      },
    ]
  );
});

test("Can calculate simple moving average", () => {
  const values = [
    4.9911,
    5.0044,
    5.0083,
    5.0204,
    5.0208,
    5.0047,
    4.9467,
    4.9737,
  ];
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

test("Can calculate overall performance from start", () => {
  const returns = [
    -0.00356,
    0.00266,
    0.00052,
    0.00121,
    0.00004,
    -0.00201,
    -0.00773,
    0.00389,
  ];
  const performance = changeRunning(returns);
  expect(performance.map((x) => round(x, 5))).toStrictEqual([
    -0.00356,
    -0.00091,
    -0.00039,
    0.00082,
    0.00086,
    -0.00115,
    -0.00887,
    -0.00502,
  ]);
});

test("Can calculate Sharpe Ratio", () => {
  const returns = [
    -0.00356,
    0.00266,
    0.00052,
    0.00121,
    0.00004,
    -0.00201,
    -0.00773,
    0.00389,
  ];
  const ratio = sharpeRatio(returns, 0);
  expect(round(ratio, 5)).toBe(-0.16696);
});

test("Can calculate Sharpe Ratio with risk free rate", () => {
  const returns = [
    -0.00356,
    0.00266,
    0.00052,
    0.00121,
    0.00004,
    -0.00201,
    -0.00773,
    0.00389,
  ];
  const ratio = sharpeRatio(returns, 6 / 100 / 365);
  expect(round(ratio, 5)).toBe(-0.21105);
});

test("Can calculate sortino Ratio", () => {
  const returns = [
    -0.00356,
    0.00266,
    0.00052,
    0.00121,
    0.00004,
    -0.00201,
    -0.00773,
    0.00389,
  ];
  const ratio = sortinoRatio(returns);
  expect(round(ratio, 5)).toBe(-0.20135);
});

test("Can calculate change over period end", () => {
  const returns = [
    -0.00356,
    0.00266,
    0.00052,
    0.00121,
    0.00004,
    -0.00201,
    -0.00773,
    0.00389,
  ];
  expect(round(changeOverPeriodEnd(returns, 3), 5)).toBe(-0.00587);
  expect(round(changeOverPeriodEnd(returns, 7), 5)).toBe(-0.00146);
  expect(round(changeOverPeriodEnd(returns, 30), 5)).toBe(NaN);
});
