"use strict"
let html = "";
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

        const movieId = document.getElementById("movie-selection")
            movieId.appendChild(movieDiv).innerHTML = html;
    })

const newMovie = async (movie) => {
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
        const newMovie = await response.json();
        return newMovie;
    } catch (error) {
        console.log(error);
    }
}
// export const createBook = async (book) => {
//     try {
//         const url = 'http://localhost:3000/books';
//         const options = {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(book)
//         };
//         const response = await fetch(url, options);
//         const newBook = await response.json();
//         return newBook;
//     } catch (error) {
//         console.error(error);
//     }
// }

async function startAsyncOperation() {
    // Show loading message
    document.getElementById('loading-message').style.display = 'block';
    try {
        // Simulate an asynchronous operation, e.g., fetching data from an API
        await new Promise(resolve => setTimeout(resolve, 2000));
        // Perform your asynchronous operation here
        // Simulate the completion of the asynchronous operation
        console.log('Async operation completed successfully');
    } catch (error) {
        console.error('Async operation failed', error);
    } finally {
        // Hide loading message after the asynchronous operation is complete
        document.getElementById('loading-message').style.display = 'none';
    }
}

// startAsyncOperation()