const miModulo = (() => {
	"use strict";
	let e = [],
		t = ["C", "D", "H", "S"],
		r = ["A", "J", "Q", "K"],
		l = [];
	document.querySelector("#btnNuevo");
	let a = document.querySelector("#btnPedir"),
		n = document.querySelector("#btnDetener"),
		s = document.querySelectorAll(".divCartas"),
		d = document.querySelectorAll("small"),
		o = (t = 2) => {
			(e = i()), (l = []);
			for (let r = 0; r < t; r++) l.push(0);
			d.forEach((e) => (e.innerText = 0)),
				s.forEach((e) => (e.innerHTML = "")),
				(a.disabled = !1),
				(n.disabled = !1);
		},
		i = () => {
			e = [];
			for (let l = 2; l <= 10; l++) for (let a of t) e.push(l + a);
			for (let n of t) for (let s of r) e.push(s + n);
			return _.shuffle(e);
		},
		c = () => {
			if (0 === e.length) throw "No hay cartas en el deck";
			return e.pop();
		},
		u = (e) => {
			let t = e.substring(0, e.length - 1);
			return isNaN(t) ? ("A" === t ? 11 : 10) : 1 * t;
		},
		$ = (e, t) => ((l[t] = l[t] + u(e)), (d[t].innerText = l[t]), l[t]),
		h = (e, t) => {
			let r = document.createElement("img");
			(r.src = `assets/cartas/${e}.png`),
				r.classList.add("cpu-card", "h-100"),
				s[t].append(r);
		},
		f = () => {
			let [e, t] = l;
			setTimeout(() => {
				t === e
					? alert("Nadie gana :c")
					: e > 21
					? alert("Cpu Gana")
					: t > 21
					? alert("Juador Gana")
					: alert("Cpu Gana");
			}, 100);
		},
		b = (e) => {
			let t = 0;
			do {
				let r = c();
				(t = $(r, l.length - 1)), h(r, l.length - 1);
			} while (t < e && e <= 21);
			f();
		};
	return (
		a.addEventListener("click", () => {
			let e = c(),
				t = $(e, 0);
			h(e, 0),
				t > 21
					? (console.warn("Lo siento, perdiste :c"),
					  (a.disabled = !0),
					  (n.disabled = !0),
					  b(t))
					: 21 === t &&
					  ((a.disabled = !0),
					  (n.disabled = !0),
					  b(t),
					  console.warn("21, Ganaste :)"));
		}),
		n.addEventListener("click", () => {
			(a.disabled = !0), (n.disabled = !0), b(l[0]);
		}),
		{ nuevoJuego: o }
	);
})();
