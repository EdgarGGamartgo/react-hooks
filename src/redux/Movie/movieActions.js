import { 
    FETCH_MOVIE_REQUEST,
 } from "./movieTypes"

export const fetchMovieRequest = (payload) => {
    return {
        type: FETCH_MOVIE_REQUEST,
        payload
    }
}
