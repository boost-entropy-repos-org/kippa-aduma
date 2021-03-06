import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import * as muiColors from "@material-ui/core/colors";
import { lighten } from "@material-ui/core";

const primaryColor = muiColors.red;
const secondaryColor = muiColors.lightBlue;

const customTheme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            main: primaryColor[600],
            dark: primaryColor[900],
            light: primaryColor[400],
            veryLight: primaryColor[200],
            superLight: primaryColor[100],
        },
        secondary: {
            main: secondaryColor[500],
            dark: secondaryColor[700],
            light: secondaryColor[300],
            veryLight: secondaryColor[200],
            superLight: secondaryColor[100],
        },
    },
    constants: {
        appBackground: muiColors.blueGrey[800],
        appBackgroundDark: muiColors.blueGrey[900],
        appBackgroundHighlight: muiColors.blueGrey[700],
    },
});

export default createMuiTheme({
    ...customTheme,
    overrides: {
        MuiPaper: {
            root: {
                backgroundColor: customTheme.constants.appBackground,
            },
        },
        MuiPopover: {
            paper: {
                backgroundColor: customTheme.constants.appBackgroundHighlight,
            },
        },
        MuiIconButton: {
            root: {
                padding: 6,
            },
        },
        MuiFilledInput: {
            root: { borderRadius: "0 !important " },
            input: { padding: "10px 12px" },
        },
        MuiButton: {
            root: {
                fontFamily: "Inconsolata",
                letterSpacing: 1.15,
                fontSize: 16,
            },
            contained: {
                backgroundColor: lighten(customTheme.constants.appBackgroundHighlight, 0.5),
                "&:hover": {
                    backgroundColor: lighten(customTheme.constants.appBackgroundHighlight, 0.3),
                },
            },
            containedPrimary: { color: "white" },
            containedSecondary: { color: "white" },
        },
    },
});
