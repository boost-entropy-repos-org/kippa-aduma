import React from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Lottie from "react-lottie";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";

import { MuiStyles } from "src/utils/interfaces";

import animationData from "./animation.json";

const styles = () =>
    createStyles({
        root: {
            pointerEvents: "none",
        },
        text: {
            marginTop: -50,
            color: "rgba(255,255,255,0.35)",
            fontStyle: "italic",
            fontFamily: "Inconsolata",
            letterSpacing: 1.15,
        },
    });

type NotFoundAnimationProps = MuiStyles & { message?: React.ReactChild };
function NotFoundAnimation({ classes, message }: NotFoundAnimationProps) {
    const options = {
        loop: true,
        animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        <Fade in={true} mountOnEnter unmountOnExit>
            <div>
                <div className={classes.root}>
                    <Lottie options={options} height={300} width={300} />
                </div>
                <Typography variant="h6" className={classes.text} align="center" component="div">
                    {message || "No result found to match your request"}
                </Typography>
            </div>
        </Fade>
    );
}

export default withStyles(styles)(NotFoundAnimation);
