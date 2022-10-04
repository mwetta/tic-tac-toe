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
    return {checkSpace};
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
            checkWin(currentPlay);
        } else {
            turnCounter.checkTurn();
        }
    }

    // checkWin not working as implemented
    const checkWin = (currentPlay) => {
        console.log("Check for winner");
        console.log(currentPlay);
        switch (currentPlay) {
            case 0:
                if (plays.includes(1) == true && plays.includes(2) == true)
                {
                    console.log("Winner");
                };
            break;
        };
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
    }
    const createPlayerO = (name) => {
        playerO = Player(name, 'O');
        currentPlayer = playerO;
    }

    return {checkTurn, getCurrentPlayer};
})();

turnCounter.checkTurn();
