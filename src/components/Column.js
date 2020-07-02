import React from 'react';

// My Styling

// My Components
import Square from "../components/Square";

// MUI  components
import Box from '@material-ui/core/Box';

// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    column: {
        // border: 'solid green 1px',
        display: 'flex',
        flexDirection: 'column-reverse',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));


export default function Column(props) {
    const classes = useStyles();
    const columnNumber = props.columnNumber;
    const columnStatus = props.columnStatus;

    // const columnStatus = ['empty', 'empty', 'empty', 'empty', 'player1', 'player1', 'player1']
    if (columnStatus.length != 6) {
        console.warn('Rendering Column with height NOT equal to six.');
    }
    

    let column = [];
    for (let row = 0; row < columnStatus.length; row++) {
        let square =
            <Square
                id={row}
                squareStatus={columnStatus[row]}

            />
        column = column.concat(square)
    }

    return (
        <Box
            className={classes.column}
        // values={}
        >

            {column}


        </Box>
    );
}