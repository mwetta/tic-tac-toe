const gameBoard = (() => {
    'use strict';    

    const spaces = 
        [" ", " ", " ",
        " ", " ", " ",
        " ", " ", " "];
    
    let turn = 0;
    let currentPlayer = 'x';
    
    const boardSpaces = document.querySelectorAll('.space');
    const playerXTurn = document.querySelector('#x');
    const playerOTurn = document.querySelector('#o');

    const checkSpace = (spaceId) => {
    if (spaces[spaceId] == " ") {
        checkTurn(spaceId);
    } else {
        alert(`You can't play in that space`);
    }}

    boardSpaces.forEach((boardSpace) => {
        boardSpace.addEventListener('click', () => {
            turn++;
            checkSpace(boardSpace.id);
        })
    })

    const checkTurn = (spaceId) => {
        if (turn % 2 == 0 || turn == 0) {
            currentPlayer = 'x';
            setTurn(spaceId,currentPlayer);
        } else {
            currentPlayer = 'o';
            setTurn(spaceId, currentPlayer);
        }
    }

    const setTurn = (spaceId, currentPlayer) => {
        if (currentPlayer == 'x') {
            playerXTurn.classList.add("your-turn");
            playerOTurn.classList.remove("your-turn");
            // can you do this by checking for id, etc matches current player?
            markSpace(spaceId, currentPlayer)
        } else {
            playerOTurn.classList.add("your-turn");
            playerXTurn.classList.remove("your-turn");
            markSpace(spaceId, currentPlayer)
        }
    }

    const markSpace = (spaceId, currentPlayer) => {
       let currentPlay = document.getElementById(`${spaceId}`);
       currentPlay.textContent = `${currentPlayer}`;
       // this works to push to HTML but messes with the padding - need to troubleshoot CSS
    };

        
    return {markSpace, checkTurn};
})();

gameBoard.checkTurn();

const Player = () => {

}