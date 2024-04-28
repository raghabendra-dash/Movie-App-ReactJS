import { combineReducers } from 'redux';

import {ADD_MOVIES,ADD_FAVOURITE,REMOVE_FAVOURITE,SET_SHOW_FAVOURITE,ADD_MOVIE_TO_LIST,ADD_SEARCH_RESULT} from '../actions';


const initailMovieState = {
    list:[],
    favourites:[],
    showFavorites:false
}

export function movies(state=initailMovieState,action){
    // if(action.type===ADD_MOVIES)
    // {
    //     return {
    //         ...state,
    //         list:action.movies
    //     } 
    // }
    // return state;

    switch (action.type){
        case ADD_MOVIES:
            return {
                        ...state,
                        list:action.movies,
                        favourites:action.favourites
                    } 
        case ADD_FAVOURITE:
            return {
                ...state,
                favourites:[action.movie,...state.favourites]
            } 

        case REMOVE_FAVOURITE:
            const newFavouriteList = state.favourites.filter((movie)=>{
                return movie.Title!==action.movie.Title
            })
            return {
                ...state,
                favourites:newFavouriteList
            } 

            case SET_SHOW_FAVOURITE:
            return {
                ...state,
                showFavorites:action.val
            } 

            case ADD_MOVIE_TO_LIST:
            return {
                ...state,
                list:[action.movie,...state.list]
            }
        
            default:
                return state;

    }
}

const initailSearchState = {
    result:{},
    showSearchResults:false,
}

export function search(state=initailSearchState,action)
{
    switch (action.type){
      
        case ADD_SEARCH_RESULT:
            return {
                ...state,
                result:action.movie,
                showSearchResults:true,
            } 

            case ADD_MOVIE_TO_LIST:
                return {
                    ...state,
                    showSearchResults:false
                }

        
        
            default:
                return state;

    }

}


// const initailRootState = {
//     movies:initailMovieState,
//     search:initailSearchState
// }


// export default function rootReducer(state=initailRootState,action)
// {
//     return {
//         movies:movies(state.movies,action),
//         search:search(state.search,action)
//     }

// }


export default combineReducers({
    movies,
    search 
})


