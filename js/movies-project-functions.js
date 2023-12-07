"use strict"

//obtaining the browsers window object and adding an event listener on page load or page refresh
function loaderAnimation() {
    window.addEventListener('load', () => {
        const loadMsg = document.getElementById('loading-message');
        const body = document.getElementById('body');
        body.style.visibility = "hidden";
        loadMsg.style.visibility = "visible";
    })
}


//Removing load animation
function removeLoader() {
    const loadMsg = document.getElementById('loading-message');
    const body = document.getElementById('body');
    loadMsg.remove()
    body.style.visibility = "visible";
}

// imported function to load available movie selection from database

const loadMovies = () => {
    // let html = '';

    fetch('http://localhost:3000/movies')
        .then(response => response.json())
        .then(movies => {
            console.log(movies)
            let moviesHTML = movies.map( movie => {
                return `<div class="movie-card">
                    <h4>${movie.title}</h4>
                    <p>${movie.rating}</p>
                    <p>${movie.description}</p>
                    <img src=${movie.poster} alt="movie-poster">
                    <button type="submit" class="btn btn-primary">Edit</button>
                    <button type="submit" class="delete-btn btn btn-danger" data-movie-id="${movie.id}">Delete</button>

                    </div>`;
            })
            // for (let i = 0; i < movies.length; i++) {
                // console.log(movies)
                // html += `<div class="movie-card">
                //     <h4>${movies[i].title}</h4>
                //     <p>${movies[i].rating}</p>
                //     <p>${movies[i].description}</p>
                //     <img src=${movies[i].poster} alt="movie-poster">
                //     <button type="submit" class="btn btn-primary">Edit</button>
                //     <button type="submit" class="delete-btn btn btn-danger" data-movie-id="${movies[i].id}">Delete</button>
                //
                //     </div>`;
            // }

            // const movieDiv = document.createElement("div");
            // movieDiv.setAttribute('class', "theMovie");

            const movieId = document.getElementById("movie-selection")
            movieId.innerHTML = moviesHTML;

        })
        .catch(error => {
            console.log(error);
            // document.getElementById('movie-selection').innerHTML = `<p style="color:black; font-size: 30px;">Something went wrong</p>`
        })
        .finally(() => {
            removeLoader();
        })
}

function deleteButtons() {
//event listener for "delete" button in load movies function
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const movieId = button.getAttribute('data-movie-id');
            deleteMovie(movieId)
        })
    })
}

// event listener for the "Edit" button in loadMovies function
function editMovies() {
    const editButtons = document.querySelectorAll('.edit-button');
    editButtons.forEach(button => {
        button.addEventListener('click', () => {
            const movieId = button.getAttribute('data-movie-id');
            editMovie(movieId);
        });
    });
}

function clearForm() {
    let clearMovieTitle = document.getElementById('movie-title')
    let movieRating = document.getElementById('movie-rating');
    clearMovieTitle.value = '';
    movieRating.value = '';
}



const createMovie = async (movie) => {
    try {
        const url = 'http://localhost:3000/movies';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        };
        const response = await fetch(url, options);


        clearForm();


    } catch (error) {
        console.log(error);
    } finally {
        loadMovies();

    }
}



//setting up an event listener for add new movie submit button
document.getElementById('new-movie').addEventListener('submit', function (event) {
    event.preventDefault();
    let movieTitle = document.getElementById('movie-title');
    let movieRating = document.getElementById('movie-rating');
    //creating a new movie - img
    let movieImg = document.getElementById('defaultImg');
    createMovie({
        title: movieTitle.value,
        rating: movieRating.value,
        poster: movieImg.value
        // description: ,
        // poster: ''
    });
    clearForm();

})

const updateMovies = async (id, movie) => {
    try {
        const url = `http://localhost:3000/movies/${id}`;
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        };
        const response = await fetch(url, options);
        const updatedMovie = await response.json();
        return updatedMovie;
    } catch (error) {
        console.error(error);
    } finally {

    }
}


const deleteMovie = async (id) => {
    try {
        const url = `http://localhost:3000/movies/${id}`;
        const options = {
            method: 'DELETE'
        };
        const response = await fetch(url, options);
        const deletedMovie = await response.json();

        // await loadMovies();

        console.log(`Movie with ID ${id} deleted:`)

    } catch (error) {
        console.error(error);
    } finally {

    }
}

export {
    loaderAnimation, loadMovies, updateMovies, deleteMovie, createMovie
}