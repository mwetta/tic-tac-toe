
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

    return {checkSpace, 
        checkWin,
        resetSpaces() {spaces = new Array(9).fill("");} 
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
    } // add to event listener

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