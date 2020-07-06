// GAME WRAPPER can have either a Classic Game oor a Multiplication Game as a child.
// It provides the child with SIMPLE CONSTANTS such as squaresPerCol = 6 and squaresPerRow = 7
// It also provides COMPLEX CONSTANTS such as the MAPS lineIdToSquareIdsMap and squareIdToLineIdsMap.
// This way the Wrapper generates these maps ONCE and passes them as props to the game so that the game 
// will not try to RE-generate the maps every time its state changes.  
// NOTE that the lineStatusMap needs to be generated each time the game history is added to so that 
// particular map making function still lives in the Game component, not here in the Wrapper. 

import React from 'react';
import {
    HashRouter as Router,
    Link as RouterLink,
    Route,
    Switch
} from "react-router-dom";



// My Components & Pages
import Navbar from '../components/Navbar';
import ClassicGame from './ClassicGame';

// MUI  components
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography'


import {
    makeStyles,
    ThemeProvider
} from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: '100%',
        
        // minWidth: '400px',
        // backgroundColor: theme.palette.common.white,
        // backgroundColor: theme.palette.primary.light,
        // backgroundColor: '#b3e5fc',
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'top',

    },


}));


export default function ClassicGameWrapper() {
    const classes = useStyles();
    
    // Game Constants
    const squaresPerCol = 6;
    const squaresPerRow = 7;
    let totalSquares = squaresPerCol * squaresPerRow;

    // A "Line" is defined as an Array of four squareIds that together constitute a win. 
    // There are four 'types' of Line: 'vertical', 'horizontal', 'upslash', 'downslash'
    // Each Line has a unique id. Id's are unique even across types, are consecutive, and 0-indexed . 

    let linesPerCol = (squaresPerCol - 4 >= 0) ? (squaresPerCol - 3) : 0;
    let linesPerRow = (squaresPerRow - 4 >= 0) ? (squaresPerRow - 3) : 0;

    let numberOfVerticalLines = linesPerCol * squaresPerRow;
    let numberOfHorizontalLines = linesPerRow * squaresPerCol;
    let numberOfUpslashLines = linesPerCol * linesPerRow;
    let numberOfDownslashLines = linesPerCol * linesPerRow;
    let totalNumberOfLines = numberOfVerticalLines + numberOfHorizontalLines + numberOfUpslashLines + numberOfDownslashLines;

    const lineIdToSquareIdsMap = getLineIdToSquareIdsMap();     // The linesToSquaresMap has one Key:Value pair for each lineId to a four-element array containing the squareIds that make up that line.
    const squareIdToLineIdsMap = getSquareIdToLineIdsMap();     // The squaresToLinesMap has one Key:Value pair mapping each squareId to an array of the Lines that include that squarre. In classic 6x7 game this is at least 3 and at most 13 lines.


    // MAP MAKING FUNCTIONS
    function getLineIdToSquareIdsMap() {
        let completeMap = new Map();
        let partialMaps = [verticalLineMap(), horizontalLineMap(), upslashLineMap(), downslashLineMap()]

        partialMaps.forEach(partialMap => {
            partialMap.forEach((squareIdList, lineId) => {
                completeMap.set(lineId, squareIdList);
            });
        })
        // CONFUSING point: For now I have just silenced the following console.log because it runs everytime handleColumnClick is called.  This means the map is being recreated from scratch each turn of the game unnecesarily. Perhaps I could solve this by moving the entire ClassicGame() inside a wrapper component that is strictly for holding complex CONSTANTS that ClassGame uses but only needs to compute once such as the Maps.
        console.log(`Generated Map of LineIds to the four SquareIds in each. There are ${completeMap.size} LineIds in the Map.`)
        // completeMap.forEach(logMapElement);
        // The following four HELPERS bear responsibility for corresponding the lists of squares to their correct final lineIds.  This is simple for vertical lines but requires consideartion of the startingId for the latter three. 
        function verticalLineMap() {
            let map = new Map();
            // Vertical Lines are assigned Ids starting from Zero.
            let currentLineId = 0;

            for (let squareId = 0; squareId < totalSquares; squareId++) {
                if (isStartOfVerticalLine(squareId)) {
                    let first = squareId + 0;
                    let second = squareId + 1;
                    let third = squareId + 2;
                    let fourth = squareId + 3;
                    let squaresInLine = [first, second, third, fourth];
                    map.set(currentLineId, squaresInLine);
                    currentLineId++;
                }
            }
            return map;
        }
        function horizontalLineMap() {
            let map = new Map();
            // Horizontal Lines are assigned Ids starting from numberOfVerticalLines.
            let currentLineId = numberOfVerticalLines;
            for (let squareId = 0; squareId < totalSquares; squareId++) {
                if (isStartOfHorizontalLine(squareId)) {
                    let first = squareId + (0 * squaresPerCol);
                    let second = squareId + (1 * squaresPerCol);
                    let third = squareId + (2 * squaresPerCol);
                    let fourth = squareId + (3 * squaresPerCol);
                    let squaresInLine = [first, second, third, fourth];
                    map.set(currentLineId, squaresInLine);
                    currentLineId++;
                }
            }
            return map;
        }
        function upslashLineMap() {
            let map = new Map();
            // Upslash Lines are assigned Ids starting from numberOfVerticalLines + numberOfHorizontalLines.
            let currentLineId = numberOfVerticalLines + numberOfHorizontalLines;
            for (let squareId = 0; squareId < totalSquares; squareId++) {
                if (isStartOfUpslashLine(squareId)) {
                    let first = squareId + 0 * (squaresPerCol + 1);
                    let second = squareId + 1 * (squaresPerCol + 1);
                    let third = squareId + 2 * (squaresPerCol + 1);
                    let fourth = squareId + 3 * (squaresPerCol + 1);
                    let squaresInLine = [first, second, third, fourth];
                    map.set(currentLineId, squaresInLine);
                    currentLineId++;
                }
            }
            return map;
        }
        function downslashLineMap() {
            let map = new Map();
            // Downslash Lines are assigned Ids starting from numberOfVerticalLines + numberOfHorizontalLines + numberOfUpslashLines.
            let currentLineId = numberOfVerticalLines + numberOfHorizontalLines + numberOfUpslashLines;
            for (let squareId = 0; squareId < totalSquares; squareId++) {
                if (isStartOfDownslashLine(squareId)) {
                    let first = squareId + 0 * (squaresPerCol - 1);
                    let second = squareId + 1 * (squaresPerCol - 1);
                    let third = squareId + 2 * (squaresPerCol - 1);
                    let fourth = squareId + 3 * (squaresPerCol - 1);
                    let squaresInLine = [first, second, third, fourth];
                    map.set(currentLineId, squaresInLine);
                    currentLineId++;
                }
            }
            return map;
        }
        return completeMap;
    }
    function getSquareIdToLineIdsMap() {
        let squaresToLinesMap = new Map();
        for (let squareId = 0; squareId < totalSquares; squareId++) {
            squaresToLinesMap.set(squareId, []);
        }
        lineIdToSquareIdsMap.forEach((squaresList, lineId) => {
            squaresList.forEach(squareId => {
                squaresToLinesMap.set(squareId, squaresToLinesMap.get(squareId).concat(lineId));
            })
        })
        // CONFUSING point: For now I have just silenced the following console.log because it runs everytime handleColumnClick is called.  This means the map is being recreated from scratch each turn of the game unnecesarily. Perhaps I could solve this by moving the entire ClassicGame() inside a wrapper component that is strictly for holding complex CONSTANTS that ClassGame uses but only needs to compute once such as the Maps.
        console.log(`Mapped each of the ${totalSquares} SquareIds to the set of all Lines that include it.`)
        // squaresToLinesMap.forEach(logMapElement);
        return squaresToLinesMap;
    }


    // FIRST level BOOLEAN LINE helpers             // Currently there is only a Square.js functional Component, however if I defined a Square Class I would think that I could turn these functions that take squareId as a parameter and turn them into something that 'reads better' like Square.isStartOfVerticalLine() written on the Square object so that it has built in access to the relevant squareId and can be used in a no-parameter fashion. ??? 
    function isStartOfVerticalLine(squareId) {
        const rowNumber = getRowBySquareId(squareId);
        return (squaresPerCol - rowNumber >= 4);
    }
    function isEndOfVerticalLine(squareId) {
        // To check if a square is the end of a verticalLine we need its rowNumber.
        // rowNumber has 0-based indexing. If we are in the 3rd row or above then return TRUE.
        const rowNumber = getRowBySquareId(squareId);
        return (rowNumber >= 3);
    }
    function isStartOfHorizontalLine(squareId) {
        // If we are in the 0-th row then the minimum squaresPerCol that should return true is 4
        const colNumber = getColBySquareId(squareId);
        return (squaresPerRow - colNumber >= 4);
    }
    function isStartOfUpslashLine(squareId) {
        // A square is the Start Of an Upslash Line IFF it is BOTH the "start" of a vertical line AND the "start" of a horizontal line.  
        return (isStartOfVerticalLine(squareId) && isStartOfHorizontalLine(squareId));
    }
    function isStartOfDownslashLine(squareId) {
        // A square is the Start Of an Downslash Line IFF it is BOTH the "end" of a vertical line AND the "start" of a horizontal line.  
        return (isEndOfVerticalLine(squareId) && isStartOfHorizontalLine(squareId));
    }


    // LOWEST LEVEL SQUARE-ROW-COL HELPERS
    function getRowBySquareId(id) {
        return (id % squaresPerCol);
    }
    function getColBySquareId(id) {
        return (Math.floor(id / squaresPerCol))
    }
    function getSquareIdByRowCol(row, col) {
        return (col * squaresPerCol + row);
    }


    return (
        <Box className={classes.root}>
            <Navbar pageTitle={"Classic Connect Four"} />
            
            <ClassicGame
                squaresPerCol={squaresPerCol}
                squaresPerRow={squaresPerRow}
                lineIdToSquareIdsMap={lineIdToSquareIdsMap}
                squareIdToLineIdsMap={squareIdToLineIdsMap}
            />
                            
        </Box>
    );
}

