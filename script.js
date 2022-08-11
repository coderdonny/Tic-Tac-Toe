const Gameboard = (function () {
	gameboard = [];
})();

const Player = (name) => {
	const sayName = () => console.log(`my name is ${name}`);
	return { sayName };
};
