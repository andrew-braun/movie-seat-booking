const container = document.querySelector(".movie-container");
const seats = document.querySelectorAll(".row .seat:not(.occupied");
const count = document.querySelector("#count");
const total = document.querySelector("#total");
const movieSelect = document.querySelector("#movie-select");

let ticketPrice = +movieSelect.value;

// Save selected movie index and price
const setMovieData = (movieIndex, moviePrice) => {
	localStorage.setItem("selectedMovieIndex", movieIndex);
	localStorage.setItem("selectedMoviePrice", moviePrice);
};

// Update total and count
const updateSelectedCount = () => {
	const selectedSeats = document.querySelectorAll(".row .seat.selected");
	const selectedSeatsCount = selectedSeats.length;

	count.innerText = selectedSeatsCount;
	total.innerText = selectedSeatsCount * ticketPrice;

	/* Local storage for selected seats */

	const seatIndexes = [...selectedSeats].map((seat) => {
		return [...seats].indexOf(seat);
	});

	localStorage.setItem("selectedSeats", JSON.stringify(seatIndexes));
};

// Populate UI with info from local storage

const populateUI = () => {
	const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

	// Nested if statement necessary because using && triggers error when selectedSeats.length is null
	if (selectedSeats !== null) {
		seats.forEach((seat, index) => {
			if (selectedSeats.indexOf(index) > -1) {
				seat.classList.add("selected");
			}
		});
	}

	const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

	if (selectedMovieIndex !== null) {
		movieSelect.selectedIndex = selectedMovieIndex;
	}

	// Set initial count and total
	updateSelectedCount();
};

populateUI();

const handleClick = (event) => {
	if (
		event.target.classList.contains("seat") &&
		!event.target.classList.contains("occupied")
	) {
		event.target.classList.toggle("selected");

		updateSelectedCount();
	}
};

const handleSelect = (event) => {
	ticketPrice = +event.target.value;

	setMovieData(event.target.selectedIndex, ticketPrice);
	updateSelectedCount();
};

/* Event listeners */
container.addEventListener("click", handleClick);
movieSelect.addEventListener("change", handleSelect);
