const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "a4880995fbb07d40249df7d0c03c8383";
const IMAGES_URL = "https://image.tmdb.org/t/p/w500";

const $form = document.getElementById("form");
const $search = document.getElementById("search");
const $count = document.getElementById("count");
const $results = document.getElementById("results");
const $details = document.getElementById("details");

// Listen for form submit
$form.addEventListener("submit", (event) => {
  event.preventDefault();

  getSearch($search.value);
});

// Make the search API request for the given query
function getSearch(query) {
  fetch(`${API_URL}/search/movie?api_key=${API_KEY}&query=${query}`)
    .then((response) => response.json())
    .then(showResults);
}

// Display the search results
function showResults(results) {
  $results.innerHTML = "";

  if (results.total_results === 0) {
    $count.innerHTML = "Aucun résultat, désolé !";
    return;
  }

  $count.innerHTML = `${results.total_results} résultats`;

  results.results.forEach(addResult);
}

// Add a result to the results container
function addResult(movie) {
  const movieButton = document.createElement("button");
  movieButton.innerHTML = movie.title;

  if (movie.release_date) {
    const year = new Date(movie.release_date).getFullYear();
    movieButton.innerHTML += ` (${year})`;
  }

  movieButton.addEventListener("click", () => getMovie(movie));
  $results.appendChild(movieButton);
}

// Make the API request for a movie details
function getMovie(movie) {
  fetch(`${API_URL}/movie/${movie.id}?api_key=${API_KEY}`)
    .then((response) => response.json())
    .then(showDetails);
}

// Show the details for the given movie
function showDetails(movie) {
  $details.innerHTML = `<h2>${movie.title}</h2>`;

  if (movie.genres) {
    $details.innerHTML += `<p>
      Genre : ${movie.genres.map((genre) => genre.name).join(", ")}
    </p>`;
  }

  if (movie.poster_path) {
    $details.innerHTML += `<img src="${IMAGES_URL}/${movie.poster_path}" alt="Affiche de ${movie.title}"/>`;
  }
}
