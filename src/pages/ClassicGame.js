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

    // The ONLY mutable state in the Game is a list of the square id's that have been claimed in the order they were claimed.  From this we can deduce the current turn number, which player made which moves, and win/draw status.
    let [history, setHistory] = useState(Array(0)); // console.log("History initialized to: " + history);
    // let [history, setHistory] = useState([2,3,4,5,1,7,6,11,33]);  // FOR DEV AND TESTING PURPOSES ONLY
    
    

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


    let boardStatus = getBoardStatus();

    // The completeLineMap has one Key:Value pair for each lineId to a four-element array containing the squareIds that make up that line.
    
    
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
        

    const squaresToLinesMap = getSquaresToLinesMap();
    function getSquaresToLinesMap() {
        let squaresToLinesMap = new Map();
        for (let squareId = 0; squareId < totalSquares; squareId++) {
            squaresToLinesMap.set(squareId, []);
        }
        
        
        completeLineMap().forEach((squareList, lineId) => {
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


    let linesToStatusMap = getLinesToStatusMap();
    function getLinesToStatusMap(moveList = history) {
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
        console.log(`Mapped each of the ${totalNumberOfLines} LineIds to its initial status: `)
        linesToStatusMap.forEach(logLineIdAndStatus);

        // HELPERS ONLY USED INTERNALLY 
        function logLineIdAndStatus(status, lineId) {
            console.log(`LineId: ${lineId}  has status:  playerOne: ${status.playerOne}  playerTwo: ${status.playerTwo}  empty: ${status.empty}`);
        }
        return squaresToLinesMap;
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
    
    



    // In squareMap these numbers ARE NOT LineIds, thye are colNumbers, rowNumbers, etc.
    // const squareMap = getSquareMap();  
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





