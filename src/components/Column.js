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

        width: '100%',
        height: '100%',
    },
}));


export default function Column(props) {
    const classes = useStyles();
    const colNumber = props.colNumber;
    const columnStatus = props.columnStatus;

    let column = [];
    for (let row = 0; row < columnStatus.length; row++) {
        // const squareId = squaresPerColumn * colNumber + row;
        const squareId = row;
        let square =
            <Square
                id={squareId}
                key={squareId}
                squareStatus={columnStatus[row]}

            />
        column = column.concat(square)
    }

    return (
        <Box
            className={classes.column}
            key={colNumber}
            onClick={() => props.handleClick(colNumber)}
        
        >

            {column}
        </Box>
    );
}