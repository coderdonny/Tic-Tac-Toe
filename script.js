let cell = document.querySelectorAll('.cell');
let playerX = document.querySelector('.playerX');
let playerO = document.querySelector('.playerO');

const Gameboard = (function () {
	// const boardPositions = ['X', 'X', 'O', 'X', 'O', 'O', 'X', 'O', 'X'];
	let playerOne = '';
	let playerTwo = '';
	let isGameInitialized = false;
	let turn = playerOne;

	const initializeGame = (e) => {
		const target = e.target;
		if (!(playerOne === '' && playerTwo === '')) {
			return;
		} else {
			if (target.classList.contains('playerX')) {
				if (playerOne === '') {
					playerOne = 'X';
					playerTwo = 'O';
					console.log('Player One is X');
					console.log('Player Two is O');
				}
			} else {
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

	const toggleTurn = () => {
		if (turn === playerOne) {
			turn = playerTwo;
		} else {
			turn = playerOne;
		}
		return turn;
	};

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

	const makeMove = (e) => {
		if (!isGameInitialized) {
			console.log('Game is not initialized');
		} else {
			const target = e.target;
			target.textContent = toggleTurn();
			boardPositions.splice(
				target.dataset.cellNumber,
				1,
				target.textContent
			);
		}
	};
	for (let i = 0; i < 9; i++) {
		cell[i].addEventListener('click', makeMove);
	}

	const update = () => {
		for (let i = 0; i < 9; i++) {
			cell[i].textContent = boardPositions[i];
		}
	};
	console.log(boardPositions);

	return { update };
})();

Gameboard.update();
