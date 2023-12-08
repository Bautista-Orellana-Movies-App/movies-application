"use strict"

// ADDING AN EVENT LISTENER ON PAGE LOAD/REFRESH
function loaderAnimation() {
    window.addEventListener('load', () => {
        const loadMsg = document.getElementById('loading-message');
        const body = document.getElementById('body');
        body.style.visibility = "hidden";
        loadMsg.style.visibility = "visible";
    })
}


// REMOVING LOAD ANIMATION
function removeLoader() {
    const loadMsg = document.getElementById('loading-message');
    const body = document.getElementById('body');
    loadMsg.remove()
    body.style.visibility = "visible";
}


// IMPORT FUNCTION TO LOAD AVAILABLE MOVIE SELECTION FROM DATABASE
const loadMovies = () => {

    fetch('http://localhost:3000/movies')
        .then(response => response.json())
        .then(movies => {
            console.log(movies)

            let moviesHTML = movies.map(movie => {
                return `<div class="card mb-3 shadow p-3 mb-5 bg-body-tertiary rounded">

    <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#movieModal-${movie.id}">
        <img src="${movie.poster}" class="card-img-top" alt="${movie.title} Poster">
    </button>
</div>

<!-- USED A MODAL TO DISPLAY ATTRIBUTES ABOUT MOVIE -->
<div class="modal fade" id="movieModal-${movie.id}" tabindex="-1" aria-labelledby="movieModalLabel-${movie.id}" aria-hidden="true">
    <div class="modal-dialog modal-lg shadow p-3 mb-5 bg-body-tertiary rounded"">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="movieModalLabel-${movie.id}">${movie.title}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body d-flex">
                <img src="${movie.poster}" class="card-img-top" alt="${movie.title} Poster" style="width: 150px;">
                <div class="ms-3">
                    <p class="card-text" id="user-edit-desc">${movie.description}</p>
                    <p class="card-text">Rating: ${movie.rating}</p>
                    <p class="card-text">Year: ${movie.year}</p>
                    <p class="card-text">Genre: ${movie.genre}</p>
                </div>
            </div>
          <div class="modal-footer">
                <button type="button" class="btn btn-primary edit-button" data-movie-id="${movie.id}">Edit</button>
                <button type="button" class="btn btn-danger delete-button dltBtn" data-movie-id="${movie.id}">Delete</button>

            </div>
        </div>
    </div>
</div>

<!-- EDIT FORM STARTS HERE-->
<div class="modal-footer" style="display: none;" id="editForm-${movie.id}">
    <form id="editMovieForm" data-movie-id="${movie.id}">
        <div class="mb-3">
            <label for="edit-movie-title" class="form-label">Movie Title</label>
            <!-- ADDING ATTRIBUTE NAME BESIDE THE FIELD -->
            <div class="input-group">
                <input type="text" class="form-control" id="edit-movie-title" value="${movie.title}">
                <span class="input-group-text">Title</span>
            </div>
        </div>
        <div class="mb-3">
            <label for="edit-movie-rating" class="form-label">Rating</label>
            
            <div class="input-group">
                <input type="text" class="form-control" id="edit-movie-rating" value="${movie.rating}">
                <span class="input-group-text">Rating</span>
            </div>
        </div>  

        <button type="button" class="btn btn-primary save-edit-button">Save Changes</button>
        <button type="button" class="btn btn-secondary cancel-edit-button">Cancel</button>
    </form>
</div>
`; //     COMMA KEPT SHOWING UP SO HAD TO JOIN TO REMOVE
            }).join('');

            const movieId = document.getElementById("movie-selection")
            movieId.innerHTML = moviesHTML;
            deleteButtons()
            editButtons()
            removeLoader();

        })
        .catch(error => {
            console.log(error);
            removeLoader();

        })
}

// DELETE BUTTONS EVENT LISTENER
async function deleteButtons() {
    const deleteBtns = document.querySelectorAll('.delete-button');
    deleteBtns.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            let movieID = e.target.dataset.movieId;
            deleteMovie(movieID);


            // HIDE THE MODAL

            const modalId = e.target.getAttribute('data-bs-target');
            const modalElement = document.querySelector(modalId);
            const modal = new bootstrap.Modal(modalElement);
            modal.remove();
            // REMOVE MODAL
            const modalBackdrop = document.querySelector('.modal-backdrop');
            modalBackdrop.hide();
        });
    });
}

// DELETE MOVIE FUNCTION
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
        console.log('Movie deleted successfully:', deletedMovie);


    } catch (error) {
        console.error(error);
    } finally {
        loadMovies();
    }
};

// CLEAR FORM FUNCTION

function clearForm() {
    let clearMovieTitle = document.getElementById('movie-title')
    let movieRating = document.getElementById('movie-rating');
    clearMovieTitle.value = '';
    movieRating.value = '';
}


// CREATE MOVIE FUNCTION
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


