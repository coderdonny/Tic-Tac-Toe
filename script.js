//query selectors for the gameboard and player selections
let cell = document.querySelectorAll('.cell');
const playerX = document.querySelector('.playerX');
const playerO = document.querySelector('.playerO');

const terminal = document.querySelector('.root');

const resetBtn = document.querySelector('.resetBtn');

//module function that stores all fundamental functions that make up the game
const Gameboard = (function () {
	let playerOne = '';
	let playerTwo = '';
	let isGameInitialized = false;
	let turn;
	let winner = false;

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
					const p = document.createElement('p');
					p.textContent = `> X goes first`;
					terminal.appendChild(p);
				}
			} else {
				playerO.setAttribute('id', 'playerTurn');
				playerOne = 'O';
				playerTwo = 'X';
				console.log('Player One is O');
				console.log('Player Two is X');
				const p = document.createElement('p');
				p.textContent = `> O goes first`;
				terminal.appendChild(p);
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
	let boardPositions = [null, null, null, null, null, null, null, null, null];
	//fills cell and enters players move into the boardPositions array
	const makeMove = (e) => {
		if (winner === true) {
			return;
		}
		if (!isGameInitialized) {
			console.log('Game is not initialized');
			const p = document.createElement('p');
			p.textContent = `> Player One, please choose X or O`;
			terminal.appendChild(p);
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
				const p = document.createElement('p');
				p.textContent = `> ${turn} chose cell ${target.dataset.cellNumber}`;
				terminal.appendChild(p);
				if (playerX.hasAttribute('id', 'playerTurn')) {
					playerX.removeAttribute('id', 'playerTurn');
					playerO.setAttribute('id', 'playerTurn');
				} else if (playerO.hasAttribute('id', 'playerTurn')) {
					playerO.removeAttribute('id', 'playerTurn');
					playerX.setAttribute('id', 'playerTurn');
				}
			}
		}
		isWinner();
	};
	for (let i = 0; i < 9; i++) {
		cell[i].addEventListener('click', makeMove);
	}

	const isWinner = () => {
		const winningCombinations = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];

		for (let j = 0; j < 8; j++) {
			let combo = winningCombinations[j];
			let x = 0;
			let o = 0;
			for (let i = 0; i < 3; i++) {
				let index = combo[i];
				if (boardPositions[index] === 'X') {
					x++;
					if (x === 3) {
						console.log('X is Winner');
						const p = document.createElement('p');
						p.textContent = `> ${turn} is the winner! The winning line is: [${combo}]`;
						terminal.appendChild(p);
						winner = true;
						cell[combo[0]].setAttribute('id', 'cellLine');
						cell[combo[1]].setAttribute('id', 'cellLine');
						cell[combo[2]].setAttribute('id', 'cellLine');
						playerO.removeAttribute('id', 'playerTurn');
						playerX.removeAttribute('id', 'playerTurn');
					}
				} else if (boardPositions[index] === 'O') {
					o++;
					if (o === 3) {
						console.log('O is Winner');
						const p = document.createElement('p');
						p.textContent = `> ${turn} is the winner! The winning line is: [${combo}]`;
						terminal.appendChild(p);
						winner = true;
						cell[combo[0]].setAttribute('id', 'cellLine');
						cell[combo[1]].setAttribute('id', 'cellLine');
						cell[combo[2]].setAttribute('id', 'cellLine');
						playerX.removeAttribute('id', 'playerTurn');
						playerO.removeAttribute('id', 'playerTurn');
					}
				}
			}
		}
	};

	//updates and renders the game UI every time a move is made
	const update = () => {
		for (let i = 0; i < 9; i++) {
			cell[i].textContent = boardPositions[i];
		}
	};

	//resets gameboard to allow new game
	const reset = () => {
		console.log('reset button clicked');
		boardPositions = [null, null, null, null, null, null, null, null, null];
		for (let i = 0; i < 9; i++) {
			cell[i].textContent = '';
			cell[i].removeAttribute('id', 'cellLine');
		}
		playerOne = '';
		playerTwo = '';
		isGameInitialized = false;
		turn = '';
		winner = false;
		while (terminal.lastElementChild) {
			terminal.removeChild(terminal.lastElementChild);
		}
		playerX.removeAttribute('id', 'playerTurn');
		playerO.removeAttribute('id', 'playerTurn');
		console.log(boardPositions);
	};

	resetBtn.addEventListener('click', reset);

	console.log(boardPositions);

	return { update, isWinner };
})();

Gameboard.update();
