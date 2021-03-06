import React from 'react';

// My Styling

// My Components
import Column from "../components/Column";

// MUI  components
import Box from '@material-ui/core/Box';

// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    board: {
        // border: 'solid red 1px',
        // minWidth: '150px',
        // minHeight: '150px',

        // margin: '2rem',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
}));


// The Board takes data on 42 squares and renders a collection of 7 Columns.

export default function Board(props) {
    const classes = useStyles();
    
    const columnHeight = props.columnHeight;
    const boardStatus = (validateBoardStatus(props.boardStatus, columnHeight) === 0 ) ? props.boardStatus : Array(42).fill('empty');
    const columnCount = (boardStatus.length / columnHeight)

    let getColumnStatus = props.getColumnStatus;
    
    let board = [];
    for (let colNumber = 0; colNumber < columnCount; colNumber++) {
        let columnStatus = getColumnStatus(colNumber, boardStatus);
        
        let column =
            <Column
                key={colNumber}
                colNumber={colNumber}
                columnStatus={columnStatus}
                handleClick={props.handleColumnClick}
            />;

        board = board.concat(column);
    }

    return (
        <Box className={classes.board} >
            {board}
        </Box>
    );

}




function validateBoardStatus(boardStatus, columnHeight) {
    if (boardStatus.length !== 42) {
        console.warn(`Rendering Board with number of squares NOT equal to 42. It is ${boardStatus.length}`);
        return 1;
    }
    if (boardStatus.length % columnHeight !== 0) {
        console.warn('Rendering Board with number of squares NOT divisible by column height.');
        return 1;
    }
    else {
        return 0;
    }
}