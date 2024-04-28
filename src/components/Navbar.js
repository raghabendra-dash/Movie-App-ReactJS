import React from 'react';
import { addMovieToList,handleMovieSearch } from '../actions';
import { connect } from 'react-redux';
import firebase from '../firebase';

class Navbar extends React.Component {

    constructor(props)
    {
        super(props)
        
        this.state={
            searchText:''
        }

    }

    handleAddToMovies=(movie)=>{

        const {dispatch}=this.props;
        dispatch(addMovieToList(movie));

        this.db=firebase.firestore();
        this.db.collection('movie-list').add(movie)
        .then((docRef) => {
        console.log('Movie added to Firebase with ID: ', docRef.id);
        })
        .catch((error) => {
        console.error('Error adding movie to Firebase: ', error);
        });
        
    }

    handleChange=(event)=>{

        this.setState({
            searchText:event.target.value
        })
    }

    handleSearch=()=>{

        const {searchText}=this.state;
        const {dispatch}=this.props;
       
        dispatch(handleMovieSearch(searchText))

    }

    render()
    {
        const {result:movie,showSearchResults}=this.props.search;

        return (
            <div className="nav">
                <div className='search-container'>
                    <input onChange={this.handleChange}/>
                    <button id="search-btn" onClick={this.handleSearch}>Search</button>

                    {showSearchResults&&
                    <div className='search-results'>
                        <div className='search-result'>
                            <img src={movie.Poster} alt='search-pic>'/>
                            <div className='movie-info'>
                                <span>{movie.Title}</span>
                                <button onClick={()=>{this.handleAddToMovies(movie)}}>
                                    Add To Movies
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    
                    }
                </div>
             
            </div>
          );

    }
 
}

// class NavbarWrapper extends React.Component{
//     render(){
//       return (
//         <StoreContext.Consumer>
//           {(store)=>(
//             <Navbar dispatch={store.dispatch} search={this.props.search}/>
//           )}
//         </StoreContext.Consumer>
//       )
//     }
//   }

  const mapStateToProps=({search})=>{

    return {
      search
    }
  
  } 
  
//   const connectedNavbarComponent=connect(mapStateToProps)(Navbar);

export default connect(mapStateToProps)(Navbar);
