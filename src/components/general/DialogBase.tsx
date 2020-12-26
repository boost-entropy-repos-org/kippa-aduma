import React from "react";
import { withStyles, Theme, createStyles, lighten } from "@material-ui/core/styles";
import Dialog, { DialogProps } from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";

import IconButton from "src/components/general/IconButton";
import { MuiStyles } from "src/utils/interfaces";

const styles = (theme: Theme) =>
    createStyles({
        dialogPaper: {
            minWidth: 500,
            width: "calc(20% + 175px)",
            maxWidth: "80%",
        },
        title: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: `1px solid ${lighten(theme.constants.appBackgroundHighlight, 0.15)}`,
        },
        titleText: {
            fontFamily: "Inconsolata",
            letterSpacing: 1.15,
            fontWeight: "bold",
            marginLeft: 5,
        },
    });

export type DialogBaseProps = MuiStyles & DialogProps & { title: string; open: boolean; onClose: () => void };

function DialogBase({ classes, title, open, onClose, children }: DialogBaseProps) {
    return (
        <Dialog open={open} onClose={onClose} classes={{ paper: classes.dialogPaper }}>
            <DialogTitle disableTypography className={classes.title}>
                <Typography variant="h5" className={classes.titleText}>
                    {title}
                </Typography>
                <IconButton onClick={onClose} fontSize={24} icon={CloseIcon} />
            </DialogTitle>
            {children}
        </Dialog>
    );
}

export default withStyles(styles)(DialogBase);
