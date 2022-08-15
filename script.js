const playerX = document.querySelector('.playerX');
const playerO = document.querySelector('.playerO');

//player One chooses X or O
const initializeGame = (function () {
	playerX.dataset.pick = '';
	playerO.dataset.pick = '';

	const choice = (e) => {
		if (!(playerX.dataset.pick === '' && playerO.dataset.pick === '')) {
			return;
		}
		if (
			e.target.classList.contains('playerX') &&
			playerX.dataset.pick === ''
		) {
			Player.playerOne = 'X';
			playerX.dataset.pick = 'playerOne';

			Player.playerTwo = 'O';
			playerO.dataset.pick = 'playerTwo';

			console.log('Player One chose X');
		} else {
			Player.playerOne = 'O';
			playerO.dataset.pick = 'playerOne';

			Player.playerTwo = 'X';
			playerX.dataset.pick = 'playerTwo';

			console.log('Player One chose O');
		}
	};

	const isGameInitialized = () => {
		if (!(playerX.dataset.pick === '' && playerO.dataset.pick === '')) {
			return true;
		} else {
			return false;
		}
	};

	playerX.addEventListener('click', choice);
	playerO.addEventListener('click', choice);

	return { isGameInitialized };
})();

//module for keeping track of the board positions
const Gameboard = (function () {
	// const boardPositions = ['X', 'X', 'O', 'X', 'O', 'O', 'X', 'O', 'X'];
	const boardPositions = [
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
	];

	return { boardPositions };
})();

//function for keeping track of players
const Player = () => {
	return { playerOne, playerTwo };
};

let cell = document.querySelectorAll('.cell');

//updates the game UI when player makes a move
const renderGameBoard = (function () {
	const update = () => {
		for (let i = 0; i < 9; i++) {
			cell[i].textContent = Gameboard.boardPositions[i];
		}
		console.log(`${Gameboard.boardPositions}`);
	};
	return { update };
})();

//controls who's turn it is and sends the move to Gameboard
const gameControl = (function () {
	const playerTurn = () => {};

	const makeMove = (e) => {
		if (initializeGame.isGameInitialized()) {
			const target = e.target;
			target.textContent = 'X';
			Gameboard.boardPositions.splice(
				target.dataset.cellNumber,
				1,
				Player.playerOne
			);
		} else {
			console.log('Game has not been initialized');
			return;
		}
	};

	for (let i = 0; i < 9; i++) {
		cell[i].addEventListener('click', makeMove);
	}
})();

renderGameBoard.update();
