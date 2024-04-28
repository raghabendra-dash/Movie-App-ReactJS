import React from 'react';
import { addFavourite,removeFavourite } from '../actions';
import firebase from '../firebase';


class MovieCard extends React.Component {

    handleFavoruriteClick =()=>{
        const {movie} =this.props;
        
        this.props.dispatch(addFavourite(movie));

        this.db=firebase.firestore();

        this.db.collection('favourite').add(movie)
        .then((docRef) => {
        console.log('Movie added to Firebase with ID: ', docRef.id);
        })
        .catch((error) => {
        console.error('Error adding movie to Firebase: ', error);
        });

    }

    handleUnFavoruriteClick =()=>{
        const {movie} =this.props;
        
        this.props.dispatch(removeFavourite(movie));

        this.db=firebase.firestore();

        this.db.collection('favourite').doc(movie.id).delete()
      .then(() => {
        console.log('Movie removed from Firebase successfully.');
      })
      .catch((error) => {
        console.error('Error removing movie from Firebase: ', error);
      });

    }

    render()
    {
        const {movie,isFavourite} =this.props;
        return (
            <div className="movie-card">
                <div className='left'>
                    <img alt="movie-poster" src={movie.Poster}/>
                </div>
                <div className='right'>
                    <div className='title'>{movie.Title}</div>
                    <div className='plot'>{movie.Plot}</div>
                    <div className='footer'>
                        <div className='rating'>{movie.imdbRating}</div>
                        {isFavourite?
                        <button className='unfavourite-btn'onClick={this.handleUnFavoruriteClick}>Unfavourite</button>:
                        <button className='favourite-btn'onClick={this.handleFavoruriteClick}>Favourite</button>}
                        
                    </div>
                </div>
             
            </div>
          );

    }
 
}

export default MovieCard;
