/** 2C = Two of Clubs*/
/** 2D = Two of Diamonds*/
/** 2H = Two of Hearts*/
/** 2S = Two of Spades*/

let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];

let puntosJugador = 0;
let puntosComputadora = 0;

// Referencias del HTML
const btnNuevo = document.querySelector("#btnNuevo");
const btnPedir = document.querySelector("#btnPedir");
const btnDetener = document.querySelector("#btnDetener");

const divCartasJugador = document.querySelector("#player-cards");
const puntosHTML = document.querySelectorAll("small");

// Esta función crea un nuevo deck
const crearDeck = () => {
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
	// console.log( deck );
	deck = _.shuffle(deck);
	// console.log(deck);
	return deck;
};

crearDeck();

// Esta función me permite tomar una carta
const pedirCarta = () => {
	if (deck.length === 0) {
		throw "No hay cartas en el deck";
	}
	const carta = deck.pop();
	// console.log(carta);
	return carta;
};

//pedirCarta();

const valorCarta = (carta) => {
	const valor = carta.substring(0, carta.length - 1);
	return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
};

// const valor = valorCarta(pedirCarta());
// console.log({ valor });

//Lógica CPU

// Eventos

btnPedir.addEventListener("click", () => {
	const carta = pedirCarta();
	puntosJugador += valorCarta(carta);
	puntosHTML[0].innerText = puntosJugador;

	const imgCarta = document.createElement("img");
	imgCarta.src = `assets/cartas/${carta}.png`;
	imgCarta.classList.add("player-card");

	divCartasJugador.append(imgCarta);

	if (puntosJugador > 21) {
		console.warn("Lo siento, perdiste :c");
		btnPedir.disabled = true;
	} else if (puntosJugador === 21) {
		btnPedir.disabled = true;
		console.warn("21, Ganaste :)");
	}
	//console.log(carta);
	//console.log(puntosJugador);
});
