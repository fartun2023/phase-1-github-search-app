// Function to update the movie details on the page
function updateMovieDetails(movie) {
    // Update the poster image
    const poster = document.getElementById('poster');
    poster.src = movie.poster;
    // console.log(poster)
  
    // Update the movie title
    const title = document.getElementById('title');
    title.textContent = movie.title;
  
    // Update the movie runtime
    const runtime = document.getElementById('runtime');
    runtime.textContent = movie.runtime + ' minutes';
  
    // Update the movie description
    const filmInfo = document.getElementById('film-info');
    filmInfo.textContent = movie.description;
  
    // Update the showtime
    const showtime = document.getElementById('showtime');
    showtime.textContent = movie.showtime;
  
    // Update the ticket count
    const ticketNum = document.getElementById('ticket-num');
    const availableTickets = movie.capacity - movie.tickets_sold;
    ticketNum.textContent = availableTickets + ' remaining tickets';
  }
  
  // Function to update the movie list on the page
  function updateMovieList(movies) {
    // Get the unordered list element
    const filmList = document.getElementById('films');
  
    // Remove the placeholder list item
    const placeholder = document.querySelector('.film.item');
    placeholder.remove();
  
    // Loop through each movie and add it to the list
    movies.forEach((movie) => {
      const listItem = document.createElement('li');
      listItem.textContent = movie.title;
      listItem.classList.add('film', 'item');
      filmList.appendChild(listItem);
  
      // Add a click event listener to update the movie details when clicked
      listItem.addEventListener('click', () => {
        updateMovieDetails(movie);
      });
    });
  }
  
  // Function to update the ticket count and prevent overselling
  function buyTicket(movie) {
    const ticketNum = document.getElementById('ticket-num');
    const availableTickets = movie.capacity - movie.tickets_sold;
  
    if (availableTickets > 0) {
      movie.tickets_sold += 1;
      ticketNum.textContent = availableTickets - 1 + ' remaining tickets';
    } else {
      alert('Sorry, this showing is sold out.');
    }
  }
  
  // Fetch the movie data from the server and update the page
  fetch(' http://localhost:3000/films')
    .then((response) => response.json())
    .then((movies) => {
      // Update the movie list
      updateMovieList(movies);
  
      // Update the first movie's details
      updateMovieDetails(movies[0]);
  
      // Add a click event listener to the "Buy Ticket" button
      const buyTicketBtn = document.getElementById('buy-ticket');
      buyTicketBtn.addEventListener('click', () => {
        buyTicket(movies[0]);
      });
    })
    .catch((error) => {
      console.error(error);
    });