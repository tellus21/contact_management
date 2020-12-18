import React from 'react'
import clsx from "clsx";
import { AppBar as App } from "@material-ui/core"
import {
    makeStyles,
    createStyles,
    Theme,
} from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
    })
)

const AppBar: React.FC = () => {
    const classes = useStyles();
    return (
        <App
            position="absolute"
            className={clsx(classes.appBar, open && classes.appBarShift)}
        >
            )
            }

            export default AppBar
