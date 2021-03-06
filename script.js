const container = document.querySelector('.container');
//queryselector grabs one item... .container from the DOM.
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
//queryselectorAll grabs all items with the class, ie .seat, from the DOM.  In this case all the seats in the row, not occupied...(just like we built the style states in css)
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;
//Intent: save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}
//Notes
//need this value to be turned into a number, from a string.  Could parseInt, or use + sign.
//console.log(typeof ticketPrice)
//can use "typeof" to determine a variable's type.

//Intent: update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    
    //to store the "cart of seats", copy selected seats into an array, map through, and return a new array of indexes.. using spread operator. [...]
    //(basically saving the changing nodelist(as seats are clicked) into an array, then map through it... map returns something after a loop, whereas forEach just loops through...
    
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}
//Notes
//selectedSeats puts all of seats into a nodelist upon selecting them occupied.

//Intent:Get data from localstorage and populate UI
function populateUI () {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')
    );
    if(selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}
//Notes
//grab the item 'selectedSeats' from local storage and then JSON.parse(reverse of JSON.stringify)(parse it back into an array)

//Intent: Movie Select Event.. to change the price of the tickets selected by changing the movie.
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});


//Intent: When we click on a seat, we want to change the class to select it, to turn it blue/occupied.
container.addEventListener('click', e => {
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

// Initial count and total set
updateSelectedCount();