import React from 'react';

// My Styling

// My Components


// MUI  components
import Box from '@material-ui/core/Box';

// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    panel: {
        // border: 'solid red 1px',
        width: '800px',
        height: '200px',
        display: 'flex',
        justifyContent: 'center',
    },
}));


// The Panel takes data the status of the Game that is computed by the Game compnents and displays it to the user.
export default function Panel(props) {
    const classes = useStyles();

    const gameOver = props.gameOver;
    const playerOneToMove = props.playerOneToMove;

    
    

    return (
        <Box className={classes.panel} >
            {panel}
        </Box>
    );

}


// function validateBoardStatus(boardStatus, columnHeight) {
//     if (boardStatus.length !== 42) {
//         console.warn('Rendering Board with number of squares NOT equal to 42.');
//         return 1;
//     }
//     if (boardStatus.length % columnHeight !== 0) {
//         console.warn('Rendering Board with number of squares NOT divisible by column height.');
//         return 1;
//     }
//     else {
//         return 0;
//     }
// }