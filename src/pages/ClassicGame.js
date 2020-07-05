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

    // A "Line" is defined as a set of four squareIds that together constitute a win. There is a fixed set of lineIds. 
    // There are four 'types' of Line: 'vertical', 'horizontal', 'upslash', 'downslash'
    // Each Line has a unique id. Id's are unique even across types. 
    
    // Game Constants
    const squaresPerCol = 6;
    const squaresPerRow = 7;
    let totalSquares = squaresPerCol * squaresPerRow;
    
    let linesPerCol = (squaresPerCol - 4 >= 0) ? (squaresPerCol - 3) : 0;
    let linesPerRow = (squaresPerRow - 4 >= 0) ? (squaresPerRow - 3) : 0;
    
    
    let numberOfVerticalLines = linesPerCol * squaresPerRow;
    let numberOfHorizontalLines = linesPerRow * squaresPerCol;
    let numberOfUpslashLines = linesPerCol * linesPerRow;
    let numberOfDownslashLines = linesPerCol * linesPerRow;
    let totalNumberOfLines = numberOfVerticalLines + numberOfHorizontalLines + numberOfUpslashLines + numberOfDownslashLines;
    
    // console.log(`numberOfVerticalLines: ${numberOfVerticalLines}`)
    // console.log(`numberOfHorizontalLines: ${numberOfHorizontalLines}`)
    // console.log(`numberOfUpslashLines: ${numberOfUpslashLines}`)
    // console.log(`numberOfDownslashLines: ${numberOfDownslashLines}`)
    // console.log(`totalNumberOfLines: ${totalNumberOfLines}`)

    
    // The linesToSquaresMap has one Key:Value pair for each lineId to a four-element array containing the squareIds that make up that line.
    const linesToSquaresMap = completeLineMap();
    function completeLineMap() {
        let completeMap = new Map();

        // In the final map there will be 69 keys (for 6x7 grid) 
        let partialMaps = [verticalLineMap(), horizontalLineMap(), upslashLineMap(), downslashLineMap()]

        partialMaps.forEach(partialMap => {
            partialMap.forEach((squareIdList, lineId) => {
                completeMap.set(lineId, squareIdList);
            });
        })

        // PRINT TO CONSOLE FOR TESTING
        // console.log(`Generated Complete Line Map with ${completeMap.size} key-value pairs.`)
        // completeMap.forEach(logMapElements);

        // HELPERS ONLY USED INTERNALLY 
        function logMapElements(squareIdList, lineId) {
            console.log(`Key lineId: ${lineId}   Value squareIdList: ${squareIdList}`);
        }
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
        
    // The squaresToLinesMap has one Key:Value pair mapping each squareId to an array of the Lines that include that squarre. In classic 6x7 game this is at least 3 and at most 13 lines.
    const squaresToLinesMap = getSquaresToLinesMap();
    function getSquaresToLinesMap() {
        let squaresToLinesMap = new Map();
        for (let squareId = 0; squareId < totalSquares; squareId++) {
            squaresToLinesMap.set(squareId, []);
        }
        
        linesToSquaresMap.forEach((squareList, lineId) => {
        // completeLineMap().forEach((squareList, lineId) => {
            squareList.forEach(squareId => {
                let oldLineList = squaresToLinesMap.get(squareId);
                let updatedLineList = oldLineList.concat(lineId);
                squaresToLinesMap.set(squareId, updatedLineList);
            })
        })
        
        // PRINT TO CONSOLE FOR TESTING
        // console.log(`Mapped each of the ${squaresToLinesMap.size} SquareIds to the Lines that include them:`)
        // squaresToLinesMap.forEach(logMapElements);

        // HELPERS ONLY USED INTERNALLY 
        function logMapElements(lineIdList, squareId) {
            console.log(`SquareId: ${squareId}   includes the lines: ${lineIdList}`);
        }
        return squaresToLinesMap;
    }

    // GAME STATE
    // The minimum required mutable state is a list of the square id's that have been claimed in the order they were claimed.  From this we can deduce the current turn number, which player made which moves, and win/draw status.
    
    let [currentTurnNumber, setCurrentTurnNumber] = useState(0);
    
    let [history, setHistory] = useState(initializeHistory()); // console.log("History initialized to: " + history);
    // let [linesToStatusMap, setLinesToStatusMap] = useState(initializeLinesToStatusMap());   // Optionally, I am including the linesToStatusMap as state to save recalculating it entirely each time it is updated
    // let [gameStatus, setGameStatus] = useState('notOver');
    
    
    function initializeHistory() {
        // History is initially a one element array holding a "turnStatus" object consisting of 4 keys: "moveList" "boardStatus" "lineStatusMap" and a "gameStatus"
        [{
            "moveList": [],
            "boardStatus": Array(totalSquares).fill('empty') "lineStatusMap" and a "gameStatus"
        }]
    }
    
    
    function initializeLinesToStatusMap() {
        let linesToStatusMap = new Map();
        for (let lineId = 0; lineId < totalNumberOfLines; lineId++) {
            let status = {
                'playerOne': 0,
                'playerTwo': 0,
                'empty': 4
            }
            linesToStatusMap.set(lineId, status);
        }
        // PRINT TO CONSOLE FOR TESTING
        // console.log(`Mapped each of the ${totalNumberOfLines} LineIds to its INITIAL status: `)
        // printLinesToStatusMap(linesToStatusMap);
        
        return linesToStatusMap;
    }
    // PRINT TO CONSOLE FOR TESTING
    function printLinesToStatusMap(map = linesToStatusMap) {
        map.forEach((status, lineId) => {
            console.log(`LineId: ${lineId}  has status:  playerOne: ${status.playerOne}  playerTwo: ${status.playerTwo}  empty: ${status.empty}`);
        });
        return "......"
    }

    function updateLinesToStatusMap(moveList) {
        let newestMove = moveList[moveList.length - 1]
        let copyOfLinesToStatusMap = linesToStatusMap;
        let playerOneMadeTheNewestMove = (moveList.length % 2 === 1);
        console.log(`Updating LinesToStatusMap since ${(playerOneMadeTheNewestMove) ? 'Player One' : 'Player Two'} is claiming square ${newestMove}... `)
        
        let linesToUpdate = getSquaresToLinesMap().get(newestMove);  // This SHOULD return an array of all the ids of the lines the newMove will affect
        
        linesToUpdate.forEach(lineId => {
            let currentStatus = copyOfLinesToStatusMap.get(lineId);
            let updatedPlayerOneCount = currentStatus.playerOne;
            let updatedPlayerTwoCount = currentStatus.playerTwo;
            let updatedEmptyCount = (currentStatus.empty - 1);
            if (playerOneMadeTheNewestMove) {
                updatedPlayerOneCount++;
            }
            else {
                updatedPlayerTwoCount++;
            }
            let updatedStatus = {
                'playerOne': updatedPlayerOneCount,
                'playerTwo': updatedPlayerTwoCount,
                'empty': updatedEmptyCount
            }
            copyOfLinesToStatusMap.set(lineId, updatedStatus);
            
        });
        // PRINT TO CONSOLE FOR TESTING
        console.log(`Mapped each of the ${totalNumberOfLines} LineIds to its UPDATED status after adding move ${newestMove}: `)
        printLinesToStatusMap(copyOfLinesToStatusMap);
        
        setLinesToStatusMap(copyOfLinesToStatusMap);
        return 0;
    }


    // BOOLEAN helpers  
    // Currently there is only a Square.js functional Component, however if I defined a Square Class I would think that I could turn these functions that take squareId as a parameter and turn them into something that 'reads better' like Square.isStartOfVerticalLine() written on the Square object so that it has built in access to the relevant squareId and can be used in a no-parameter fashion. ??? 
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
    

    // STATUS GETTERS for Board and Column
    function getBoardStatus(moveList = history) {
        // Recall that history is an array of squareIds in the order they were claimed.
        // console.log(`History being used by getBoardStatus: ${moveList}`)
        let boardStatus = Array(totalSquares).fill('empty');
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
        const columnStatus = getBoardStatus().slice(bottomSquareId, topSquareId);
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
    function updateGameStatus() {
        if (gameIsOver()){
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
    function gameIsOver(moveList = history) {
        if (playerOneWins() || playerTwoWins() || gameDrawn()) {
            return true;  // Return true because the game is over.
        }
        else {
            return false;
        } 
    }
    function playerOneWins() {
        

    }
    function playerTwoWins(moveList = history) {

    }
    function gameDrawn(moveList = history) {

    }
    
    
    
    
    // CLICK HANDLERS
    function handleColumnClick(colNumber) {
        let moveList = history.slice();
        let newMove = lowestEmptySquareInColumn(colNumber);
        console.log(`Handling Click for Column: ${colNumber} using old history: ${moveList}. Attempting move ${newMove}`)
        
        if (gameIsOver()) {
            console.log(`Game is already over!`)
            return -1;
        }
        else if (newMove === -1){
            console.log(`Clicked column is already full!`)
            return -1;
        }  
        else {
            let updatedHistory = moveList.concat(newMove);
            console.log(`About to setHistory to updatedHistory: ${updatedHistory}`)
            setHistory(updatedHistory);
            updateLinesToStatusMap(updatedHistory);
        }
        if (gameIsOver()) {
            console.log(`Game is now over!`)
            
        }
        // else {} This is where we Would find and make the Computer Move if in Play vs. Computer Mode
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




    
    return (
        <Container
            className={classes.root}
            maxWidth='md'
        >
            <Navbar pageTitle={"Classic Connect Four"} />
            <Paper className={classes.paper} >
                
                <Board 
                    boardStatus={getBoardStatus()}
                    columnHeight= {6}
                    handleColumnClick={handleColumnClick}
                    getColumnStatus={getColumnStatus}
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





