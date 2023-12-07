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
            let moviesHTML = movies.map(movie => {
                return `<div class="movie-card">
                    <h4>${movie.title}</h4>
                    <img src=${movie.poster} alt="movie-poster">
                    <p>${movie.rating}</p>
                    <p>${movie.year}</p>
                    <p>${movie.description}</p>
                    <p>${movie.genre}</p>
                    <button type="button" class="btn btn-primary edit-button" id="Edit${movie.id}">Edit</button>
                    <button type="button" class="delete-btn btn btn-danger dltBtn" id="${movie.id}">Delete</button>

                    </div>`;
            })

            const movieId = document.getElementById("movie-selection")
            movieId.innerHTML = moviesHTML;
            deleteButtons()
            editButtons()
            removeLoader();

        })
        .catch(error => {
            console.log(error);
            // document.getElementById('movie-selection').innerHTML = `<p style="color:black; font-size: 30px;">Something went wrong</p>`
            removeLoader();

        })
}


function deleteButtons() {
//event listener for "delete" button in load movies function
    const deleteBtns = document.querySelectorAll('.dltBtn');
// console.log(deleteBtns);
    deleteBtns.forEach(button => {
        button.addEventListener('click', (e) => {
            // console.log(e)
            // console.log(e.target.attributes.id.value)
            let movieID = e.target.attributes.id.value
            // const movieId = button.getAttribute('id');
            deleteMovie(movieID);
        });
    });
}

//
const deleteMovie = async (id) => {
    try {
        const url = `http://localhost:3000/movies/${id}`;
        const options = {
            method: 'DELETE'
        };
        const response = await fetch(url, options);
        const deletedMovie = await response.json()
        // return response.json();
        // return deletedMovie;
    } catch (error) {
        console.error(error);
    } finally {
        loadMovies()
    }
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

// ======WORKING ON BELOW========

//                     <button type="button" class="btn btn-primary">Edit</button>

// event listener for the "Edit" button in loadMovies function
function editButtons() {
    const editBtns = document.querySelectorAll('.edit-button');
    editBtns.forEach(button => {
        button.addEventListener('click', (e) => {
            console.log(e)
            let movieId = e.target.attributes.id.value
            console.log(e.target.attributes.id.value)
            editMovies(movieId);
        });
    });
}


const editMovies = async (id, movie) => {
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
        return await response.json();
    } catch (error) {
        console.error(error);
    } finally {

    }
}


export {
    loaderAnimation, loadMovies, createMovie, editMovies, deleteMovie,
}