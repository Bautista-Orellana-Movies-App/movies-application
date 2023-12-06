export const newMovie = async (movie) => {
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

export const updateMovies = async (id, movie) => {
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
    }
}



export const deleteMovie = async (id) => {
    try {
        const url = `http://localhost:3000/movies/${id}`;
        const options = {
            method: 'DELETE'
        };
        const response = await fetch(url, options);
        const deletedMovies = await response.json();
        return deletedMovies;
    } catch (error) {
        console.error(error);
    }
}



// export const getMovieInfo = async (id) => {
//     try {
//         // Get the movie data
//         const movieUrl = `http://localhost:3000/movies/${id}`;
//         const moviesResponse = await fetch(movieUrl);
//         const movie = await movieResponse.json();
//         // Get the author data
//         // const authorUrl = `http://localhost:3000/authors/${book.authorId}`;
//         // const authorResponse = await fetch(authorUrl);
//         // const author = await authorResponse.json();
//         // Add the author to the book object
//         // book.author = author;
//         // Return the movie object
//         return movie;
//     } catch (error) {
//         console.error(error);
//     }
// }

// export const getAllMovies = async () => {
//     try {
//         // Get all the books
//         const moviesUrl = 'http://localhost:3000/movies';
//         const moviessResponse = await fetch(moviesUrl);
//         const moviess = await moviesResponse.json();
//         // Get all the authors
//         // const authorsUrl = 'http://localhost:3000/authors';
//         // const authorsResponse = await fetch(authorsUrl);
//         // const authors = await authorsResponse.json();
//         // Add the author to each book object
//         movies.forEach(movie => {
//             // const author = authors.find(author => author.id === book.authorId);
//             // book.author = author;
//         });
//         // Return the books array
//         return books;
//     } catch (error) {
//         console.error(error);
//     }
// }
// getMovieInfo()