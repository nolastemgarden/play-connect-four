import React from 'react';

// My Styling
import '../App.css';

// My Components
import Board from '../components/Board'
import Panel from "../components/Panel";

import Navbar from '../components/Navbar';

// MUI  components
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        // border: 'solid red 1px',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // backgroundColor: '#4AC9FD',
        // overflow: 'scroll',
    },
    paper: {
        justifySelf: 'center',
        width: '100%',
        height: 'auto',
        // backgroundColor: theme.palette.primary.light,
        backgroundColor: theme.palette.common.white,
        marginTop: '1.5rem',

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));


export default function ClassicGame() {
    const classes = useStyles();

    const colNumber = 1;
    const boardStatus = Array(42).fill('empty');
    
    return (
        <Container
            className={classes.root}
            maxWidth='md'
        >
            <Navbar pageTitle={"Classic Connect Four"} />
            <Paper className={classes.paper} >
                
                <Board 
                    boardStatus= {boardStatus}
                    columnHeight= {6}
                />

                <Panel 
                    panelStatus= ""
                />

            </Paper>
        </Container>
    );
}
