"use strict"

import {newMovie, updateMovies, deleteMovie} from "./movies-project-functions.js";

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

fetch('http://localhost:3000/movies')
    .then(response => response.json())
    .then(movies => {
        console.log(movies)
        for (let i = 0; i < movies.length; i++) {
            // console.log(movies)

            html += `<div class="movie-card">
            <h4>${movies[i].title}</h4>
            <p>${movies[i].rating}</p>
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

const searchBox = document.querySelector('#new-movie');
searchBox.addEventListener('submit', (e) => {
        e.preventDefault();
        const newMovieDiv = document.createElement('div')
        movieId.appendChild(newMovieDiv).innerHTML = `
        <h4>${e.target[0].value}</h4>
        <p>${e.target[1].value}</p>
        <p>${e.target[2].value}</p>
        <p>${e.target[3].value}</p>
`
        newMovieDiv.setAttribute('class', 'movie-card')
    }
)

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



