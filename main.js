$(document).ready(  () => {    //$.(document).ready(function(){});

$('#searchForm').on('submit' , (e)=> {
let searchText = $('#searchText').val();    // get value of search text input
getMovies(searchText);
  e.preventDefault();
})

});

//function created to use the text entered in the Search Bar
function getMovies(searchText){
  axios.get('https://www.omdbapi.com?s='+searchText+'&apikey=thewdb')
  .then( (response) => {

let movies = response.data.Search;
let output = '';
$.each(movies, (index, movie) =>  {

output += `
  <div class="col-md-3">
    <div class="well text-center">
      <img src="${movie.Poster}">
      <h5> ${movie.Title}</h5>
      <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">More Info</a>
    </div>
  </div>`
;

});

$("#movies").html(output);
  })

  .catch( (err) => {
    console.log(err);
  });

};


//Function to work with Movie ID collected in above function

function movieSelected(id) {
sessionStorage.setItem('movieId' , id) ;
window.location = 'movie.html';
return false;
};

function getMovie(){

let movieId = sessionStorage.getItem('movieId');
axios.get('https://www.omdbapi.com?i='+ movieId+'&apikey=thewdb')
.then( (response) => {

console.log(response)

let movie = response.data;

let output =
`

<div class = "row">

  <div class="col-md-4">
    <img src="${movie.Poster}" class="thumbnail">
  </div>

  <div class="col-md-8">
  <h2> ${movie.Title}</h2>
    <ul class="list-group">
      <li class="list-group-item"> Genre : ${movie.Genre}</li>
      <li class="list-group-item">Released : ${movie.Released}</li>
      <li class="list-group-item">Cast : ${movie.Actors}</li>
      <li class="list-group-item">Director : ${movie.Director}</li>
      <li class="list-group-item">Genre : ${movie.Genre}</li>
      <li class="list-group-item">IMDB Rating : ${movie.imdbRating}</li>
      <li class="list-group-item">Story Description : ${movie.Plot}</li>
    </ul>
  </div>
</div>
</div>
<hr>
<div class="center" >
  <div class="well">
<a href="index.html"><button class="btn">Back To Search</button></a>
<a href="http://imdb.com/title/${movie.imdbID}" target="_blank"><button class="btn">IMDB</button></a>
  </div>
 </div>

`;
console.log(output)

$("#movie").html(output);
});

};
