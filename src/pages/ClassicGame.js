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
        border: 'solid red 1px',
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
        border: 'solid purple 1px',
        minWidth: '100px',
        minHeight: '450px',


        width: '100%',
        height: 'auto',
        maxHeight: '1280px',

        // backgroundColor: theme.palette.primary.light,
        backgroundColor: theme.palette.common.white,
        marginTop: '1.5rem',

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));


export default function ClassicGame(props) {
    const classes = useStyles();

    // Game Constants
    const squaresPerCol = props.squaresPerCol;
    const squaresPerRow = props.squaresPerRow;
    
    let totalSquares = squaresPerCol * squaresPerRow;

    let linesPerCol = (squaresPerCol - 4 >= 0) ? (squaresPerCol - 3) : 0;
    let linesPerRow = (squaresPerRow - 4 >= 0) ? (squaresPerRow - 3) : 0;

    let numberOfVerticalLines = linesPerCol * squaresPerRow;
    let numberOfHorizontalLines = linesPerRow * squaresPerCol;
    let numberOfUpslashLines = linesPerCol * linesPerRow;
    let numberOfDownslashLines = linesPerCol * linesPerRow;
    let totalNumberOfLines = numberOfVerticalLines + numberOfHorizontalLines + numberOfUpslashLines + numberOfDownslashLines;

    const lineIdToSquareIdsMap = props.lineIdToSquareIdsMap;     // The linesToSquaresMap has one Key:Value pair for each lineId to a four-element array containing the squareIds that make up that line.
    const squareIdToLineIdsMap = props.squareIdToLineIdsMap;     // The squaresToLinesMap has one Key:Value pair mapping each squareId to an array of the Lines that include that squarre. In classic 6x7 game this is at least 3 and at most 13 lines.

    
    // STATE INITIALIZING and UPDATING helpers
    let newGameMoveList = Array(0);
    let statusOnTurnZero = {
        "turnNumber": 0,
        "moveList": newGameMoveList,
        "boardStatus": Array(totalSquares).fill('empty'),
        "lineStatusMap": initialLineStatusMap(),
        "gameStatus": 'playerOneToMove'
    }
    
    // GAME'S STATE
    let [currentTurnNumber, setCurrentTurnNumber] = useState(0);  // Use the "turnStatus" Object stored at this index in the history Array.
    let [history, setHistory] = useState([statusOnTurnZero]); 

    
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
    
    
    // Board to Column Helpers    
    function getColumnStatus(colNumber, boardStatus) {
        // console.log(`getColumnStatus called for colNumber: ${colNumber} and boardStatus ${boardStatus}`)
        let fromSquareId = colNumber * squaresPerCol;
        let toSquareId = fromSquareId + squaresPerCol;
        // console.log(`getColumnStatus will slice boardStatus fromId: ${fromSquareId}   toId: ${toSquareId}`)
        let columnStatus = boardStatus.slice(fromSquareId, toSquareId);
        return columnStatus;
    }
    function lowestEmptySquareInCol(colStatus, colNumber) {
        // console.log(`lowestEmptySquareInCol recieved props colStatus: ${colStatus} and colNumber: ${colNumber}`)
        let lowestEmptyRow = colStatus.indexOf('empty');
        let lowestEmptySquare = -1;   // Returning -1 indicates "the requested column is Full."
        if (lowestEmptyRow !== -1) {
            lowestEmptySquare = getSquareIdByRowCol(lowestEmptyRow, colNumber)
        } 
        return lowestEmptySquare;
    }


    // Get VALUES for creating a Turn Status object. 
    function getBoardStatus(moveList) {
        let boardStatus = Array(totalSquares).fill('empty');
        moveList.forEach((squareId, turnNumber) => {
            if (turnNumber % 2 === 0) {
                boardStatus.splice(squareId, 1, 'playerOne')
            }
            else {
                boardStatus.splice(squareId, 1, 'playerTwo')
            }
        });
        // console.log(`Board Status: ${boardStatus}`)
        return boardStatus;
    }


    function getLineStatusMap(updatedMoveList) {
        let turnNumber = updatedMoveList.length;   // turnNumbers are 0-indexed! When it is turn 0 there is still one status object in the history
        if (turnNumber <= 0) {
            console.error(`Given that is is turn zero you probably meant to use initialLineStatusMap(), not getLineStatusMap() `);
            // return initialLineStatusMap()
        }
    
        let previousLineStatusMap = history[turnNumber - 1].lineStatusMap;  // Start with the Map from the PREVIOUS turn
        let updatedLineStatusMap = history[turnNumber - 1].lineStatusMap;   // Start with the Map from the PREVIOUS turn
        let mostRecentPlayer = (turnNumber % 2 === 1) ? "playerOne" : "playerTwo";
        let mostRecentSquareClaimed = updatedMoveList[turnNumber - 1];
        
        let linesToUpdate = squareIdToLineIdsMap.get(mostRecentSquareClaimed);
        linesToUpdate.forEach(lineId => {
            let previousLineStatus = previousLineStatusMap.get(lineId);
            let updatedLineStatus;
            if (mostRecentPlayer === "playerOne") {
                updatedLineStatus = {
                    'playerOne': ++previousLineStatus.playerOne,
                    'playerTwo': previousLineStatus.playerTwo,
                    'empty': --previousLineStatus.empty
                }
            }
            else if (mostRecentPlayer === "playerTwo") {
                updatedLineStatus = {
                    'playerOne': previousLineStatus.playerOne,
                    'playerTwo': ++previousLineStatus.playerTwo,
                    'empty': --previousLineStatus.empty
                }
            }
            else { console.error(`getLineStatusMap(moveList) is Broken.`) }
            updatedLineStatusMap.set(lineId, updatedLineStatus);
        });

        // TESTING
        console.log(`Testing getLineStatusMap for turnNumber ${turnNumber}.`)
        console.log(`mostRecentPlayer: ${mostRecentPlayer} just claimed square ${mostRecentSquareClaimed}`)
        // printLinesToStatusMap(updatedLineStatusMap)
        return updatedLineStatusMap;
    }


    function getGameStatus(turnNumber, lineStatusMap) {
        // console.log(`GET GAME STATUS recieved lineStatusMap: `)
        // printLinesToStatusMap(lineStatusMap);

        
        // There  are FIVE posssible Game Status values.  THREE cases where game is over.
        if (playerOneWins(lineStatusMap)){
            return 'playerOneWins';
        }
        else if (playerTwoWins(lineStatusMap)) {
            return 'playerTwoWins';
        }
        else if (gameDrawn(lineStatusMap)) {
            return 'gameDrawn';
        }
        else if (playerOneToMove(turnNumber) === true) {
            return 'playerOneToMove';
        }
        else if (playerOneToMove(turnNumber) === false) {
            return 'playerTwoToMove';
        }
        else {
            console.error(`Invalid result in getGameStatus`);
            return 1;
        }
    
        // Internally used Helper Functions
        function playerOneWins(lineStatusMap) {
            let playerOnesMoveCounts = [];
            lineStatusMap.forEach((lineStatus, lineId) => {
                playerOnesMoveCounts = playerOnesMoveCounts.concat(lineStatus.playerOne);
            });
            // console.log(`Player One Move Counts: ${playerOnesMoveCounts}`)
            return(playerOnesMoveCounts.includes(4))
        }
        function playerTwoWins(lineStatusMap) {
            let playerTwosMoveCounts = [];
            lineStatusMap.forEach((lineStatus, lineId) => {
                playerTwosMoveCounts = playerTwosMoveCounts.concat(lineStatus.playerTwo);
            });
            // console.log(`Player One Move Counts: ${playerOnesMoveCounts}`)
            return (playerTwosMoveCounts.includes(4))
        }
        function gameDrawn(lineStatusMap) {
            let playerOnesMoveCounts = [];
            lineStatusMap.forEach((lineStatus, lineId) => {
                playerOnesMoveCounts = playerOnesMoveCounts.concat(lineStatus.playerOne);
            });
        
            let playerTwosMoveCounts = [];
            lineStatusMap.forEach((lineStatus, lineId) => {
                playerTwosMoveCounts = playerTwosMoveCounts.concat(lineStatus.playerTwo);
            });
            // console.log(`Player One Move Counts: ${playerOnesMoveCounts}`)
            return (!playerOnesMoveCounts.includes(0) && !playerTwosMoveCounts.includes(0))
        }
        function playerOneToMove(turnNumber) {
            return (turnNumber % 2 === 0);
        }    
    }
    
    
    
    
    // CLICK HANDLERS
    function handleColumnClick(colNumber) {
        console.log(`handleColumnClick has been called with colNumber: ${colNumber} and currentTurnNumber: ${currentTurnNumber} `)
        
        let copyOfHistory = history.slice(0, currentTurnNumber + 1);
        let currentTurnStatus = copyOfHistory[currentTurnNumber];
        let status = currentTurnStatus.gameStatus;
        console.log(`Game Status before Handling Click : ${status}`)
        // There are TWO reasons we might Return Early: 
        // (1) Game already over, 
        let gameIsOver = (status === 'playerOneWins' || status === 'playerTwoWins' || status === 'gameDrawn')
        if (gameIsOver) {
            console.log(`Returning Early from handleClick() since Game is already over!`)
            return -1;
        }
        // (2) Clicked Column already full.
        let boardStatus = currentTurnStatus.boardStatus;
        let colStatus = getColumnStatus(colNumber, boardStatus);
        // console.log(`Calling lowestEmptySquareInCol with colStatus: ${colStatus} and colNumber: ${colNumber}`)
        let moveToAdd = lowestEmptySquareInCol(colStatus, colNumber);
        console.log(`lowestEmptySquareInCol found square id: ${moveToAdd}`)
        if (moveToAdd === -1) {
            console.log(`Clicked column is already full!`)
            return -1;
        }  
       
        let updatedMoveList = currentTurnStatus.moveList.concat(moveToAdd);
        let updatedTurnNumber = updatedMoveList.length;
        let updatedLineStatusMap = getLineStatusMap(updatedMoveList);
        let updatedGameStatus = getGameStatus(updatedTurnNumber, updatedLineStatusMap)
        let newTurnStatus = {
            "turnNumber": updatedMoveList.length,
            "moveList": updatedMoveList,
            "boardStatus": getBoardStatus(updatedMoveList),
            "lineStatusMap": updatedLineStatusMap,
            "gameStatus": updatedGameStatus
        }
        
        console.log(`About to add newTurnStatus to the History array: `);
        logTurnStatusObject(newTurnStatus);
        
        setHistory(history.concat(newTurnStatus));
        setCurrentTurnNumber(++currentTurnNumber);

        console.log(`Done Handling Click. It is now Turn Number ${currentTurnNumber} and the Game Status is: ${newTurnStatus.gameStatus}`);   // 

        // This is where we Would find and make the Computer Move if in Play vs. Computer Mode
        return 0;
    }

    function handleUndoButtonClick() {
        setCurrentTurnNumber(--currentTurnNumber);
    }

    function handleNewGameButtonClick() {
        setHistory([statusOnTurnZero]);
        setCurrentTurnNumber(0);
        console.log(`Starting a NEW GAME ***********`);
    }

    
    
    // PRINT TO CONSOLE FOR TESTING
    function logMapElement(value, key) {
        console.log(`Key lineId: ${key}   Value squareIdList: ${value}`);
    }
    function printLinesToStatusMap(map) {
        map.forEach((status, lineId) => {
            console.log(`LineId: ${lineId}  has status:  playerOne: ${status.playerOne}  playerTwo: ${status.playerTwo}  empty: ${status.empty}`);
        });
    }
    function logTurnStatusObject(object) {
        // console.log(`Turn Status Object:`);
        console.log(`turnNumber: ${object.turnNumber}`);
        console.log(`moveList: ${object.moveList}`);
        console.log(`boardStatus: omitted Array(42)`);
        // console.log(`lineStatusMap: ${printLinesToStatusMap(object.lineStatusMap)}`);
        console.log(`gameStatus: ${object.gameStatus}`);
    }
    function logLineStatusObject(object) {
        // console.log(`Turn Status Object:`);
        console.log(`playerOne: ${object.playerOne}`);
        console.log(`playerTwo: ${object.playerTwo}`);
        console.log(`empty: ${object.empty}`);
    }


    
    function initialLineStatusMap() {
        let lineStatusMap = new Map();
        for (let lineId = 0; lineId < totalNumberOfLines; lineId++) {
            let status = {
                'playerOne': 0,
                'playerTwo': 0,
                'empty': 4
            }
            lineStatusMap.set(lineId, status);
        }
        return lineStatusMap;
    }
    

    let currentBoardStatus = history[currentTurnNumber].boardStatus;
    
    
    return (
        <Container
            className={classes.root}
            maxWidth='md'
        >
            
            <Paper className={classes.paper} >
                
                <Board 
                    boardStatus={currentBoardStatus}
                    columnHeight={6}
                    handleColumnClick={handleColumnClick}
                    getColumnStatus={getColumnStatus}
                />

                <Panel 
                    turnNumber={currentTurnNumber}
                    gameStatus={history[currentTurnNumber].gameStatus}
                    handleUndoButtonClick={handleUndoButtonClick}
                    handleNewGameButtonClick={handleNewGameButtonClick}
                />

            </Paper>
        </Container>
    );
}





