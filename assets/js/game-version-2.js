const miModulo = (() => {
	"use strict";

	let deck = [];
	const tipos = ["C", "D", "H", "S"];
	const especiales = ["A", "J", "Q", "K"];

	// let puntosJugador = 0;
	// let puntosComputadora = 0;

	let puntosJugadores = [];

	// Referencias del HTML
	const btnNuevo = document.querySelector("#btnNuevo");
	const btnPedir = document.querySelector("#btnPedir");
	const btnDetener = document.querySelector("#btnDetener");

	// const divCartasJugador = document.querySelector("#player-cards");
	// const divCartasCpu = document.querySelector("#cpu-cards");

	const divCartasJugadores = document.querySelectorAll(".divCartas");

	const puntosHTML = document.querySelectorAll("small");

	// Inicia el Juego
	const inicializarJuego = (numJugadores = 2) => {
		deck = crearDeck();
		puntosJugadores = [];
		for (let i = 0; i < numJugadores; i++) {
			puntosJugadores.push(0);
		}
		// deck = [];
		// deck = crearDeck();
		// puntosJugador = 0;
		// puntosComputadora = 0;

		puntosHTML.forEach((elem) => (elem.innerText = 0));
		divCartasJugadores.forEach((elem) => (elem.innerHTML = ""));
		// puntosHTML[0].innerText = 0;
		// puntosHTML[1].innerText = 0;
		// divCartasCpu.innerHTML = "";
		// divCartasJugador.innerHTML = "";
		btnPedir.disabled = false;
		btnDetener.disabled = false;
	};

	// Esta función crea un nuevo deck
	const crearDeck = () => {
		deck = [];
		for (let i = 2; i <= 10; i++) {
			for (let tipo of tipos) {
				deck.push(i + tipo);
			}
		}

		for (let tipo of tipos) {
			for (let esp of especiales) {
				deck.push(esp + tipo);
			}
		}
		//console.log(deck);
		// deck = _.shuffle(deck);
		// console.log(deck);
		// return deck;
		return _.shuffle(deck);
	};

	// crearDeck();

	// Esta función me permite tomar una carta
	const pedirCarta = () => {
		if (deck.length === 0) {
			throw "No hay cartas en el deck";
		}
		//const carta = deck.pop();
		// console.log(carta);
		//return carta;
		return deck.pop();
	};

	//pedirCarta();

	// Valor de las cartas
	const valorCarta = (carta) => {
		const valor = carta.substring(0, carta.length - 1);
		return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
	};

	// const valor = valorCarta(pedirCarta());
	// console.log({ valor });

	// Turno 0: Primer Jugador y el ultimo es CPU
	const acumularPuntos = (carta, turno) => {
		puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
		puntosHTML[turno].innerText = puntosJugadores[turno];
		return puntosJugadores[turno];
	};

	const crearCarta = (carta, turno) => {
		const imgCarta = document.createElement("img");
		imgCarta.src = `assets/cartas/${carta}.png`;
		imgCarta.classList.add("cpu-card", "h-100");
		divCartasJugadores[turno].append(imgCarta);
		// divCartasCpu.append(imgCarta);
	};

	const determinarGanador = () => {
		const [puntosMinimos, puntosComputadora] = puntosJugadores;

		setTimeout(() => {
			if (puntosComputadora === puntosMinimos) {
				alert("Nadie gana :c");
			} else if (puntosMinimos > 21) {
				alert("Cpu Gana");
			} else if (puntosComputadora > 21) {
				alert("Juador Gana");
			} else {
				alert("Cpu Gana");
			}
		}, 100);
	};

	//Lógica CPU
	const turnoComputadora = (puntosMinimos) => {
		let puntosComputadora = 0;
		do {
			const carta = pedirCarta();
			puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
			crearCarta(carta, puntosJugadores.length - 1);

			// puntosComputadora += valorCarta(carta);
			// puntosHTML[1].innerText = puntosComputadora;

			// const imgCarta = document.createElement("img");
			// imgCarta.src = `assets/cartas/${carta}.png`;
			// imgCarta.classList.add("cpu-card", "h-100");
			// divCartasCpu.append(imgCarta);
			// if (puntosMinimos > 21) {
			// 	break;
			// }
		} while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

		// setTimeout(() => {
		// 	if (puntosComputadora === puntosMinimos) {
		// 		alert("Nadie gana :c");
		// 	} else if (puntosMinimos > 21) {
		// 		alert("Cpu Gana");
		// 	} else if (puntosComputadora > 21) {
		// 		alert("Juador Gana");
		// 	} else {
		// 		alert("Cpu Gana");
		// 	}
		// }, 100);
		determinarGanador();
	};

	// Eventos

	btnPedir.addEventListener("click", () => {
		const carta = pedirCarta();
		const puntosJugador = acumularPuntos(carta, 0);

		crearCarta(carta, 0);
		// puntosJugador += valorCarta(carta);
		// puntosHTML[0].innerText = puntosJugador;

		// const imgCarta = document.createElement("img");
		// imgCarta.src = `assets/cartas/${carta}.png`;
		// imgCarta.classList.add("player-card", "h-100");
		// divCartasJugador.append(imgCarta);

		if (puntosJugador > 21) {
			console.warn("Lo siento, perdiste :c");
			btnPedir.disabled = true;
			btnDetener.disabled = true;
			turnoComputadora(puntosJugador);
		} else if (puntosJugador === 21) {
			btnPedir.disabled = true;
			btnDetener.disabled = true;
			turnoComputadora(puntosJugador);
			console.warn("21, Ganaste :)");
		}
		//console.log(carta);
		//console.log(puntosJugador);
	});

	btnDetener.addEventListener("click", () => {
		btnPedir.disabled = true;
		btnDetener.disabled = true;
		turnoComputadora(puntosJugadores[0]);
	});

	// btnNuevo.addEventListener("click", () => {
	// 	console.clear();
	// 	inicializarJuego();
	// 	deck = [];
	// 	deck = crearDeck();
	// 	puntosJugador = 0;
	// 	puntosComputadora = 0;

	// 	puntosHTML[0].innerText = 0;
	// 	puntosHTML[1].innerText = 0;
	// 	divCartasCpu.innerHTML = "";
	// 	divCartasJugador.innerHTML = "";
	// 	btnPedir.disabled = false;
	// 	btnDetener.disabled = false;
	// });

	return {
		nuevoJuego: inicializarJuego,
	};
})();
