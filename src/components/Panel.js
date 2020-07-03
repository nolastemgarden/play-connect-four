import React from 'react';

// My Styling

// My Components


// MUI  components
import Box from '@material-ui/core/Box';

// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    panel: {
        border: 'solid red 1px',
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


    let status = props.gameStatus;
    
    // let circle;
    // let text;
    // if (status === 'red') {
    //     circle = <Circle color={'red'} id={'1'} />;
    //     text = 'TO MOVE.';
    // } else if (status === 'yellow') {
    //     circle = <Circle color={'yellow'} id={'1'} />;
    //     text = 'TO MOVE.';
    // } else if (status === 'redWon') {
    //     circle = <Circle color={'red'} id={'1'} />;
    //     text = 'WINS!';
    // } else if (status === 'yellowWon') {
    //     circle = <Circle color={'yellow'} id={'1'} />;
    //     text = 'WINS!';
    // } else if (status === 'draw') {
    //     circle = <Circle color={'open'} id={'1'} />;
    //     text = 'Game Over. Draw.';
    // } else {
    //     console.log('error in Info Component circle getter.')
    // }

    const panel = 
        <Box className={classes.statusDisplay}>
            {/* <span className={classes.infoCircle}>
                {circle}
            </span>
            <h1>{text}</h1> */}
            {status}
        </Box>
    

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