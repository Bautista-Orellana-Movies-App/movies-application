"use strict"

import {loadMovies, loaderAnimation} from "./movies-project-functions.js";




(async () => {

    loaderAnimation()
    //initial loading of movies
    await loadMovies();








})();







