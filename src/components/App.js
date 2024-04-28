import React from 'react';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import {addMovies,setShowFavourites} from '../actions'
import { connect } from 'react-redux';
import firebase from '../firebase';


class App extends React.Component {

  componentDidMount() {
    this.db = firebase.firestore();
  
    this.db.collection('movie-list').onSnapshot((movieSnapshot) => {
      const movies = movieSnapshot.docs.map((doc) => {
        const data = doc.data();
        data['id'] = doc.id;
        return data;
      });
  
      this.db.collection('favourite').onSnapshot((favouritesSnapshot) => {
        const favourites = favouritesSnapshot.docs.map((doc) => {
          const data = doc.data();
          data['id'] = doc.id;
          return data;
        });
  
       
        this.props.dispatch(addMovies(movies, favourites));
      });
    });
  }
  

  isMovieFavourite = (movie)=>{

    const {movies} = this.props;

    const index=movies.favourites.indexOf(movie);

    if(index!==-1)
    {
      return true;
    }

    return false;
  }

  onChangeTab =(val)=>{

    this.props.dispatch(setShowFavourites(val))

  }

  render()
  {

    const {movies,search}=this.props;
    
    const {list,favourites,showFavorites}=movies;
    const displayMovies = showFavorites?favourites:list;

    
    return (
      <div className="App">
        <Navbar  search={search}/>
        <div className="main">
          <div className="tabs">
            <div className={`tab ${showFavorites?'':'active-tabs'}`} onClick={()=>{this.onChangeTab(false)}}>Movies</div>
            <div className={`tab ${showFavorites?'active-tabs':''}`} onClick={()=>{this.onChangeTab(true)}}>Favourites</div>
          </div>
          <div className="list">
            {displayMovies.map((movie,index)=>{
            return <MovieCard 
            movie={movie} 
            key={`movies-${index}`} 
            dispatch={this.props.dispatch}
            isFavourite={this.isMovieFavourite(movie)}
            />
            })}
          </div>

          {displayMovies.length===0?<div className='no-movies'>No Movies to Display</div>:null}
        </div>
      </div>
    );

  }

 
}


// class AppWrapper extends React.Component{
//   render(){
//     return (
//       <StoreContext.Consumer>
//         {(store)=>(
//           <App store={store}/>
//         )}
//       </StoreContext.Consumer>
//     )
//   }
// }

const mapStateToProps=(state)=>{

  return {
    movies:state.movies,
    search:state.search
  }


} 

const connectedAppComponent=connect(mapStateToProps)(App);

export default connectedAppComponent;
