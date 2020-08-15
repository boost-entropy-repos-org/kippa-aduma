import React from "react";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { usePopoverState } from "common/utils/hooks";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import Menu from "common/components/Menu";

const styles = (theme) => ({
    icon: {
        fontSize: 36,
    },
    menuItemWrapper: {
        display: "flex",
        alignItems: "center",
        padding: "5px 0",
    },
    menuItemIcon: {
        marginRight: 12,
    },
});

function AccountButton(props) {
    const { classes } = props;

    const [anchorEl, setAnchorEl, clearAnchorEl] = usePopoverState();

    return (
        <>
            <IconButton children={<AccountCircleIcon className={classes.icon} />} onClick={setAnchorEl} />
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={clearAnchorEl}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                items={[
                    { title: "My Profile", icon: AccountCircleIcon },
                    { title: "Sign Out", icon: LogoutIcon },
                ]}
            />
        </>
    );
}

export default withStyles(styles)(AccountButton);
