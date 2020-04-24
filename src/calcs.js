import { mean, sampleStandardDeviation } from "simple-statistics";

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

export const changeOverall = (data, initial = data[0]) =>
  data.map((x) => x / initial - 1);

export const changeEachPeriod = (data) =>
  movingWindow(data, 2).map(([previous, current]) => current / previous - 1);

export const changeOverPeriodEnd = (data, periods) => {
  const length = data.length;
  if (length < periods) {
    return NaN;
  }
  const current = data[length - 1];
  const previous = data[length - periods];
  return current / previous - 1;
};

export const sharpeRatio = (data, periodRiskFreeRate = 0) => {
  // First value will always be NaN
  const performance = changeEachPeriod(data).slice(1);
  const excessReturn = performance.map((x) => x - periodRiskFreeRate);
  return mean(excessReturn) / sampleStandardDeviation(performance);
};
