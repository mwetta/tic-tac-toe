
const gameBoard = (() => {
    const spaces = new Array(9).fill("");
    
    const boardSpaces = document.querySelectorAll('.space');
    boardSpaces.forEach((boardSpace) => {
        boardSpace.addEventListener('click', () => {
            let currentPlay = turnCounter.getCurrentPlayer();
            currentPlay.play(boardSpace.id, currentPlay.getSign());
        })
    })

    const checkSpace = (spaceId, sign) => {
        if (spaces[spaceId] == "") {
            markSpace(spaceId, sign)
        } else {
            alert(`You can't play in that space`);
        }}

    const markSpace = (spaceId, sign) => {
        let currentPlay = document.getElementById(`${spaceId}`);
        currentPlay.textContent = `${sign}`;
        setArray(spaceId, sign);
        }
    
    const setArray = (spaceId, currentPlayer) => {
        spaces[spaceId] = currentPlayer;
        let currentPlay = turnCounter.getCurrentPlayer();
        currentPlay.setArray(spaceId);
    }

    const winConditions = [
        [0, 1, 2],
        [3, 4, 5], 
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]
    ]

    const checkWin = () => {
        let currentPlayer= turnCounter.getCurrentPlayer();
        console.log(currentPlayer);
        let sign = currentPlayer.getSign();

        const checkConditions = winConditions.findIndex((winCondition) => {
           return winCondition.every((index) => {
                return (spaces[index] == sign)
            })
        });

        if (checkConditions > -1) {
            winner = currentPlayer;
            alert(`Game over. ${currentPlayer.getName()} wins.`)
        } else {
            turnCounter.checkTurn();
        } 
    }

    const setNames = (playerX, playerO) => {
        let displayX = document.getElementById('player-x');
        let displayO = document.getElementById('player-o');

        displayX.textContent = playerX.getName();
        displayO.textContent = playerO.getName();

        turnCounter.setPlayers(playerX, playerO);
    }

    return {checkSpace, 
        checkWin,
        resetSpaces() {spaces = new Array(9).fill("");},
        setNames
    };
})();

const Player =  (name, sign) => {
    const getName = () => name;
    const getSign = () => sign;

    const play = (spaceId, sign) => {
        gameBoard.checkSpace(spaceId, sign);
    }

    const setArray = (currentPlay) => {
        plays.push(currentPlay);
        if (plays.length >= 3) {
            console.log(plays);
            gameBoard.checkWin(); 
        } else {
            turnCounter.checkTurn();
        }
    }

    const plays = [];

    const getPlays = () => plays;

    return {play, getSign, getName, setArray, getPlays};
}

const turnCounter = (() =>{
    let turn = 0;
    let currentPlayer = undefined;
    let playerX;
    let playerO;

    const getCurrentPlayer = () => currentPlayer;
    const checkTurn = () => {
        if (turn == 0){
            currentPlayer = playerX;
            ++turn;
            setTurn(currentPlayer);
        } 
        else if (turn == 1){
            currentPlayer = playerO; 
            ++turn;
            setTurn(currentPlayer);
        }
        else if (turn % 2 == 0) {
            currentPlayer = playerX;
            ++turn;
            setTurn(currentPlayer);
        } else {
            currentPlayer = playerO;
            ++turn;
            setTurn(currentPlayer);
        }
    };

    const setPlayers = (playerXObj, playerOObj) =>{
        playerX = playerXObj;
        playerO = playerOObj;
        checkTurn();
    }

    const setTurn = (currentPlayer) => {
        const playerXTurn = document.querySelector('#x');
        const playerOTurn = document.querySelector('#o');

        if (currentPlayer.getSign() == 'X') {
            playerXTurn.classList.add("active");
            playerOTurn.classList.remove("active");
        } else if (currentPlayer.getSign() == 'O'){
            playerOTurn.classList.add("active");
            playerXTurn.classList.remove("active");
        }
    }

    return {checkTurn, getCurrentPlayer, setTurn, setPlayers};
})();

const startGame = (() => {
    // default on page load and on reset / new game
    const modal = document.getElementById("newGame");
    const btn = document.getElementById("newGameBtn");
    const span = document.getElementsByClassName("close")[0];

    document.querySelector('#start').addEventListener('click', function() {
        modal.style.display= "none";
        createPlayers();
    });
    btn.onclick = function(){
        modal.style.display = "block";
    }
    span.onclick = function() {
        modal.style.display = "none";
      }

    const createPlayers = () => {
        let playerXName = document.querySelector('#playerXName').value;
        let playerOName = document.querySelector('#playerOName').value;

        let playerX = Player(playerXName, 'X');
        let playerO = Player(playerOName, 'O');

        gameBoard.setNames(playerX, playerO)
    }
    return {createPlayers};
})();

// Global variables
