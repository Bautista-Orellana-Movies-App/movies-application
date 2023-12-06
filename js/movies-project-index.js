"use strict"

import {createMovie, updateMovies, deleteMovie} from "./movies-project-functions.js";


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
})


//obtaining the browsers window object and adding an event listener on page load or page refresh
window.addEventListener('load', () => {
    const loadMsg = document.getElementById('loading-message');
    const body = document.getElementById('body');
    body.style.visibility = "hidden";
    loadMsg.style.visibility = "visible";
})

function removeLoader() {
    const loadMsg = document.getElementById('loading-message');
    const body = document.getElementById('body');
    loadMsg.remove()
    body.style.visibility = "visible";
}

let html = "";
const movieId = document.getElementById("movie-selection")


export const loadMovies = () => {
    fetch('http://localhost:3000/movies')
        .then(response => response.json())
        .then(movies => {
            console.log(movies)
            for (let i = 0; i < movies.length; i++) {
                // console.log(movies)

                html += `<div class="movie-card">
            <h4>${movies[i].title}</h4>
            <p>${movies[i].rating}</p>
            <p>${movies[i].description}</p>
            <img src=${movies[i].poster} alt="movie-poster">
            
            </div>`;


            }
            const movieDiv = document.createElement("div");
            movieDiv.setAttribute('class', "theMovie");


            // const movieId = document.getElementById("movie-selection")
            movieId.appendChild(movieDiv).innerHTML = html;
        })
        .catch(error => {
            console.log(error);
            // document.getElementById('movie-selection').innerHTML = `<p style="color:black; font-size: 30px;">Something went wrong</p>`

        })
        .finally(() => {
            removeLoader();
        })
}

//initial loading of movies
loadMovies();

//clearing form values




// const searchBox = document.querySelector('#new-movie');
// searchBox.addEventListener('submit', (e) => {
//         e.preventDefault();
//         const newMovieDiv = document.createElement('div')
//         movieId.appendChild(newMovieDiv).innerHTML = `
//         <h4>${e.target[0].value}</h4>
//         <p>${e.target[1].value}</p>
//         `
//
//         newMovieDiv.setAttribute('class', 'movie-card')
//
// })



// async function startAsyncOperation() {
//     // Show loading message
//     document.getElementById('loading-message').style.display = 'block';
//     try {
//         // Simulate an asynchronous operation, e.g., fetching data from an API
//         await new Promise(resolve => setTimeout(resolve, 2000));
//         // Perform your asynchronous operation here
//         // Simulate the completion of the asynchronous operation
//         console.log('Async operation completed successfully');
//     } catch (error) {
//         console.error('Async operation failed', error);
//     } finally {
//         // Hide loading message after the asynchronous operation is complete
//         document.getElementById('loading-message').style.display = 'none';
//     }
// }



