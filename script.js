//module for keeping track of the board positions
const Gameboard = (function () {
	const boardPositions = ['X', 'X', 'O', 'X', 'O', 'O', 'X', 'O', 'X'];

	return { boardPositions };
})();

//factory function for creating players
const Player = (name) => {
	const sayName = () => console.log(`my name is ${name}`);

	return { sayName };
};

const renderGameBoard = (function () {
	let cell = document.querySelectorAll('.cell');
	const update = () => {
		for (let i = 0; i < 9; i++) {
			cell[i].textContent = Gameboard.boardPositions[i];
		}
		console.log(`${Gameboard.boardPositions}`);
	};
	return { update };
})();

renderGameBoard.update();
