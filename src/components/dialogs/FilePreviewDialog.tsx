import React, { Component, useState, useEffect } from "react";
import { WithStyles, withStyles, createStyles, Theme } from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import SvgIcon from "@material-ui/core/SvgIcon";
import { mdiEmoticonConfusedOutline } from "@mdi/js";

import { Get } from "src/utils/helpers/api";

import DialogBase from "../general/DialogBase";
import FileRenderer from "../general/FileRenderer";

const styles = (theme: Theme) =>
    createStyles({
        content: {
            padding: 15,
            backgroundColor: theme.constants.appBackgroundHighlight,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        },
        text: {
            fontStyle: "italic",
            fontFamily: "Inconsolata",
            marginTop: 25,
        },
        errorIcon: {
            fontSize: 100,
        },
    });

type FilePreviewProps = WithStyles<typeof styles> & { filePath?: string };
type FilePreviewDialogProps = FilePreviewProps & { onClose: () => void };

function FilePreviewDialog({ classes, filePath, onClose }: FilePreviewDialogProps) {
    const fileName = filePath?.split("/").reverse()[0];

    return (
        <DialogBase open={!!filePath} title={`File Preview: ${fileName || "-"}`} onClose={onClose} size="big">
            <DialogContent className={classes.content}>
                <FilePreviewErrorBoundary filePath={filePath}>
                    <FilePreview filePath={filePath} />
                </FilePreviewErrorBoundary>
            </DialogContent>
        </DialogBase>
    );
}

export default withStyles(styles)(FilePreviewDialog);

const FilePreview = withStyles(styles)(({ classes, filePath = "" }: FilePreviewProps) => {
    const [fileBlobPath, setBlobPath] = useState("");
    const [loading, setLoading] = useState(false);

    function triggerErrorBoundary(errorMessage: string) {
        setLoading(false);

        setBlobPath(() => {
            throw new Error(errorMessage);
        });
    }

    // fetch file every time path changes
    useEffect(() => {
        if (!filePath) return;

        setLoading(true);

        Get(`file?path=${filePath}`)
            .then(async (res) => {
                if (!res.ok) {
                    triggerErrorBoundary(await res.text());
                    return;
                }

                // create blob only for supported files?

                const blob = await res.blob();
                const blobURL = URL.createObjectURL(blob);

                setBlobPath(blobURL);
                setLoading(false);
            })
            .catch((e) => triggerErrorBoundary(e.message));

        return () => {
            try {
                URL.revokeObjectURL(fileBlobPath);
            } catch (e) {
                console.error("Failed revoking blob URL: ", e.message);
            }
        };
    }, [filePath]);

    if (!filePath)
        return (
            <Typography variant="h5" className={classes.text}>
                (No file to display)
            </Typography>
        );

    const filename = filePath.split("/").pop() || "";

    return loading ? (
        <>
            <CircularProgress size={100} color="inherit" />
            <Typography variant="h5" className={classes.text}>
                Loading file...
            </Typography>
        </>
    ) : (
        <FileRenderer blobPath={fileBlobPath} filename={filename} />
    );
});

type FilePreviewErrorBoundaryProps = WithStyles<typeof styles> & { children: React.ReactNode; filePath?: string };

class FilePreviewErrorBoundaryClass extends Component<FilePreviewErrorBoundaryProps> {
    state = { error: false };

    static getDerivedStateFromError(e: Error) {
        return { error: e.message };
    }

    componentDidCatch(e: Error) {
        // eslint-disable-next-line no-console
        console.error(`Caught error while attempting to read file: ${this.props.filePath}`, e);
    }

    render() {
        const { classes, children } = this.props;
        const { error } = this.state;

        return error ? (
            <Typography component="div" variant="h5" color="error" align="center" className={classes.text}>
                <SvgIcon color="error" className={classes.errorIcon}>
                    <path d={mdiEmoticonConfusedOutline} />
                </SvgIcon>
                <br />
                Could not display file... <br />
                Error message: {error} <br />
                Check the console for full error information.
            </Typography>
        ) : (
            children
        );
    }
}

const FilePreviewErrorBoundary = withStyles(styles)(FilePreviewErrorBoundaryClass);