// EVENT LISTENER FOR ADD NEW MOVIE SUBMIT BUTTON
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


// EVENT LISTENER FOR "EDIT" BUTTON IN LOADMOVIES FUNCTION
function editButtons() {
    const editBtns = document.querySelectorAll('.edit-button');
    editBtns.forEach(button => {
        button.addEventListener('click', (e) => {
            const movieId = e.target.dataset.movieId;
            showEditFormInPlace(movieId);
        });
    });

    // Add event listener for "Cancel" button in the edit form
    const cancelEditButtons = document.querySelectorAll('.cancel-edit-button');
    cancelEditButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const movieId = e.target.closest('form').dataset.movieId;
            hideEditFormInPlace(movieId);
        });
    });

    // Add event listener for "Save Changes" button in the edit form
    const saveEditButtons = document.querySelectorAll('.save-edit-button');
    saveEditButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const movieId = e.target.closest('form').dataset.movieId;
            // Call a function to handle saving changes
            editMovies(movieId)
            loadMovies();
        });
    });
}

// EDIT MOVIES FUNCTION
const editMovies = async (id) => {
    try {
        const url = `http://localhost:3000/movies/${id}`;
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                description: document.getElementById('user-edit-desc').value
            })
        };
        const response = await fetch(url, options);
        return await response.json();
    } catch (error) {
        console.error(error);
    } finally {

    }
}

// FUNCTION TO SHOW THE EDIT FORM IN PLACE
function showEditFormInPlace(movieId) {
    // Get the modal title and attribute containers
    const modalTitle = document.querySelector(`#movieModal-${movieId} .modal-title`);
    const attributeContainers = document.querySelectorAll(`#movieModal-${movieId} .modal-body p.card-text`);

    // Store the original content and container type in data attributes
    modalTitle.setAttribute('data-original-content', modalTitle.textContent);
    modalTitle.setAttribute('data-original-type', 'title');
    attributeContainers.forEach(container => {
        container.setAttribute('data-original-content', container.textContent);
        container.setAttribute('data-original-type', 'text');
    });

    // =========
    // Set the title to an input field
    modalTitle.innerHTML = `<input type="text" id="edit-movie-title" class="form-control" value="${modalTitle.textContent}">`;

    // Convert attribute containers to input fields
    attributeContainers.forEach(container => {
        container.innerHTML = `<input type="text" class="form-control" value="${container.textContent}">`;
    });

    // Change the Edit button to Save Changes
    const editButton = document.querySelector(`#movieModal-${movieId} .edit-button`);
    editButton.innerHTML = 'Save Changes';
    editButton.classList.remove('edit-button');
    editButton.classList.add('save-edit-button');
}

// FUNCTION TO HIDE THE EDIT FORM AND REVERT TO DISPLAYED INFORMATION
function hideEditFormInPlace(movieId) {
    // Get the modal title and attribute containers
    const modalTitle = document.querySelector(`#movieModal-${movieId} .modal-title`);
    const attributeContainers = document.querySelectorAll(`#movieModal-${movieId} .modal-body p.card-text`);

    // Set the title back to plain text
    modalTitle.innerHTML = modalTitle.querySelector('input').value;

    // Convert input fields back to text containers
    attributeContainers.forEach(container => {
        container.innerHTML = container.querySelector('input').value;
    });


    // Revert container types to original
    modalTitle.setAttribute('data-original-type', 'title');
    attributeContainers.forEach(container => {
        container.setAttribute('data-original-type', 'text');
    });
}


// FUNCTION TO HANDLE ESCAPING THE FORM WHEN CLICKING THE IMAGE AGAIN
function revertFormOnEscape(movieId) {
    // Get the modal title and attribute containers
    const modalTitle = document.querySelector(`#movieModal-${movieId} .modal-title`);
    const attributeContainers = document.querySelectorAll(`#movieModal-${movieId} .modal-body p.card-text`);

    // Check if the form is currently in edit mode
    if (modalTitle.getAttribute('data-original-type') === 'title') {
        return;
    }

    // Revert the title to plain text
    modalTitle.innerHTML = modalTitle.getAttribute('data-original-content');

    // Revert attribute containers to text containers
    attributeContainers.forEach(container => {
        container.innerHTML = container.getAttribute('data-original-content');
    });


    // Change the Save Changes button back to Edit
    const saveEditButton = document.querySelector(`#movieModal-${movieId} .save-edit-button`);
    saveEditButton.innerHTML = 'Edit';
    saveEditButton.classList.remove('save-edit-button');
    saveEditButton.classList.add('edit-button');

    // Revert container types to original
    modalTitle.setAttribute('data-original-type', 'title');
    attributeContainers.forEach(container => {
        container.setAttribute('data-original-type', 'text');
    });
}

export {
    loaderAnimation, loadMovies, createMovie, editMovies, deleteMovie, deleteButtons
}