import React from 'react';

// My Components


// MUI  components
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // backgroundColor: '#4AC9FD',
        // overflow: 'scroll',
    },
    paper: {
        width: '100%',
        height: '400px',
    },
    

}));


export default function MultiplicationGame() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };


    // What distinguishes Math from Science?
    //    sci... Math...
    //  Bottom Line: Proof vs evidence. 
    // What does Tic Tac Toe have to do with this?
    // --play now button
    // What is the Fifteen Game?

    return (
        <Container
            className={classes.root}
            maxWidth='md'
        >


            <Paper className={classes.paper} >






            </Paper>
        </Container>
    );
}