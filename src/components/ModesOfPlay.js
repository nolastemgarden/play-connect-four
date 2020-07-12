import React from 'react';
import {
    Link as RouterLink,
} from "react-router-dom";

// My Components

// MUI  components
// import Paper from '@material-ui/core/Paper';
// import Box from '@material-ui/core/Box';
// import Container from '@material-ui/core/Container';
// import Button from '@material-ui/core/Button';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// import MenuIcon from '@material-ui/icons/Menu';
// import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// import ExpansionPanel from '@material-ui/core/ExpansionPanel';
// import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
// import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        
    },
    header: {
        padding: '16px',
    },
    
    
    panel: {
        width: '100%',
        padding: '0',
        elevation: '0',
    },
    summary: {
        width: '100%',
        padding: '0',
        paddingRight: '0.7rem',
        paddingLeft: '0.7rem',
        display: 'flex',
        justifyContent: 'space-between'
    },
    summaryName: {
        flexGrow: '1'
    },
    button: {
        // border: 'solid red 1px',
        margin: 'auto',
        width: '18%',
        
    },
    expansionDetail: {
        display: 'flex',
        flexDirection: 'column',
    },
    paragraph: {
        // textIndent: '2rem',
        paddingBottom: '0.5rem',
    },
    


}));

function ExpandPanelButton() {
    const classes = useStyles();

    return (
        <Button
            className={classes.button}
            variant="outlined"
            color="primary"
            
        >
            <ExpandMoreIcon />
        </Button>
    )
}


export default function ModesOfPlay() {
    const classes = useStyles();

    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };



    return (
        <React.Fragment>

            <ExpansionPanel
                className={classes.panel}
                expanded={expanded === 'panel1'}
                onChange={handleChange('panel1')}>
                <ExpansionPanelSummary
                    className={classes.summary}
                    expandIcon={<ExpandPanelButton />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography variant='h5' className={classes.summaryName} >
                        Classic Mode
                    </Typography>
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        component={RouterLink}
                        to='/classic_mode'
                    >
                        Play Now!
                    </Button>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.expansionDetail}>

                    <Typography variant='body1' className={classes.paragraph} >
                        Connect Four is a turn-based strategy game for two players.  The board is a grid with 6 rows
                        and 7 columns.  Players take turns adding a chip of their color to a column of their choosing.
                        Chips always ‘fall’ to the lowest empty square in the selected column.  Both players have the
                        same goal: Get four adjacent chips in any row, column, or diagonal.
                    </Typography>
                    <Typography variant='body1' className={classes.paragraph} gutterBottom >
                        To make a move in the classic version, simply click on the column where you want to move.
                </Typography>

                </ExpansionPanelDetails>
            </ExpansionPanel>


            <ExpansionPanel
                className={classes.panel}
                expanded={expanded === 'panel2'}
                onChange={handleChange('panel2')}>
                <ExpansionPanelSummary
                    className={classes.summary}
                    expandIcon={<ExpandPanelButton />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography variant='h5' className={classes.summaryName} >
                        Multiplication Mode
                    </Typography>
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        component={RouterLink}
                        to='/classic_mode'
                    >
                        Play Now!
                    </Button>
                </ExpansionPanelSummary>
                
                <ExpansionPanelDetails className={classes.expansionDetail}>

                    <Typography variant='body1' className={classes.paragraph} gutterBottom >
                        In this version of the game, each row and column is assigned a number. 
                        Instead of clicking on the board to make a move, players must determine the product of the row number and column number where they wish to move, 
                        and then enter that number in a text input field.
                    </Typography>
                    <Typography variant='body1' className={classes.paragraph} gutterBottom >
                        If the number entered <em><strong> does </strong></em> correspond to one of the squares that is currently the lowest empty square in its column, then the move is made successfully.
                        If the number entered <em><strong> does not </strong></em> correspond to a legal move then then no move is made.
                        Either way, it becomes the other player's turn.                        
                    </Typography>
                    <Typography variant='body1' className={classes.paragraph} gutterBottom >
                        Teachers and Parents Note: By default, the game uses row and column numbers that are common in real world applications but you may use the game settings to choose numbers that your students need to practice with.
                    </Typography>

                </ExpansionPanelDetails>
            </ExpansionPanel>


            

        </React.Fragment>
    );
}