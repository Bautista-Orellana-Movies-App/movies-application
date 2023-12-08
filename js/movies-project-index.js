"use strict"

import {loadMovies, deleteButtons, loaderAnimation} from "./movies-project-functions.js";



// Usage example


(async () => {

    loaderAnimation()
    //initial loading of movies
    await loadMovies();
    await deleteButtons()

})();







