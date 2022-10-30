/**
 * *DOM CLASE 52 */

/**  Modificar Elementos en el document por Elemento */
document.querySelector("div").innerText = "Hola Mundo";
document.querySelector("div").innerHTML = "<b>Michelle Ordaz</b>";

/**  Modificar Elementos en el document por Clase */

document.querySelector(".tittle").innerText = "Hola Mundo";
document.querySelector(".tittle").innerHTML = "<b>Michelle Ordaz</b>";

/** Si queremos modificar varias veces el mismo elemento, lo asignamos a variable */
const titulo = document.querySelector(".tittle");
titulo.innerText = "Titulo";

/**  Modificar Elementos en el document por ID */
document.querySelector("#tittle").innerText = "Hola Mundo";
document.querySelector("#tittle").innerHTML = "<b>Michelle Ordaz</b>";

/**
 * * DOM CLASE 53 */

/** Agregar elementos en el document -append*/

const botonNuevo = document.createElement("button"); // Creamos el boton

const divBotones = document.querySelector("#divBotones"); // Buscamos donde ponerlo

divBotones.append(botonNuevo); // En el divBotones creamos el botonNuevo
botonNuevo.innerText = "hola"; // Cambiamos el texto del boton

/** Añadir clases al boton */

botonNuevo.classList.add("buttons-styles-new", "bg-primary");

/** Crear un input */

const input = document.createElement("input"); // Creamos el input
const nuevoInput = document.querySelector("#divBotones"); // Buscamos donde ponerlo
nuevoInput.append(input); // En el nuevoInput creamos el input
input.classList.add("form-control"); // le agregamos una clase

divBotones.append(input); // En el divBotones creamos el input

/** AGREGANDO MAS DE 1 CLASE AL ELEMENTO */
input.classList.add("bg-danger", "p-1"); // le agregamos otra clase al input

/** Agregamos placeholder al input */
input.placeholder = "placeholder";

/**
 * * DOM CLASE 54 */

/** Eventos */

const btnNuevo = document.querySelector("#btnNuevo");
const btnPedir = document.querySelector("#btnPedir");
const btnDetener = document.querySelector("#btnDetener");

btnPedir.addEventListener("click", () => {
	console.log("click");
});
/* 2 argumentos, el primero el evento que quiero escuchar (click, dbclick, focus ), el segundo seria una funcion especial CALLBACK, que si se coloca como argumento a otra funcion se llama CALLBACK, puede ser tradicional o flecha, basicamente estamos indicando que cuando se haga click vamos a disparar la accion dentro de las llaves {} */

/** Agregando el evento */

// Seleccionamos todos los small que contienen puntos
const puntosHTML = document.querySelectorAll("small");

btnPedir.addEventListener("click", () => {
	const carta = pedirCarta();
	puntosJugador += valorCarta(carta);
	//
	/** UBICAMOS EL PRIMER SMALL, el segundo small seria [1] */
	puntosHTML[0].innerText = puntosJugador;
	//console.log(carta);
	//console.log(puntosJugador);
});
