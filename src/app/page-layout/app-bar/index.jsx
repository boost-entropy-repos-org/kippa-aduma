import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiAppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import { Link, withRouter } from "react-router-dom";
import AccountButton from "./account-button";

const styles = (theme) => ({
    appBar: {
        height: 65,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 15px",
        backgroundColor: theme.palette.primary.dark,
        zIndex: 2,
    },
    wrapper: {
        display: "flex",
        alignItems: "center",
    },
    title: {
        fontFamily: "monospace",
        fontWeight: "bold",
        letterSpacing: 1.5,
        textShadow: "0 2px 2px black",
    },
    currentPath: {
        fontFamily: "monospace",
        fontWeight: "bold",
        letterSpacing: 1.5,
        textShadow: "0 2px 2px black",
        marginLeft: 15,
        marginTop: 2,
    },
    logo: {
        cursor: "pointer",
        marginRight: 15,
        width: 45,
        height: 45,
        borderRadius: "50%",
        backgroundColor: "white",
        boxShadow: "0 2px 2px black",
    },
});

function AppBar(props) {
    const { classes, history } = props;

    const currentPath = history.location.pathname;

    return (
        <MuiAppBar color="primary" className={classes.appBar}>
            <div className={classes.wrapper}>
                <Link to="/">
                    <img alt="kippa-aduma-logo" className={classes.logo} src="/favicon.ico" />
                </Link>
                <Typography variant="h4" children="Kippa Aduma" className={classes.title} />
                {currentPath !== "/" && <Typography variant="h5" children={currentPath} className={classes.currentPath} />}
            </div>
            <div className={classes.wrapper}>
                <AccountButton />
            </div>
        </MuiAppBar>
    );
}

export default withStyles(styles)(withRouter(AppBar));
