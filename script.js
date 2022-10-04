const gameBoard = (() => {
    const spaces = 
    [" ", " ", " ",
    " ", " ", " ",
    " ", " ", " "];

    const boardSpaces = document.querySelectorAll('.space');
    boardSpaces.forEach((boardSpace) => {
        boardSpace.addEventListener('click', () => {
            let currentPlay = turnCounter.getCurrentPlayer();
            currentPlay.play(boardSpace.id, currentPlay.getSign());
        })
    })

    const checkSpace = (spaceId, sign) => {
        if (spaces[spaceId] == " ") {
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

    const checkWin = () => {
        let winner;
        if(spaces[0] === spaces[1] && spaces[1] === spaces[2]){
            winner = turnCounter.getCurrentPlayer();
            setWinner(winner);
        } else if(spaces[3] === spaces[4] && spaces[4] === spaces[5]) {
            winner = turnCounter.getCurrentPlayer();
            setWinner(winner);
        } else if (spaces[6] === spaces[7] && spaces[7] === spaces[8]) {
            winner = turnCounter.getCurrentPlayer();
            setWinner(winner);
        }
        else if (spaces[0] === spaces[4] && spaces[4] === spaces[8]) {
            winner = turnCounter.getCurrentPlayer();
            setWinner(winner);
        }
        else if (spaces[2] === spaces[4] && spaces[4] === spaces[6]) {
            winner = turnCounter.getCurrentPlayer();
            setWinner(winner);
        }
        else if (spaces[0] === spaces[3] && spaces[3] === spaces[6]) {
            winner = turnCounter.getCurrentPlayer();
            setWinner(winner);
        }
        else if (spaces[1] === spaces[4] && spaces[4] === spaces[7]) {
            winner = turnCounter.getCurrentPlayer();
            setWinner(winner);
        }
        else if (spaces[2] === spaces[5] && spaces[5] === spaces[8]) {
            winner = turnCounter.getCurrentPlayer();
            setWinner(winner);
        } else {
            turnCounter.checkTurn();
        };
    }

    const setWinner = (winner) => {
        alert(`Game is over. Player ${winner.getName()} won`);
    };

    return {checkSpace, checkWin};
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

    return {play, getSign, getName, setArray};
}

const turnCounter = (() =>{
    let turn = 0;
    let currentPlayer = undefined;
    let playerX;
    let playerO;
    const getCurrentPlayer = () => currentPlayer;
    const checkTurn = () => {
        if (turn == 0){
            let nameX = prompt("What's your name?");
            ++turn;
            createPlayerX(`${nameX}`);
        } 
        else if (turn == 1){
            nameO = prompt("What's your name?");
            ++turn;
            createPlayerO(`${nameO}`);
        }
        else if (turn % 2 == 0) {
            currentPlayer = playerX;
            ++turn;
        } else {
            currentPlayer = playerO;
            ++turn;
        }
    };
    const createPlayerX = (name) => {
        playerX = Player(name, 'X');
        currentPlayer = playerX;
        setName(name, 'player-x');
    }
    const createPlayerO = (name) => {
        playerO = Player(name, 'O');
        currentPlayer = playerO;
        setName(name, 'player-o');
    }

    const setName = (name, id) => {
        let nameDisplay = document.getElementById(`${id}`);
        nameDisplay.textContent = `${name}`
        setTurn(currentPlayer);
    }

    setTurn = (currentPlayer) => {
        const playerXTurn = document.querySelector('#x');
        const playerOTurn = document.querySelector('#o');

        if (currentPlayer == playerX){
            playerXTurn.classList.add("active");
            playerOTurn.classList.remove("active");
        } else if (currentPlayer == playerO){
            playerOTurn.classList.add("active");
            playerXTurn.classList.remove("active");
        }
    }

    return {checkTurn, getCurrentPlayer};
})();

turnCounter.checkTurn();
