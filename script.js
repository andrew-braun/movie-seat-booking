const container = document.querySelector(".movie-container");
const seats = document.querySelectorAll(".row .seat:not(.occupied");
const count = document.querySelector("#count");
const total = document.querySelector("#total");
const movieSelect = document.querySelector("#movie-select");

let ticketPrice = +movieSelect.value;

// Update total and count
const updateSelectedCount = () => {
	const selectedSeats = document.querySelectorAll(".row .seat.selected");
	const selectedSeatsCount = selectedSeats.length;

	count.innerText = selectedSeatsCount;
	total.innerText = selectedSeatsCount * ticketPrice;
};

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
	ticketPrice = event.target.value;
	updateSelectedCount();
};

/* Event listeners */
container.addEventListener("click", handleClick);
movieSelect.addEventListener("change", handleSelect);
