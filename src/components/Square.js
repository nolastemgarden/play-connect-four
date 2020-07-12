import React from 'react';

// My Styling
// import '../App.css';

// My Components
import Circle from "./Circle";

// MUI  components
import Box from '@material-ui/core/Box';


// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    square: {
        
        width: '100%',
        height: '85%',
        backgroundColor: theme.palette.primary.main,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
}));


export default function Square(props) {
    const classes = useStyles();
    const status = props.squareStatus;

    // console.log("Square passes status to Circle: " + props.status);    // Status may be 'red' 'yellow' or 'open'
    return (
        <Box
            key={props.id}
            className={classes.square}
        >
            <Circle status={status} />
        </Box>
    )
}

