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
// function showLoader() {
//     const loadMsg = document.getElementById('loading-message');
//     const body = document.getElementById('body');
//     loadMsg.style.visibility = "visible";
//     body.style.visibility = "hidden";
// }
//
// function hideLoader() {
//     const loadMsg = document.getElementById('loading-message');
//     const body = document.getElementById('body');
//     loadMsg.remove();
//     body.style.visibility = "visible";
// }
//
// // Call showLoader() when you want to show the loader, and hideLoader() when you want to hide it.

// imported function to load available movie selection from database

const loadMovies = () => {
    // let html = '';

    fetch('http://localhost:3000/movies')
        .then(response => response.json())
        .then(movies => {
            console.log(movies)
            // let moviesHTML = movies.map(movie => {
            //     return `<div class="movie-card">
            //         <h4>${movie.title}</h4>
            //         <img src=${movie.poster} alt="movie-poster">
            //         <p>${movie.rating}</p>
            //         <p>${movie.year}</p>
            //         <p>${movie.description}</p>
            //         <p>${movie.genre}</p>
            //         <button type="button" class="btn btn-primary edit-button" id="Edit${movie.id}">Edit</button>
            //         <button type="button" class="delete-btn btn btn-danger dltBtn" id="${movie.id}">Delete</button>
            //
            //         </div>`;
            // })
//...


            let moviesHTML = movies.map(movie => {
                return `<div class="card mb-3">
    <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#movieModal-${movie.id}">
        <img src="${movie.poster}" class="card-img-top" alt="${movie.title} Poster">
    </button>
</div>

<!-- USED A MODAL TO DISPLAY ATTRIBUTES ABOUT MOVIE -->
<div class="modal fade" id="movieModal-${movie.id}" tabindex="-1" aria-labelledby="movieModalLabel-${movie.id}" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="movieModalLabel-${movie.id}">${movie.title}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body d-flex">
                <img src="${movie.poster}" class="card-img-top" alt="${movie.title} Poster" style="width: 150px;">
                <div class="ms-3">
                    <p class="card-text">${movie.description}</p>
                    <p class="card-text">Rating: ${movie.rating}</p>
                    <p class="card-text">Year: ${movie.year}</p>
                    <p class="card-text">Genre: ${movie.genre}</p>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary edit-button" data-movie-id="${movie.id}">Edit</button>
                <button type="button" class="btn btn-danger delete-button" data-movie-id="${movie.id}">Delete</button>
            </div>
        </div>
    </div>
</div>
`;
                //     COMMA KEPT SHOWING UP SO HAD TO JOIN TO REMOVE
            }).join('');


//...


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
//     function deleteButtons() {
//     const movieSelection = document.getElementById('movie-selection');
//     movieSelection.addEventListener('click', (e) => {
//         if (e.target.classList.contains('delete-button')) {
//             let movieID = e.target.dataset.movieId;
//             deleteMovie(movieID);
//         }
//     });
// }
}

//
const deleteMovie = async (id) => {
    try {
        const url = `http://localhost:3000/movies/${id}`;
        const options = {
            method: 'DELETE'
        };
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Failed to delete movie');
        }
        const deletedMovie = await response.json()
        //Handle success if needed

    } catch (error) {
        console.error(error);
    } finally {
        loadMovies();
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
            let movieId = e.target.dataset.movieId;
            editMovies(movieId);
        });
    });

    // const editBtns = document.querySelectorAll('.edit-button');
    // editBtns.forEach(button => {
    //     button.addEventListener('click', (e) => {
    //         console.log(e)
    //         let movieId = e.target.attributes.id.value
    //         console.log(e.target.attributes.id.value)
    //         editMovies(movieId);
    //     });
    // });
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