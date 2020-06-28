import React from 'react';

// My Components
import Navbar from '../components/Navbar';

// MUI  components
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        
    },
    header: {
        padding: '16px',
    },
    paragraph: {
        paddingBottom: '8px',
        paddingLeft: '16px',
    },


}));


export default function ModesOfPlay() {
    const classes = useStyles();
    

    return (
        <React.Fragment>

            <Typography variant='h5' className={classes.header} gutterBottom >
                Classic Mode
            </Typography>
            <Typography variant='body1' className={classes.paragraph} gutterBottom >
                Connect Four is a turn-based strategy game for two players.  The board is a grid with 6 rows and 7 columns.  Players take turns adding a chip of their color to the board and chips always ‘fall’ to the lowest empty row in the selected column.  Both players have the same goal: Get four chips of their color in a row.  Winning four-in-a-rows may be vertical, horizontal, or diagonal.
            </Typography>
            <Typography variant='body1' className={classes.paragraph} gutterBottom >
                To make a move in the classic version, simply click on the column where you want to move.  If you are unfamiliar with the game, this is a good place to start.  Once you understand the mechanics of the game, move on to one of the versions where math fact practice is integrated.
            </Typography>


            <Typography variant='h5' className={classes.header} gutterBottom >
                Multiplication Practice Mode
            </Typography>
            <Typography variant='body1' className={classes.paragraph} gutterBottom >
                In this version of the game, each row and column is assigned a number and each square on the board has a value that is the product of its row and column numbers.  Instead of clicking on the board to make a move, players must determine the product of the row and column where they wish to move and then enter that number in a text input field.
            </Typography>
            <Typography variant='body1' className={classes.paragraph} gutterBottom >
                If the number entered corresponds to one of the squares that is currently the lowest empty square in its column, then the move is made successfully and it becomes the other player's turn.                        </Typography>
            <Typography variant='body1' className={classes.paragraph} gutterBottom >
                If the number entered <em><strong>does not</strong></em> correspond to one of the squares that is currently the lowest empty square in its column, then no move is made and the player who entered an invalid number loses their turn.
            </Typography>
            <Typography variant='body1' className={classes.paragraph} gutterBottom >
                By default, the game uses row and column numbers that are especially common in real world applications but you may use the game settings to choose numbers that your students especially need to practice with.
            </Typography>

            <Typography variant='h5' className={classes.header} gutterBottom >
                Division Practice  Mode
            </Typography>
            <Typography variant='body1' className={classes.paragraph} gutterBottom >
                This version has not been created yet.
            </Typography>

            <Typography variant='h5' className={classes.header} gutterBottom >
                Rules of Exponents  Mode
            </Typography>
            <Typography variant='body1' className={classes.paragraph} gutterBottom >
                This version has not been created yet.
            </Typography>

        </React.Fragment>
    );
}