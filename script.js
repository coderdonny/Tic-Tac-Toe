//query selectors for the gameboard and player selections
let cell = document.querySelectorAll('.cell');
const playerX = document.querySelector('.playerX');
const playerO = document.querySelector('.playerO');

//module function that stores all fundamental functions that make up the game
const Gameboard = (function () {
	let playerOne = '';
	let playerTwo = '';
	let isGameInitialized = false;
	let turn;

	//Player one chooses 'X' or 'O'
	const initializeGame = (e) => {
		const target = e.target;
		if (!(playerOne === '' && playerTwo === '')) {
			console.log('Game has already been initialized');
			return;
		} else {
			if (target.classList.contains('playerX')) {
				if (playerOne === '') {
					playerX.setAttribute('id', 'playerTurn');
					playerOne = 'X';
					playerTwo = 'O';
					console.log('Player One is X');
					console.log('Player Two is O');
				}
			} else {
				playerO.setAttribute('id', 'playerTurn');
				playerOne = 'O';
				playerTwo = 'X';
				console.log('Player One is O');
				console.log('Player Two is X');
			}
			isGameInitialized = true;
		}
	};
	playerX.addEventListener('click', initializeGame);
	playerO.addEventListener('click', initializeGame);

	//keeps track of players turn
	const toggleTurn = () => {
		if (turn === playerOne) {
			turn = playerTwo;
		} else {
			turn = playerOne;
		}
		return turn;
	};

	//stores players positions
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
	//fills cell and enters players move into the boardPositions array
	const makeMove = (e) => {
		if (!isGameInitialized) {
			console.log('Game is not initialized');
		} else {
			const target = e.target;
			if (target.textContent === 'X' || target.textContent === 'O') {
				return;
			} else {
				target.textContent = toggleTurn();
				boardPositions.splice(
					target.dataset.cellNumber,
					1,
					target.textContent
				);
				if (playerX.hasAttribute('id', 'playerTurn')) {
					playerX.removeAttribute('id', 'playerTurn');
					playerO.setAttribute('id', 'playerTurn');
				} else if (playerO.hasAttribute('id', 'playerTurn')) {
					playerO.removeAttribute('id', 'playerTurn');
					playerX.setAttribute('id', 'playerTurn');
				}
			}
		}
	};
	for (let i = 0; i < 9; i++) {
		cell[i].addEventListener('click', makeMove);
	}

	//updates and renders the game UI every time a move is made
	const update = () => {
		for (let i = 0; i < 9; i++) {
			cell[i].textContent = boardPositions[i];
		}
	};
	console.log(boardPositions);
	return { update };
})();

Gameboard.update();
