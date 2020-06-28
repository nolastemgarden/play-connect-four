import React from 'react';

// My Styling
import '../App.css';

// My Components
import Navbar from '../components/Navbar';
import Square from "../components/Square";

// MUI  components
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
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
    board: {
        display: 'flex',
        justifyContent: 'center',
        border: 'solid red 1px',
        width: '800px',
        height: '800px',
    },
    column: {
        border: 'solid green 1px',
        display: 'flex',
        flexDirection: 'column-reverse',
        alignItems: 'center',
        justifyContent: 'center',
    },
    panel: {
        border: 'solid red 1px',
        display: 'flex',
        justifyContent: 'center',
        
        width: '800px',
        height: '200px',
    }
}));


export default function ClassicGame() {
    const classes = useStyles();

    const colNumber = 1;
    
    
    return (
        <Container
            className={classes.root}
            maxWidth='md'
        >
            <Navbar pageTitle={"Classic Connect Four"} />





            <Paper className={classes.paper} >
                <Box className={classes.board}  >
                    
                    
                    <Column 
                        id={colNumber}
                    />
                
                
                </Box>
                <Box className={classes.panel}  >

                </Box>

            </Paper>
        </Container>
    );
}



// function Column(props) {
//     let column = [];
//     for (let row = 0; row < colHeight; row++) {
//         const id = (col * colHeight + row);  // Both rows and cols, and now id's too, are 0-indexed
//         let newSquare =
//             <Square
//                 key={id}
//                 id={id}
//                 status={columnStatus[row]}
//             />;
//         column = column.concat(newSquare);
//     }
//     return (
//         <Box className={classes.column}
//             onClick={() => props.handleClick(col)}
//         >
//             {column}
//         </Box>
//     )
// }


function  Column(props) {
    const classes = useStyles();
    const columnNumber = props.columnNumber;


    const squaresStatus = ['empty', 'empty', 'empty', 'empty', 'player1', 'player1', 'player1']
    
    let column = [];
    
    
    for (let row = 0; row < squaresStatus.length; row++){
        let square = 
            <Square 
                id={row}
                status={squaresStatus[row]} /
            >
        
        column = column.concat(square)
    }

    console.log(`column = ${column}`)
    
    return (
        <Box
            className={classes.column}
            // values={}
        >
            
            {column}
            
                
        </Box>
    );
}