import React from "react";
import sumBy from "lodash/sumBy";
import isNumber from "lodash/isNumber";
import IconError from "@material-ui/icons/ErrorOutline";
import {
  Divider,
  CircularProgress,
  Grid,
  Hidden,
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
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

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
import { format } from "date-fns";
import {
  calcBitmexDailyPerformance,
  changeOverPeriodEnd,
  changeRunning,
  movingAverage,
  sharpeRatio,
  sortinoRatio,
} from "../services/calcs";

import { sampleKurtosis, sampleSkewness } from "simple-statistics";

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
  const green = theme.palette.success.main;
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
  paperMessage: {
    textAlign: "center",
    height: "400px",
    padding: theme.spacing(0),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(4),
    },
  },
  paper: {
    padding: theme.spacing(1,0),
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

const StyledReturn = ({ value }) => {
  const theme = useTheme();
  const style = {
    fontWeight: 500,
    fontSize: "2em",
  };
  if (!isNumber(value) || Number.isNaN(value)) {
    return <span style={style}>N.A.</span>;
  }
  return (
    <span
      style={{
        ...style,
        color:
          value > 0 ? theme.palette.success.main : theme.palette.error.main,
      }}
    >
      {value > 0 ? (
        <ArrowUpwardIcon style={{ fontSize: "0.7em" }} />
      ) : (
        <ArrowDownwardIcon style={{ fontSize: "0.7em" }} />
      )}
      {`${(Math.abs(value) * 100).toFixed(2)}%`}
    </span>
  );
};

export const Portfolio = ({
  fetching,
  error,
  walletHistory = [],
  position = [],
  margin = {},
}) => {
  const theme = useTheme();
  const classes = useStyles();
  if (fetching) {
    return (
      <Paper className={classes.paperMessage}>
        <Grid
          container
          justify={"center"}
          alignContent="center"
          style={{ height: "100%" }}
        >
          <Grid item>
            <CircularProgress />
            <Typography>Retrieving</Typography>
          </Grid>
        </Grid>
      </Paper>
    );
  }
  if (error) {
    return (
      <Paper className={classes.paperMessage}>
        <Grid
          container
          justify={"center"}
          alignContent="center"
          style={{ height: "100%" }}
        >
          <Grid item>
            <IconError fontSize="large" color="error" />
            <Typography color="error">
              Failed to load data with API keys
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    );
  }
  if (walletHistory.length === 0 || position.length === 0) {
    return (
      <Paper className={classes.paperMessage}>
        <Grid
          container
          justify={"center"}
          alignContent="center"
          style={{ height: "100%" }}
        >
          <Grid item>
            <IconError fontSize="large" />
            <Typography>
              Please add your API keys to retrieve portfolio performance
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    );
  }

  const riskFreeRate = 0;
  const daily = calcBitmexDailyPerformance(walletHistory);
  const change = daily.map((x) => x.change);
  const aum = margin.marginBalance / 1e8;

  // Single Numbers
  const kurtosis = sampleKurtosis(change);
  const returnLast30Days = changeOverPeriodEnd(change, 30) * 365;
  const returnLast7Days = changeOverPeriodEnd(change, 7) * 365;
  const sharpe = sharpeRatio(change, riskFreeRate / 365);
  const sortino = sortinoRatio(change, riskFreeRate / 365);
  const skewness = sampleSkewness(change);

  // Arrays
  const performance = changeRunning(change);

  // const performance = changeOverall(balances);
  const ma = movingAverage(change, 7);
  const data = daily.map(({ date, ...x }, i) => ({
    date: formatDate(date),
    change: change[i],
    ...x,
    balance: x.balance,
    sevenMA: ma[i] * 365,
    performance: performance[i],
  }));
  console.debug(data);

  const marginSum = sumBy(position, "maintMargin");
  const marginData = position.map((x) => ({
    allocation: x.maintMargin / marginSum,
    instrument: x.symbol,
  }));
  return (
    <Paper className={classes.paper}>
      <Typography variant="h1" gutterBottom>Portfolio Overview</Typography>
      <Grid
        container
        justify="space-between"
        alignContent="center"
        alignItems="center"
        style={{ textAlign: "center" }}
      >
        <Grid item xs={6} md={3}>
          <Typography align="center" variant="caption">
            <span
              style={{
                fontWeight: 500,
                fontSize: "2em",
              }}
            >
              {aum ? `${aum.toFixed(3)} BTC` : '??'}
            </span>
            <br />
            AUM
            <br />
          </Typography>
        </Grid>
        <Grid item xs={6} md={3}>
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
        <Grid item xs={6} md={3}>
          <Typography align="center" variant="caption">
            <StyledReturn value={returnLast7Days} />
            <br />
            Annualised Return
            <br />
            (7 Days)
          </Typography>
        </Grid>
        <Grid item xs={6} md={3}>
          <Typography align="center" variant="caption">
            <StyledReturn value={returnLast30Days} />
            <br />
            Annualised Return
            <br />
            (30 Days)
          </Typography>
        </Grid>
      </Grid>
      <br />
      <Divider />
      <br />
      <Typography variant="h5" gutterBottom className={classes.heading}>
        Overall Portfolio Performance
      </Typography>
      <div style={{ height: "350px", margin: "24px 8px 16px" }}>
        <PerformanceChart data={data} />
      </div>
      <br />
      <Divider />
      <br />
      <Typography variant="h5" gutterBottom className={classes.heading}>
        Annualised Returns
      </Typography>
      <div style={{ height: "350px", margin: "24px 8px 16px" }}>
        <MovingAverage data={data} />
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
            <MarginAllocation data={marginData} />
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
                  { name: "Sortino Ratio", value: sortino.toFixed(3) },
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
      {/*<MaterialTable*/}
      {/*  options={{*/}
      {/*    padding: "dense",*/}
      {/*    pageSize: 10,*/}
      {/*    pageSizeOptions: [10, 50, 100],*/}
      {/*    exportButton: true,*/}
      {/*    search: false,*/}
      {/*  }}*/}
      {/*  columns={[*/}
      {/*    { title: "Date", field: "date", defaultSort: "desc" },*/}
      {/*    {*/}
      {/*      type: "numeric",*/}
      {/*      title: "Balance",*/}
      {/*      field: "balance",*/}
      {/*      render: ({ balance }) => `${balance.toFixed(4)}`,*/}
      {/*    },*/}
      {/*    {*/}
      {/*      type: "numeric",*/}
      {/*      title: "Net Flow",*/}
      {/*      field: "flow",*/}
      {/*      render: ({ flow }) => (flow ? `${flow.toFixed(4)}` : "-"),*/}
      {/*    },*/}
      {/*    {*/}
      {/*      title: "Change",*/}
      {/*      field: "change",*/}
      {/*      render: ({ change }) => `${(change * 100).toFixed(2)}%`,*/}
      {/*      type: "numeric",*/}
      {/*    },*/}
      {/*  ]}*/}
      {/*  data={data}*/}
      {/*/>*/}
    </Paper>
  );
};
