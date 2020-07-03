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
        justifyContent: 'center'
        // backgroundColor: '#4AC9FD',
        // overflow: 'scroll',
    },
    paper: {
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

    // The ONLY mutable state in the Game is a list of the square id's that have been claimed in the order they were claimed.  From this we can deduce the turn number, which player made which moves, and win/draw status.
    let [history, setHistory] = useState(Array(0)); // console.log("History initialized to: " + history);
    // let [history, setHistory] = useState([2,3,4,5,1,7,6,11,33]);  // FOR DEV AND TESTING PURPOSES ONLY
    
    const boardStatus = getBoardStatus();

    // A "Line" defined here to mean a set of four squareIds that together constitute a win. There is a fixed set of lineIds. 
    // Each Line has a unique id that serves as a KEY mapped to a VALUE that represents the number of claimed squares in that line (sort of)
    // The VALUE is a two-number tuple where the first number is the number of that line's squares claimed by playerOne and the second number is the number of squares claimed by playerTwo.
    
    // The linesList is an array where each element is a tuple of 4 squareIds that together constitute a win
    // const linesList = allLinesList(squaresPerCol, squaresPerRow);

    // Game Constants
    const squaresPerCol = 6;
    const squaresPerRow = 7;
    function totalSquares() {
        return squaresPerCol * squaresPerRow;
    }


    const squareMap = getSquareMap();  // squareMap enables quick 
    function getSquareMap() {
        let map = new Map();
        for (let squareId = 0; squareId < totalSquares(); squareId++) {
            let ids = {
                'squareId': squareId,
                'col': getColBySquareId(squareId),
                'row': getRowBySquareId(squareId),
                'upslash': getUpslashBySquareId(squareId),
                'downslash': getDownslashBySquareId(squareId),
            }
            map.set(squareId, ids);
        }
        
        return map;
    }

    const lineMap = getLineMap();  // Maps each lineId to the set of squares in it.
    function getLineMap() {
        let map = new Map();
        
        map.set('vertical', Array(numberOfVerticalLines()))
        
        
        return map;
    }



    function linesPerCol() {
        const c = squaresPerCol;
        const linesPerCol = (c - 4 >= 0) ? (c - 3) : 0;
        return linesPerCol;
    }
    function linesPerRow() {
        const r = squaresPerRow;
        const linesPerRow = (r - 4 >= 0) ? (r - 3) : 0;
        return linesPerRow;
    }
    function linesInSlash(slashId) {
        // const linesPerRow = (r - 4 >= 0) ? (r - 3) : 0;
        // return linesPerRow;
    }
    
    function totalNumberOfLines(c = squaresPerCol, r = squaresPerRow) {
        const totalNumberOfLines = (numberOfVerticalLines(c, r) + numberOfHorizontalLines(c, r) + numberOfUpslashLines(c, r) + numberOfDownslashLines(c, r));
        return totalNumberOfLines;
    }
    function numberOfVerticalLines(c = squaresPerCol, r = squaresPerRow) {
        const numberOfVerticalLines = linesPerCol() * r; 
        return numberOfVerticalLines;
    }
    function numberOfHorizontalLines(c = squaresPerCol, r = squaresPerRow) {
        const linesPerRow = (r - 4 >= 0) ? (r - 3) : 0;
        const numberOfHorizontalLines = linesPerRow * c; 
        return numberOfHorizontalLines;
    }
    function numberOfUpslashLines(c = squaresPerCol, r = squaresPerRow) {
        return numberOfUpslashLines = (linesPerCol() * linesPerRow());
    }
    function numberOfDownslashLines(c = squaresPerCol, r = squaresPerRow) {  // Redundant: equal to numberOfUpslashLines
        return numberOfDownslashLines = (linesPerCol() * linesPerRow());
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

    // Low-level SQUARE helpers.  rowNumbers, colNumbers, upslashNumbers, and downslashNumbers are all 0-indexed
    // Each SQUARE belongs to exactly one row, one col, one upslash and one downslash.
    // Each SQUARE belongs to varying numbers of Lines.
    function getSquareIdByRowCol(row, col) {
        return (col * squaresPerCol + row);
    }
    function getRowBySquareId(id) {
        return (id % squaresPerCol);
    }
    function getColBySquareId(id) {
        return (Math.floor(id / squaresPerCol))
    }
    function getUpslashBySquareId(id) {
        const row = getRowBySquareId(id);
        const col = getColBySquareId(id);
        return (squaresPerCol - row + col - 1)
    }
    function getDownslashBySquareId(id) {
        const row = getRowBySquareId(id);
        const col = getColBySquareId(id);
        return (row + col)
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
        
        const moveCountsInEachLine = Array(totalNumberOfLines()).fill({
            'playerOne': 0,
            'playerTwo': 0
        });

        console.log(`Total number of Lines: ${totalNumberOfLines()} `)
        // console.log(`MoveCountsInEachLine:  `)
        // console.log(`player1: ${moveCountsInEachLine[0].playerOne}`)
        // console.log(`palyer2: ${moveCountsInEachLine[0].playerTwo}`)

        moveList.forEach((squareId, turnNumber) => {
            const linesToUpdate = linesThatIncludeSquare(squareId);
            console.log(`Number of Lines to update: ${linesToUpdate.length} `)
            // if (turnNumber % 2 === 0){
            //     linesToUpdate.forEach(lineId => {
            //         const prev = squaresClaimedInEachLine[lineId].playerOne;
            //         const increased = (prev+=1);
            //         squaresClaimedInEachLine[lineId].playerOne = increased;
            //     });
            // }
            // else if (turnNumber % 2 === 1) {
            //     linesToUpdate.forEach(lineId => {
            //         const prev = squaresClaimedInEachLine[lineId].playerTwo;
            //         const increased = (prev += 1);
            //         squaresClaimedInEachLine[lineId].playerTwo = increased;
            //     });
            // }
        });

    }
    
    
    function linesThatIncludeSquare(squareId){
        // Rather than trying to reinvent a way to get all the line Ids a square is in by getting all lines contents and filtering out those which do not include the square in question...
        // I will use low-level helpers and this observation
        let linesThatIncludeSquare = [];

        const colNumber = getColBySquareId(squareId);
        const rowNumber = getRowBySquareId(squareId);
        const upslashNumber = getUpslashBySquareId(squareId);
        const downslashNumber = getDownslashBySquareId(squareId);
        
        linesThatIncludeSquare = [
            getVerticalLinesThatIncludeSquare(squareId),
            getHorizontalLinesThatIncludeSquare(squareId)
        ]
        
        
        
        
        console.log(`Square ${squareId} is a part of Lines: ${linesThatIncludeSquare}`)

        return linesThatIncludeSquare;
    }
    
    
    
    // LINES are numbered according to the following scheme:
    // vert lines in 
    function getVerticalLinesThatIncludeSquare(squareId) {
        // Vertical lines are numbered starting from 0.
        let listOfLineNumbers = [];
        const colNumber = getColBySquareId(squareId);
        const firstLineNumber = colNumber * linesPerCol()

        for (let i = 0; i < numberOfVerticalLinesSquareIsIn(squareId); i++){
            let currentLineNumber = firstLineNumber + i;
            listOfLineNumbers = listOfLineNumbers.concat(currentLineNumber);
        }
        return listOfLineNumbers;
    }
    function getHorizontalLinesThatIncludeSquare(squareId) {
        // Horizontal lines are numbered starting from numberOfVerticalLines().
        let listOfLineNumbers = [];
        const rowNumber = getRowBySquareId(squareId);
        const firstLineNumber = numberOfVerticalLines() + rowNumber * linesPerRow()

        for (let i = 0; i < numberOfHorizontalLinesSquareIsIn(squareId); i++) {
            let currentLineNumber = firstLineNumber + i;
            listOfLineNumbers = listOfLineNumbers.concat(currentLineNumber);
        }
        return listOfLineNumbers;
    }
    function getUpslashLinesThatIncludeSquare(squareId) {
        // Upslash lines are numbered starting from numberOfVerticalLines() + numberOfHorizontalLines().
        let listOfLineNumbers = [];
        let slashNumber = getUpslashBySquareId(squareId);
        let squaresInSlash = squaresInSlash(slashNumber)
        
        // const firstLineNumber = numberOfVerticalLines() + numberOfHorizontalLines() + slashNumber * linesPerUpslash()

        // for (let i = 0; i < numberOfUpslashLinesSquareIsIn(squareId); i++) {
        //     let currentLineNumber = firstLineNumber + i;
        //     listOfLineNumbers = listOfLineNumbers.concat(currentLineNumber);
        // }
        return listOfLineNumbers;
    }
    function getDownslashLinesThatIncludeSquare(squareId) {

    }

    function numberOfVerticalLinesSquareIsIn(squareId) {
        // Every square is in at least one and at most four VerticalLines
        let row = getRowBySquareId(squareId)
        let distanceFromTop = squaresPerCol - row   // Min value = 1
        let distanceFromBottom = row + 1            // Min value = 1
        let min = (distanceFromTop < distanceFromBottom) ? distanceFromTop : distanceFromBottom
        return (min > 4) ? 4 : min;
    }
    function numberOfHorizontalLinesSquareIsIn(squareId) {
        // Every square is in at least one and at most four HorizontalLines
        let col = getColBySquareId(squareId)
        let distanceFromLeft = squaresPerRow - col      // Min value = 1
        let distanceFromRight = col + 1                 // Min value = 1
        let min = (distanceFromLeft < distanceFromRight) ? distanceFromLeft : distanceFromRight
        let numberOfHorizontalLinesSquareIsIn = (min > 4) ? 4 : min
        console.log(`numberOfHorizontalLinesSquareIsIn: ${numberOfHorizontalLinesSquareIsIn}`);
        return numberOfHorizontalLinesSquareIsIn;
    }
    function numberOfUpslashLinesSquareIsIn(squareId) {
        // Each square may be in zero upto four UpslashLines
        let col = getColBySquareId(squareId)
        
        
        let upslash = getUpslashBySquareId(squareId)

        // let squaresInSlash = 

        let distanceFromLeft = squaresPerRow - col      // Min value = 1
        let distanceFromRight = col + 1                 // Min value = 1
        let min = (distanceFromLeft < distanceFromRight) ? distanceFromLeft : distanceFromRight
        let numberOfHorizontalLinesSquareIsIn = (min > 4) ? 4 : min
        console.log(`numberOfHorizontalLinesSquareIsIn: ${numberOfHorizontalLinesSquareIsIn}`);
        return numberOfHorizontalLinesSquareIsIn;
    }



    
    
    // CLICK HANDLERS
    function handleColumnClick(colNumber) {
        const moveList = history.slice();
        console.log(`Handling Click for Column: ${colNumber} using history: ${moveList}`)
        
        getMoveCountsInEachLine();
        
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
    function handleUndoButtonClick() {
        const shortenedHistory = history.slice(0, history.length - 1)
        console.log(`handleUndoButtonClick() removed ${history[history.length - 1]} . New Shortened history: ${shortenedHistory}`);
        setHistory(shortenedHistory);
    }
    function handleNewGameButtonClick() {
        const empty = [];
        console.log(`History reset to: ${empty}`);
        setHistory(empty);
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
                    handleUndoButtonClick={handleUndoButtonClick}
                    handleNewGameButtonClick={handleNewGameButtonClick}
                />

            </Paper>
        </Container>
    );
}





