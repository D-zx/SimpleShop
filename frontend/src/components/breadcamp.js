import React from "react";
import {
  Breadcrumbs as MUIBreadcrumbs,
  Link,
  Paper
} from "@mui/material";
import { withRouter } from "react-router-dom";
import { useStyles } from "../styles/base";

const Breadcrumbs = props => {
  const {
    history,
    location: { pathname }
  } = props;

  const pathnames = pathname.split("/").filter(x => x);
  const classes = useStyles();

  return (
    <Paper className={classes.breadcrumb} variant='outlined'>
      <MUIBreadcrumbs separator="›">
        <Link href='' className={classes.breadcrumbLink} onClick={() => history.push("/")}>Home</Link> 
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          return (
              <Link key={name} className={classes.breadcrumbLink}  href={routeTo} onClick={() => history.push(routeTo)}>
                  {name}
              </Link>
              );
          })}
      </MUIBreadcrumbs>
    </Paper>
  );
};

export default withRouter(Breadcrumbs);