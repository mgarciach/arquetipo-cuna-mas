import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  content: {
    marginTop: 60,
    overflow: "auto",
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    [theme.breakpoints.only("xs")]: {
      paddingLeft: 0,
      paddingRight: 0
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  }
});

const MainContent = ({ classes, children }) => (
  <main className={classes.content}>
    {/* <div className={classes.toolbar} /> */}
    {children}
  </main>
);

export default withStyles(styles)(MainContent);
