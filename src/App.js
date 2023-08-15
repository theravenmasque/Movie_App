import { useEffect, useState } from 'react';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavoruites';
import RemoveFavourites from './components/RemoveFavourites';
import movieVault from './assets/img/Movie Vault.svg'
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favourites, setFevourites] = useState([]);

const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=45b05d8f`
    const response = await fetch(url);
    const responseJson = await response.json();
    console.log(responseJson);
    if (responseJson.Search){
        setMovies(responseJson.Search)
    };
}


useEffect(()=>{
    getMovieRequest(searchValue);
},[searchValue]);

useEffect(()=>{
  const movieFavourites = JSON.parse(localStorage.getItem('react-movie-app-favourites'));
  setFevourites(movieFavourites);
},[])

const saveToLocalStorage = (items) =>{
  localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
}

const addFavouriteMovie =(movie)=>{
  const newFavouriteList = [...favourites, movie];
  setFevourites(newFavouriteList);
  saveToLocalStorage(newFavouriteList);
};

const removeFavouriteMovie = (movie)=>{
  const newFavouriteList = favourites.filter(
    (favourite)=> favourite.imdbID !== movie.imdbID);
  setFevourites(newFavouriteList);
  saveToLocalStorage(newFavouriteList);
};

  return (
    
    <div className='movie-app' > 
    <div className="movie-app-wrapper">
      <div className="row d-flex align-items-center m-3">
          <MovieListHeading heading =  {<img src={movieVault} alt="logo"/> }  />        
      </div>
      <div>
      <div className='about-text'>
        <h2>Unlimited movies, series, <br />TV Shows and more</h2>
      </div>
      <SearchBox searchValue= {searchValue} setSearchValue = {setSearchValue}/>
      </div>
      
          <div className='movies'>
          <MovieList movies = {movies} handleFavouriteClick={addFavouriteMovie} favouriteComponent={AddFavourites}/>
      </div>
          
      
      </div> 
      <div className='red-separetor'></div> 
      <div className=" row d-flex align-items-center m-3">
        <div className='favourites d-flex justify-content-center align-items-center'>
        <h1>Favourites</h1>
        </div>
          <MovieListHeading/>
      </div>
      <div className='movies'>
          <MovieList movies = {favourites} handleFavouriteClick={removeFavouriteMovie} favouriteComponent={RemoveFavourites}/>
      </div>  
    </div>
  );
}

export default App;
