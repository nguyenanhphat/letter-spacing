import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar } from "@material-ui/core";

const drawerWidth = 240;
const styles = theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    background: "#80808047"
  },
  chartContainer: {
    marginLeft: -22
  },
  tableContainer: {
    width: "100%",
    height: "100%"
  },
  h5: {
    marginBottom: theme.spacing(2)
  },
  toolbarButton: {
    marginRight: 10,
    color: "white",
    "&$disabled": {
      background: "rgba(0, 0, 0, 0.12)",
      color: "white",
      boxShadow: "none"
    },
    backgroundColor: "#59616b",
    height: 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    paddingLeft: 20
  },
  disabled: {},
  label: {
    textTransform: "capitalize",
    fontSize: 14
  },
  iconButton: {
    width: 13,
    height: 13,
    marginRight: 10,
    alignSelf: "flex-end",
    marginBottom: 5
  },
  shareableContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20
  }
});

const LetterLayout = ({ classes, children }) => {
  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar position="absolute" className={classNames(classes.appBar)}>
        <Toolbar className={classes.toolbar}>this is toolbar</Toolbar>
      </AppBar>

      <main className={classes.content}>
        <div className={classes.tableContainer}>{children}</div>
      </main>
    </div>
  );
};

LetterLayout.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(LetterLayout);
