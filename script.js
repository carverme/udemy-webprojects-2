const container = document.querySelector('.container');
//queryselector grabs one item... .container from the DOM.
const seats = document.querySelectorAll('.row.seat:not(.occupied)');
//queryselectorAll grabs all items with the class, ie .seat, from the DOM.  In this case all the seats in the row, not occupied...(just like we built the style states in css)
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

const ticketPrice = +movieSelect.value;
//need this value to be turned into a number, from a string.  Could parseInt, or use + sign.

//console.log(typeof ticketPrice)
//can use "typeof" to determine a variable's type.

//Intent: update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
    console.log(count.innerText);

}
//Notes
//selectedSeats puts all of seats into a nodelist upon selecting them occupied.

//Intent: When we click on a seat, we want to change the class to select it, to turn it blue/occupied.
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
    ) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
    }
});
//Notes
//In the container holding the seats, when a click is done, the "if" loops through the elements, and determines if the class is .seat and then if the seat does not have the class of occupied, run this...
//then we toggle the class of selected on click, turning it blue/occupied, and clicked again, toggled off/umnoccupied.