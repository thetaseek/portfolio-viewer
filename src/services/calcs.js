import get from "lodash/get";
import filter from "lodash/filter";
import sumBy from "lodash/sumBy";
import uniqBy from "lodash/uniqBy";
import { mean, sampleStandardDeviation } from "simple-statistics";

// Based on https://en.wikipedia.org/wiki/Simple_Dietz_method
export const calculatePeriodPerformance = (
  { balances, transfers },
  { dateKey = "transactTime", balanceKey = "walletBalance" } = {}
) => {
  // Take date to be the END of the period
  const dates = balances
    // Sort first as it happens in place, datas and balances order matches
    .sort(
      (a, b) => new Date(a[dateKey]).getTime() - new Date(b[dateKey]).getTime()
    )
    .map((x) => x[dateKey]);

  return dates.map((p, i) => {
    const current = new Date(p);
    const currentMs = current.getTime();

    const previous = new Date(get(dates, [i - 1], 0));
    const previousMs = previous.getTime();

    const transfersInPeriod = transfers.filter((x) => {
      const ms = new Date(x[dateKey]).getTime();
      return ms - previousMs > 0 && ms - currentMs <= 0;
    });

    const withdrawal = sumBy(
      filter(transfersInPeriod, (x) => x.amount < 0),
      "amount"
    );

    const deposit = sumBy(
      filter(transfersInPeriod, (x) => x.amount > 0),
      "amount"
    );

    const endValue = get(balances, [i, balanceKey], NaN);
    const startValue = i === 0 ? 0 : get(balances, [i - 1, balanceKey], NaN);

    const netFlow = deposit - Math.abs(withdrawal);

    const change =
      (endValue - startValue - netFlow) / (startValue + 0.5 * netFlow);

    return {
      balance: endValue,
      change,
      date: current,
      deposit,
      flow: netFlow,
      withdrawal: Math.abs(withdrawal)
    };
  });
};

export const calcBitmexDailyPerformance = (data) => {
  const history = data.map((x) => ({
    ...x,
    walletBalance: x.walletBalance / 1e8,
    amount: x.amount / 1e8,
  }));

  const balances = uniqBy(
    history.filter((x) => x.transactType === "RealisedPNL"),
    (x) => new Date(x.transactTime).setUTCHours(12, 0, 0, 0)
  );

  const transfers = history.filter((x) =>
    ["Deposit", "Withdrawal", "AffiliatePayout"].includes(x.transactType)
  );

  return calculatePeriodPerformance(
    {
      balances,
      transfers,
    },
    { dateKey: "transactTime", balanceKey: "walletBalance" }
  );
};

export const movingWindow = (data, size) =>
  data.map((v, index) => {
    // Add one to handle zero-index array
    const start = index + 1 - size;

    // Array.slice end is not inclusive so add 1
    const end = index + 1;

    // If there isn't enough data points return nothing
    if (start < 0) {
      return [];
    }

    return data.slice(start, end);
  });

export const movingAverage = (data, size) =>
  movingWindow(data, size).map((x) => (x.length === 0 ? NaN : mean(x)));

export const changeOverSubPeriods = (returns) =>
  returns.reduce((r, c) => (c + 1) * r, 1) - 1;

export const changeOverPeriodEnd = (returns, periods) => {
  const length = returns.length;
  if (length < periods) {
    return NaN;
  }
  return changeOverSubPeriods(returns.slice(-periods));
};

export const changeRunning = (returns) => {
  let runningChange = 0;
  return returns.map((c) => {
    runningChange = (runningChange + 1) * (c + 1) - 1;
    return runningChange;
  });
};

export const sharpeRatio = (returns, periodRiskFreeRate = 0) => {
  const excessReturns = returns.map((r) => r - periodRiskFreeRate);
  return mean(excessReturns) / sampleStandardDeviation(returns);
};

export const sortinoRatio = (returns, periodRiskFreeRate = 0) => {
  const excessReturns = returns.map((r) => r - periodRiskFreeRate);
  const squaredDownsideReturn = returns.map(
    (r) => Math.min(r, 0) * Math.min(r, 0)
  );
  return mean(excessReturns) / Math.sqrt(mean(squaredDownsideReturn));
};
