import React from "react";
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

const margin = [
  {
    instrument: "XBTUSD",
    allocation: 0.2,
  },
  {
    instrument: "ETHUSD",
    allocation: 0.07,
  },
  {
    instrument: "ETHM20",
    allocation: 0.73,
  },
];

const data = [
  {
    date: "01/04/2020",
    performance: -0.001779552,
    change: -0.001779552,
    sevenMA: null,
  },
  {
    date: "02/04/2020",
    performance: 0.00088927,
    change: 0.002668822,
    sevenMA: null,
  },
  {
    date: "03/04/2020",
    performance: 0.001663272,
    change: 0.000774002,
    sevenMA: null,
  },
  {
    date: "04/04/2020",
    performance: 0.004082874,
    change: 0.002419602,
    sevenMA: null,
  },
  {
    date: "05/04/2020",
    performance: 0.004151302,
    change: 0.000068428,
    sevenMA: null,
  },
  {
    date: "06/04/2020",
    performance: 0.000947648,
    change: -0.003203654,
    sevenMA: null,
  },
  {
    date: "07/04/2020",
    performance: -0.01066761,
    change: -0.011615258,
    sevenMA: -0.5562396643,
  },
  {
    date: "08/04/2020",
    performance: -0.005262734,
    change: 0.005404876,
    sevenMA: -0.1816230614,
  },
  {
    date: "09/04/2020",
    performance: 0.001907296,
    change: 0.00717003,
    sevenMA: 0.05308278429,
  },
  {
    date: "10/04/2020",
    performance: 0.005246748,
    change: 0.003339452,
    sevenMA: 0.1868526771,
  },
  {
    date: "11/04/2020",
    performance: 0.009117856,
    change: 0.003871108,
    sevenMA: 0.2625383471,
  },
  {
    date: "12/04/2020",
    performance: 0.012302606,
    change: 0.00318475,
    sevenMA: 0.42503228,
  },
  {
    date: "13/04/2020",
    performance: 0.01633312,
    change: 0.004030514,
    sevenMA: 0.8022424686,
  },
  {
    date: "14/04/2020",
    performance: 0.021289672,
    change: 0.004956552,
    sevenMA: 1.66634399,
  },
  {
    date: "15/04/2020",
    performance: 0.027651248,
    change: 0.006361576,
    sevenMA: 1.716229061,
  },
  {
    date: "16/04/2020",
    performance: 0.031558504,
    change: 0.003907256,
    sevenMA: 1.546098703,
  },
  {
    date: "17/04/2020",
    performance: 0.034652244,
    change: 0.00309374,
    sevenMA: 1.533286577,
  },
  {
    date: "18/04/2020",
    performance: 0.038741312,
    change: 0.004089068,
    sevenMA: 1.544651634,
  },
  {
    date: "19/04/2020",
    performance: 0.045149514,
    change: 0.006408202,
    sevenMA: 1.712731631,
  },
  {
    date: "20/04/2020",
    performance: 0.04667736,
    change: 0.001527846,
    sevenMA: 1.582235371,
  },
];

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

const PerformanceChart = () => {
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
          Performance: (x.performance * 100).toFixed(2),
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
          formatter={(x) => `${x}%`}
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
const MovingAverage = () => {
  const theme = useTheme();
  const text = theme.palette.text.primary;
  const tooltipColor = theme.palette.getContrastText("#fff");
  const color = theme.palette.primary.main;
  return (
    <ResponsiveContainer>
      <LineChart
        // syncId="time-series"
        data={data
          // .filter((x) => x.sevenMA !== null)
          .map((x) => ({
            date: x.date,
            return: x.sevenMA ? (x.sevenMA * 100).toFixed(2) : null,
          }))}
        // margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis dataKey="date" />
        <YAxis
          tickFormatter={(x) => `${x}%`}
          domain={[-100, 200]}
          label={{
            value: "Annualised Return",
            angle: -90,
            position: "insideLeft",
            style: { textAnchor: "middle", fill: text },
          }}
        />
        <Tooltip
          labelStyle={{ color: tooltipColor }}
          formatter={(x) => [`${x}%`, "MA(7) Annualised Return"]}
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

const MarginAllocation = () => {
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
          data={margin.sort((a, b) => b.allocation - a.allocation)}
          // cx="40%"
          // cy={200}
          labelLine
          // innerRadius={60}
          outerRadius={90}
          // fill={color}
          stroke={stroke}
          strokeWidth={3}
          // paddingAngle={5}
          nameKey={"instrument"}
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
            <Typography variant="body2">Active Since: 01/Apr/2020</Typography>
            {/*<Typography>Current AUM - 5.2334 BTC</Typography>*/}
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
                    5.3 BTC
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
                    0.56
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
                    158.22%
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
                    N.A.
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
          <PerformanceChart />
        </div>
        <br />
        <Divider />
        <br />
        <Typography variant="h5" gutterBottom className={classes.heading}>
          Annualised Returns
        </Typography>
        <div style={{ height: "350px", margin: "24px 8px 16px" }}>
          <MovingAverage />
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
              <MarginAllocation />
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
                    { name: "Sharpe Ratio", value: "0.56" },
                    { name: "Alpha", value: "96%" },
                    { name: "Beta", value: "-0.05" },
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
