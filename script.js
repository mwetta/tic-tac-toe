const gameBoard = (() => {
    let spaces = new Array(9).fill("");
    
    const boardSpaces = document.querySelectorAll('.space');
    boardSpaces.forEach((boardSpace) => {
        boardSpace.addEventListener('click', () => {
            let currentPlay = turnCounter.getCurrentPlayer();
            currentPlay.play(boardSpace.id, currentPlay.getSign());
        boardSpace.addEventListener('mouseout', () => {
            boardSpace.classList.remove("active");
            });
        boardSpace.addEventListener('mouseover', () => {
                boardSpace.classList.add("active");
            });
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

    const checkWin = (plays) => {
        if (plays > 4) {
            alert('No one wins. It\'s a tie.'); 
        } else {
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
    }

    const setNames = (playerX, playerO) => {
        let displayX = document.getElementById('player-x');
        let displayO = document.getElementById('player-o');

        displayX.textContent = playerX.getName();
        displayO.textContent = playerO.getName();

        turnCounter.setPlayers(playerX, playerO);
    }

    const resetSpaces = () => {
        spaces = new Array(9).fill("");
        boardSpaces.forEach((boardSpace) => {
            boardSpace.textContent = "";
        }) 
        resetNames();
    }

    const resetNames = () => {
        let playerXName = document.querySelector('#playerXName');
        let playerOName = document.querySelector('#playerOName');

        playerXName.value = "";
        playerOName.value="";
        turnCounter.resetTurn();
    }

    return {checkSpace, 
        checkWin,
        resetSpaces,
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
            gameBoard.checkWin(plays.length); 
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

    // combine checkTurn and setTurn?
    const checkTurn = () => {
        if (turn == 0 || turn % 2 == 0 ){
            currentPlayer = playerX;
            ++turn;
            setTurn(currentPlayer);
        } 
        else if (turn == 1) {
            currentPlayer = playerO; 
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

    const resetTurn = () => {
        turn = 0;
    }

    return {checkTurn, getCurrentPlayer, setTurn, setPlayers, resetTurn};
})();

const startGame = (() => {
    const modal = document.getElementById("newGame");
    const btn = document.getElementById("newGameBtn");
    const span = document.getElementsByClassName("close")[0];

    document.querySelector('#start').addEventListener('click', function() {
        modal.style.display= "none";
        createPlayers();
    });

    btn.onclick = function(){
        modal.style.display = "block";
        gameBoard.resetSpaces();
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
