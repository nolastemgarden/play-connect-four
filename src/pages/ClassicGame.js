import React, { useState } from 'react';

// My Styling
import '../App.css';

// My Components
import Board from '../components/Board'
import Panel from "../components/Panel";

import Navbar from '../components/Navbar';

// MUI  components
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

// Custom Styling
import { makeStyles } from '@material-ui/core/styles';
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
}));


export default function ClassicGame() {
    const classes = useStyles();

    // Game Constants
    const squaresPerCol = 6;
    const squaresPerRow = 7;
    const totalSquares = squaresPerCol * squaresPerRow;

    // The ONLY mutable state in the Game is a list of the square id's that have been claimed in the order they were claimed.  From this we can deduce the turn number, which player made which moves, and win/draw status.
    let [history, setHistory] = useState(Array(0)); // console.log("History initialized to: " + history);
    // let [history, setHistory] = useState([2,3,4,5,1,7,6,11,33]);  // FOR DEV AND TESTING PURPOSES ONLY
    
    const boardStatus = getBoardStatus();

    // A "Line" defined here to mean a set of four squareIds that together constitute a win. There is a fived set of lineIds. 
    // Each Line has a unique id that serves as a KEY mapped to a VALUE that represents the number of claimed squares in that line (sort of)
    // The VALUE is a two-number tuple where the first number is the number of that line's squares claimed by playerOne and the second number is the number of squares claimed by playerTwo.
    
    // The linesList is an array where each element is a tuple of 4 squareIds that together constitute a win
    // const linesList = listAllLines(squaresPerCol, squaresPerRow);

    function totalNumberOfLines(c = squaresPerCol, r = squaresPerRow) {
        const totalNumberOfLines = (numberOfVerticalLines(c, r) + numberOfHorizontalLines(c, r) + numberOfUpslashLines(c, r) + numberOfDownslashLines(c, r));
        return totalNumberOfLines;
    }
    function numberOfVerticalLines(c = squaresPerCol, r = squaresPerRow) {
        const linesPerCol = (c - 4 >= 0) ? (c - 3) : 0;
        const numberOfVerticalLines = linesPerCol * r; 
        return numberOfVerticalLines;
    }
    function numberOfHorizontalLines(c = squaresPerCol, r = squaresPerRow) {
        const linesPerRow = (r - 4 >= 0) ? (r - 3) : 0;
        const numberOfHorizontalLines = linesPerRow * c; 
        return numberOfHorizontalLines;
    }
    function numberOfUpslashLines(c = squaresPerCol, r = squaresPerRow) {
        const linesPerCol = (c - 4 >= 0) ? (c - 3) : 0;  // The number of winning Lines in a column cannot be negative.
        const linesPerRow = (r - 4 >= 0) ? (r - 3) : 0;
        const numberOfUpslashLines = (linesPerCol * linesPerRow);
        return numberOfUpslashLines;
    }
    function numberOfDownslashLines(c = squaresPerCol, r = squaresPerRow) {  // Redundant: equal to numberOfUpslashLines
        const linesPerCol = (c - 4 >= 0) ? (c - 3) : 0;  // The number of winning Lines in a column cannot be negative.
        const linesPerRow = (r - 4 >= 0) ? (r - 3) : 0;
        const numberOfDownslashLines = (linesPerCol * linesPerRow);
        return numberOfDownslashLines;
    }

    function listAllLines(c = squaresPerCol, r = squaresPerRow) {
        const linesList = verticalLinesList().concat(horizontalLinesList()).concat(upslashLinesList()).concat(downslashLinesList())
        return linesList;
    }
    function verticalLinesList() {
        const squaresWhereVerticalLinesStart = allSquareIds().filter(squareId => isStartOfVerticalLine(squareId));
        const verticalLinesList = squaresWhereVerticalLinesStart.map(squareId => [squareId, squareId + 1, squareId + 2, squareId + 3]);
        console.log(`List of Vertical Lines: ${verticalLinesList}`);
        return verticalLinesList;
    }
    function horizontalLinesList() {
        const c = squaresPerCol;
        const squaresWhereHorizontalLinesStart = allSquareIds().filter(squareId => isStartOfHorizontalLine(squareId));
        // console.log(`List of Squares where Horizontal Lines start: ${squaresWhereHorizontalLinesStart}`);
        const horizontalLinesList = squaresWhereHorizontalLinesStart.map(squareId => [squareId, squareId + 1*c, squareId + 2*c, squareId + 3*c]);
        console.log(`List of Horizontal Lines: ${horizontalLinesList}`);
        return horizontalLinesList;
    }
    function upslashLinesList() {
        const c = squaresPerCol;
        const squaresWhereUpslashLinesStart = allSquareIds().filter(squareId => isStartOfUpslashLine(squareId));
        // console.log(`List of Squares where Upslash Lines start: ${squaresWhereUpslashLinesStart}`);
        const upslashLinesList = squaresWhereUpslashLinesStart.map(squareId => [squareId, squareId + 1 + c, squareId + 2 + 2 * c, squareId + 3 + 3 * c]);
        // console.log(`List of Horizontal Lines: ${horizontalLinesList}`);
        return upslashLinesList;
    }
    function downslashLinesList() {
        const c = squaresPerCol;
        const squaresWhereDownslashLinesStart = allSquareIds().filter(squareId => isStartOfDownslashLine(squareId));
        // console.log(`List of Squares where Downslash Lines start: ${squaresWhereDownslashLinesStart}`);
        const downslashLinesList = squaresWhereDownslashLinesStart.map(squareId => [squareId, squareId - 1 + c, squareId - 2 + 2 * c, squareId - 3 + 3 * c]);
        // console.log(`List of Downslash Lines: ${downslashLinesList}`);
        return downslashLinesList;
    }



    // BOOLEAN helpers  
    // Currently there is only a Square.js functional Component, however if I defined a Square Class I would think that I could turn these functions that take squareId as a parameter and turn them into something that 'reads better' like Square.isStartOfVerticalLine() written on the Square object so that it has built in access to the relevant squareId and can be used in a no-parameter fashion. ??? 
    function isStartOfVerticalLine(squareId) {
        // To check if a square is the start of a verticalLine we need its rowNumber and the height of each column (squaresPerCol).
        // If there are 3 MORE squares in the column above it then return TRUE, it is the start of a vertical Line.
        // rowNumber has 0-based indexing. If we are in the 0-th row then the minimum squaresPerCol that should return true is 4
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
        // To check if a square is the start of a horizontalLine we need its colNumber and the width of each row (squaresPerRow).
        // The Columns are rendered by the Board with 0-based indexing and the left-most column is column 'zero'.
        // HorizontalLines are defined as "starting" with their left-most square. If there are 3 MORE squares in the row to the right of it then return TRUE.
        // colNumber has 0-based indexing. If we are in the 0-th row then the minimum squaresPerCol that should return true is 4
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

    // Low-level SQUARE, ROW, COL helpers
    function getSquareIdByRowCol(row, col) {
        return (col * squaresPerCol + row);
    }
    function getRowBySquareId(id) {
        return (id % squaresPerCol);
    }
    function getColBySquareId(id) {
        return (Math.floor(id / squaresPerCol))
    }
    function allSquareIds(c = squaresPerCol, r = squaresPerRow) { // List of all squareIds to use with Array.filter()
        const totalSquares = c * r;
        let squareIdsList = Array(totalSquares).fill().map((_, i) => i);
        return squareIdsList;
    }


    // STATUS GETTERS for Board and Column
    function getBoardStatus(moveList = history) {
        // Recall that history is an array of squareIds in the order they were claimed.
        // console.log(`History being used by getBoardStatus: ${moveList}`)
        const boardStatus = Array(totalSquares).fill('empty');
        moveList.forEach((squareId, turnNumber) => {
            if (turnNumber % 2 === 0){
                boardStatus.splice(squareId, 1, 'player1') 
            }
            else {
                boardStatus.splice(squareId, 1, 'player2') 
            }
        });
        // console.log(`Board Status: ${boardStatus}`)
        return boardStatus;
    }
    function getColumnStatus(colNumber) {
        // Start with complete board status and slice out relevant column 
        const bottomSquareId = colNumber * squaresPerCol;
        const topSquareId = bottomSquareId + squaresPerCol;
        // getBoardStatus().slice
        const columnStatus = boardStatus.slice(bottomSquareId, topSquareId);
        return columnStatus;
    }
    function lowestEmptySquareInColumn(colNumber) {
        const status = getColumnStatus(colNumber);
        const lowestEmptyRow = status.indexOf('empty');
        let lowestEmptySquare = -1;
        // Returning -1 indicates "the requested column is Full."
        if (lowestEmptyRow !== -1) {
            lowestEmptySquare = squaresPerCol * colNumber + lowestEmptyRow;
        } 
        return lowestEmptySquare;
    }


    // STATUS GETTERS for Panel
    function getPanelStatus(moveList = history) {
        if (gameIsAlreadyOver()){
            if (playerOneWins()){
                return "Player One Wins!";
            }
            else if (playerTwoWins()) {
                return "Player Two Wins!";
            }
            else if (gameDrawn()) {
                return "Game Over. Draw.";
            }
        }
        else if (history.length % 2 === 0) {
            return "Player One's Turn";
        }
        else if (history.length % 2 === 1) {
            return "Player One's Turn";
        }
        else {
            console.console.error(`Invalid result in gameStatusForPanel()`);
            return 1;
        }
    }
    function gameIsAlreadyOver(moveList = history) {
        if (playerOneWins() || playerTwoWins() || gameDrawn()) {
            return true;  // Return true because the game is over.
        }
        else {
            return false;
        } 
    }
    function playerOneWins(moveList = history) {
        const playerOnesMoveList = moveList.filter((squareId, turnNumber) => turnNumber % 2 === 0);
        const squaresClaimedInEachLine = Array(totalNumberOfLines().fill(0));
        playerOnesMoveList.forEach(squareId => {
            
            
            // if (squareIdIsInLine(squareId, lineId)) {

            // }
        });
        

    }
    function playerTwoWins(moveList = history) {

    }
    function gameDrawn(moveList = history) {

    }
    
    function getMoveCountsInEachLine(moveList = history) {
        
    }
    function linesThatIncludeSquare(squareId){

    }
    function verticalLinesThatIncludeSquare(squareId) {

    }
    function verticalLinesThatIncludeSquare(squareId) {

    }


    
    
    // CLICK HANDLERS
    function handleColumnClick(colNumber) {
        const moveList = history.slice();
        console.log(`Handling Click for Column: ${colNumber} using history: ${moveList}`)
        if (lowestEmptySquareInColumn(colNumber) === -1  || gameIsAlreadyOver()){
            console.log(`Clicked column is already full!`)
            return -1;
        } 
        else {
            const updatedHistory = moveList.concat(lowestEmptySquareInColumn(colNumber));
            console.log(`About to setHistory to updatedHistory: ${updatedHistory}`)
            setHistory(updatedHistory)
            return 0;
        }
    }






    function validateId(id) {
        const totalSquares = squaresPerCol * squaresPerRow;
        if (id >= 0 && id < totalSquares) {
            return;
        }
        else {
            throw ("Error: Invalid Square Id Passed!")
        }
    }

    function newGame() {
        let cleanBoard = Array(totalSquares).fill('empty');
        setHistory([cleanBoard]);
        console.log("History array length: " + history.length);
        // setGameStatus('red');
    }
    function undoMove() {
        // let prevTurn = currentTurn - 1
        // setCurrentTurn(prevTurn);
        console.log("History array length unchanged by undo move: " + history.length);
        // setGameStatus((prevTurn % 2 === 0) ? 'red' : 'yellow');
    }






    // HELPERS for getPanelStatus()
    function checkForDraw(board) {
        // for (let i = 0; i < totalSquares; i++) {
        //     if (board[i] === 'open') {
        //         return false;
        //     }
        // }
        return true;
    }
    
    return (
        <Container
            className={classes.root}
            maxWidth='md'
        >
            <Navbar pageTitle={"Classic Connect Four"} />
            <Paper className={classes.paper} >
                
                <Board 
                    boardStatus= {boardStatus}
                    columnHeight= {6}
                    handleColumnClick={handleColumnClick}
                />

                <Panel 
                    // panelStatus={getPanelStatus()}
                    gameStatus="Status of Game"
                />

            </Paper>
        </Container>
    );
}





