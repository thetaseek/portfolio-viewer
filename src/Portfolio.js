import React from "react";
import zip from "lodash/zip";
import uniqBy from "lodash/uniqBy";
import sumBy from "lodash/sumBy";
import {
  Container,
  Divider,
  Grid,
  Hidden,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  useTheme,
} from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { makeStyles } from "@material-ui/core/styles";
import { format, startOfDay } from "date-fns";
import {
  changeEachPeriod,
  changeOverPeriodEnd,
  changeOverall,
  movingAverage,
  sharpeRatio,
} from "./calcs";

import { sampleKurtosis, sampleSkewness } from "simple-statistics";
import { position, walletHistory } from "./data";

const formatDate = (date) => format(date, "yyyy-MM-dd");

const PerformanceChart = ({ data }) => {
  const gradientOffset = () => {
    const dataMax = Math.max(...data.map((i) => i.performance * 100));
    const dataMin = Math.min(...data.map((i) => i.performance * 100));

    if (dataMax <= 0) {
      return 0;
    } else if (dataMin >= 0) {
      return 1;
    } else {
      return dataMax / (dataMax - dataMin);
    }
  };

  const off = gradientOffset();
  const theme = useTheme();
  const text = theme.palette.text.primary;
  const tooltipColor = theme.palette.getContrastText("#fff");
  // const green = '#53ff95';
  // const green = "#2EAE34";
  const green = theme.palette.success.main;
  // const red = "#f04800";
  const red = theme.palette.error.main;
  const color = theme.palette.primary.main;
  return (
    <ResponsiveContainer>
      <AreaChart
        data={data.map((x) => ({
          date: x.date,
          Performance: x.performance * 100,
        }))}
        // margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis
          tickFormatter={(x) => `${x}%`}
          label={{
            value: "Performance",
            angle: -90,
            position: "insideLeft",
            style: { textAnchor: "middle", fill: text },
          }}
        />

        <Tooltip
          contentStyle={{ color: tooltipColor }}
          formatter={(x) => `${x.toFixed(2)}%`}
        />
        <Legend />
        <defs>
          <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset={off} stopColor={green} stopOpacity={1} />
            <stop offset={off} stopColor={red} stopOpacity={1} />
          </linearGradient>
        </defs>
        <Area
          type="monotoneX"
          dataKey="Performance"
          // activeDot={{ r: 8 }}
          fill="url(#splitColor)"
          stroke={color}
          strokeWidth={2}
          dot={{
            stroke: color,
            fill: color,
            fillOpacity: 1,
          }}
          activeDot={{ r: 8 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

const MovingAverage = ({ data }) => {
  const theme = useTheme();
  const text = theme.palette.text.primary;
  const tooltipColor = theme.palette.getContrastText("#fff");
  const color = theme.palette.primary.main;
  const d = data.map((x) => ({
    date: x.date,
    return: x.sevenMA * 100,
  }));
  return (
    <ResponsiveContainer>
      <LineChart
        // syncId="time-series"
        data={d}
        // margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis dataKey="date" />
        <YAxis
          // domain={[-100, 200]}
          // domain={['dataMin', 'dataMax']}
          unit="%"
          label={{
            value: "Annualised Return",
            angle: -90,
            position: "insideLeft",
            style: { textAnchor: "middle", fill: text },
          }}
        />
        <Tooltip
          labelStyle={{ color: tooltipColor }}
          formatter={(x) => [`${x.toFixed(2)}%`, "MA(7) Annualised Return"]}
        />
        <Legend formatter={(x) => "MA(7)"} />
        <Line
          type="monotoneX"
          dataKey="return"
          stroke={color}
          activeDot={{ r: 8 }}
          strokeWidth={3}
          dot={{
            stroke: color,
            fill: color,
            fillOpacity: 1,
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

const MarginAllocation = ({ data }) => {
  const theme = useTheme();
  const text = theme.palette.text.primary;
  const stroke = theme.palette.background.paper;
  const colors = [
    theme.palette.primary.dark,
    theme.palette.primary.main,
    theme.palette.primary.light,
  ];
  return (
    <ResponsiveContainer>
      <PieChart>
        <Pie
          dataKey="allocation"
          nameKey={"instrument"}
          data={data.sort((a, b) => b.allocation - a.allocation)}
          // cx="40%"
          // cy={200}
          labelLine
          // innerRadius={60}
          outerRadius={90}
          // fill={color}
          stroke={stroke}
          strokeWidth={3}
          // paddingAngle={5}
          // label={(x) => `${x.instrument} (${(x.value * 100).toFixed(0)}%)`}
          labelStyle={{ color: text, fill: text }}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(x) => `${(x * 100).toFixed(0)}%`} />
        <Legend
          align="right"
          verticalAlign="middle"
          layout="vertical"
          // height={36}
          formatter={(instrument, x) =>
            `${instrument} (${(x.payload.percent * 100).toFixed(0)}%)`
          }
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(4, 2),
    },
  },
  paper: {
    padding: theme.spacing(0),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(4),
    },
  },
  heading: {
    textAlign: "center",
    [theme.breakpoints.up("md")]: {
      textAlign: "left",
    },
  },
  descriptionBox: {
    padding: "16px",
  },
}));

export const Portfolio = () => {
  const theme = useTheme();
  const classes = useStyles();

  const raw = uniqBy(
    walletHistory.filter((x) => x.transactStatus === "Completed"),
    (x) => formatDate(new Date(x.timestamp))
  )
    .map((x) => ({
      date: new Date(x.timestamp),
      balance: parseFloat(x.walletBalance / 10e8),
    }))
    .reverse();
  const startedAt = raw[0].date;
  const dates = raw.map((x) => x.date);
  const balances = raw.map((x) => x.balance);
  const change = changeEachPeriod(balances);

  const riskFreeRate = 0.25 / 100;

  // Single Numbers
  const aum = balances[balances.length - 1];
  const kurtosis = sampleKurtosis(change.slice(1));
  const returnLast30Days = changeOverPeriodEnd(balances, 30) * 365;
  const returnLast7Days = changeOverPeriodEnd(balances, 7) * 365;
  const sharpe = sharpeRatio(balances, riskFreeRate / 365);
  const skewness = sampleSkewness(change.slice(1));

  // Arrays
  const performance = changeOverall(balances);
  const ma = movingAverage(change, 7);
  const maData = zip(dates, ma).map(([date, sevenMA]) => ({
    date: formatDate(startOfDay(date)),
    sevenMA: sevenMA * 365,
  }));
  const performanceData = zip(dates, performance).map(
    ([date, performance]) => ({
      date: formatDate(new Date(date)),
      performance,
    })
  );
  const data = raw.map((x, i) => ({
    date: x.date,
    balance: x.balance,
    change: change[i],
    sevenMA: ma[i] * 365,
    performance: performance[i],
  }));
  console.log(data);

  const marginSum = sumBy(position, "maintMargin");
  const margin = position.map((x) => ({
    allocation: x.maintMargin / marginSum,
    instrument: x.symbol,
  }));
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Paper elevation={4} className={classes.paper}>
        <Grid
          container
          justify="space-between"
          alignContent="center"
          alignItems="center"
        >
          <Grid item md={8} className={classes.descriptionBox}>
            <Typography variant="h1">Quanto Strategy</Typography>
            <Link
              href="https://twitter.com/thetaseek"
              color="inherit"
              variant="subtitle1"
            >
              by{" "}
              <span style={{ color: theme.palette.primary.main }}>
                Thetaseek
              </span>
            </Link>
            <br />
            <br />
            <Typography>
              This trade is Delta-hedged meaning that it's unaffected by price
              movements.
            </Typography>
            <br />
            <Typography variant="body2">
              Active Since: {startedAt.toISOString().split("T")[0]}
            </Typography>
          </Grid>

          <Grid
            item
            md={4}
            style={{
              width: "100%",
              textAlign: "center",
              padding: "8px 0",
              // borderTop: dividerStyle,
              // alignSelf: 'stretch',
              // height: 'auto',
            }}
          >
            <Hidden mdUp>
              <Divider />
              <br />
              <Typography variant="h5" gutterBottom>
                Key Stats
              </Typography>
            </Hidden>
            <Grid container>
              <Grid item xs={6}>
                <Typography align="center" variant="caption">
                  <span
                    style={{
                      fontWeight: 500,
                      fontSize: "2em",
                    }}
                  >
                    {`${aum.toFixed(3)} BTC`}
                  </span>
                  <br />
                  AUM
                  <br />
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="center" variant="caption">
                  <span
                    style={{
                      fontWeight: 500,
                      fontSize: "2em",
                      color: theme.palette.primary.main,
                    }}
                  >
                    {sharpe.toFixed(2)}
                  </span>
                  <br />
                  Sharpe Ratio
                </Typography>
              </Grid>
            </Grid>
            <br />
            <Grid container>
              <Grid item xs={6}>
                <Typography align="center" variant="caption">
                  <span
                    style={{
                      // color: "#53ff95",
                      color: theme.palette.success.main,
                      fontWeight: 500,
                      fontSize: "2em",
                    }}
                  >
                    <ArrowUpwardIcon style={{ fontSize: "0.7em" }} />
                    {Number.isNaN(returnLast7Days)
                      ? "N.A."
                      : `${(returnLast7Days * 100).toFixed(2)}%`}
                  </span>
                  <br />
                  Annualised Return
                  <br />
                  (7 Days)
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="center" variant="caption">
                  <span
                    style={{
                      fontWeight: 500,
                      fontSize: "2em",
                    }}
                  >
                    {Number.isNaN(returnLast30Days)
                      ? "N.A."
                      : `${(returnLast30Days * 100).toFixed(2)}%`}
                  </span>
                  <br />
                  Annualised Return
                  <br />
                  (30 Days)
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <br />
        <Divider />
        <br />
        <Typography variant="h5" gutterBottom className={classes.heading}>
          Overall Portfolio Performance
        </Typography>
        <div style={{ height: "350px", margin: "24px 8px 16px" }}>
          <PerformanceChart data={performanceData} />
        </div>
        <br />
        <Divider />
        <br />
        <Typography variant="h5" gutterBottom className={classes.heading}>
          Annualised Returns
        </Typography>
        <div style={{ height: "350px", margin: "24px 8px 16px" }}>
          <MovingAverage data={maData} />
        </div>
        <br />
        <Divider />
        <br />
        <br />
        <Grid container justify="space-around" spacing={2}>
          <Grid item xs={12} md={5}>
            <Typography variant="h5" className={classes.heading}>
              Current Margin Allocation
            </Typography>
            <div style={{ height: "250px", margin: "0 8px" }}>
              <MarginAllocation data={margin} />
            </div>
          </Grid>
          <Grid item xs={12} md={5}>
            <Hidden mdUp>
              <br />
              <Divider />
              <br />
              <br />
            </Hidden>
            <Typography variant="h5" className={classes.heading}>
              Portfolio Indicators
            </Typography>
            <TableContainer>
              <Table aria-label="simple table">
                <TableBody>
                  {[
                    { name: "", value: "" },
                    { name: "Sharpe Ratio", value: sharpe.toFixed(3) },
                    { name: "Skewness", value: skewness.toFixed(3) },
                    { name: "Kurtosis", value: kurtosis.toFixed(3) },
                    // { name: "Alpha", value: "96%" },
                    // { name: "Beta", value: "-0.05" },
                  ].map(({ name, value }) => (
                    <TableRow key={value}>
                      <TableCell component="th" scope="row">
                        {name}
                      </TableCell>
                      <TableCell align="right">{value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
