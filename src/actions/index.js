// {
//     type:"ADD_MOVIES",
//     movies:[{}]
// }


// action types
export const ADD_MOVIES = "ADD_MOVIES";
export const ADD_FAVOURITE = "ADD_FAVOURITE";
export const REMOVE_FAVOURITE = "REMOVE_FAVOURITE";
export const SET_SHOW_FAVOURITE = "SET_SHOW_FAVOURITE";
export const ADD_MOVIE_TO_LIST = "ADD_MOVIE_TO_LIST";
export const ADD_SEARCH_RESULT="ADD_SEARCH_RESULT";


// action creators
export const addMovies =(movies,favourites)=>{
    return {
        type:ADD_MOVIES,
        movies,
        favourites
        }
}

export const addFavourite =(movie)=>{
    return {
        type:ADD_FAVOURITE,
        movie
        }
}

export const removeFavourite =(movie)=>{
    return {
        type:REMOVE_FAVOURITE,
        movie
        }
}

export const setShowFavourites =(val)=>{
    return {
        type:SET_SHOW_FAVOURITE,
        val
        }
}

export const addMovieToList =(movie)=>{

    return {
        type:ADD_MOVIE_TO_LIST,
        movie
        }
}

export function handleMovieSearch(movie){
    const url= `https://www.omdbapi.com/?apikey=c6f6db1d&t=${movie}`;


    return function(dispatch)
    {
        fetch(url)
        .then(response=>response.json())
        .then(movie=>{
            //dispatch an action
            console.log('movie',movie)
            dispatch(movieSearchResult(movie))
        })
        
    }
   
}

export const movieSearchResult =(movie)=>{
    return {
        type:ADD_SEARCH_RESULT,
        movie
        }
}