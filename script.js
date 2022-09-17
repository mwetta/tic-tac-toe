const gameBoard = (() => {
    'use strict';    

    const spaces = 
        [undefined, undefined, undefined,
        undefined, undefined, undefined,
        undefined, undefined, undefined];
    
    let turn = 0;
    
    const boardSpaces = document.querySelectorAll('.space');
    const playerXTurn = document.querySelector('#x');
    const playerOTurn = document.querySelector('#o');

    console.log(boardSpaces);

    const checkSpace = (spaceId) => {
    if (spaces[spaceId] == undefined) {
        checkTurn(spaceId);
    } else {
        alert(`You can't play in that space`);
    }}

    boardSpaces.forEach((boardSpace) => {
        boardSpace.addEventListener('click', () => {
            console.log(boardSpace.id);
            turn++;
            checkSpace(boardSpace.id);
        })
    })

    const checkTurn = () => {
        if (turn % 2 == 0 || turn == 0) {
            playerXTurn.classList.add("your-turn");
            playerOTurn.classList.remove("your-turn");
        } else {
            playerOTurn.classList.add("your-turn");
            playerXTurn.classList.remove("your-turn");
        }
    }

    const markSpace = () => {
    };

        
    return {markSpace, checkTurn};
})();

gameBoard.checkTurn();

const Player = () => {

}