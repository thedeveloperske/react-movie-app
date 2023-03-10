import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavorites from './components/AddFavorites';
import RemoveFavorites from './components/RemoveFavorites';

const App = () => {

  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=59304c87`;

    const response = await fetch(url);
    const responseJson = await response.json();
    
    if (responseJson.Search){
      setMovies(responseJson.Search)
    }
  }

  useEffect(() => {
    getMovieRequest(searchValue)
  }, [searchValue]) 

  useEffect(() => {
    const movieFavorites = JSON.parse(localStorage.getItem('react-movie-app-favorites'));
    setFavorites(movieFavorites);
  },[])

  const saveToLocalStorage = (items) =>{
    localStorage.setItem('react-movie-app-favorites', JSON.stringify(items))
  }

  const addFavoriteMovie = (movie) => {
    const newFavoriteMovie = [...favorites, movie];
    setFavorites(newFavoriteMovie);
    saveToLocalStorage(newFavoriteMovie)
  }

  const removeFromFavorites = (movie) => {
    const newFavoriteMovie = favorites.filter((favorite) => favorite.imdbID !== movie.imdbID)
    setFavorites(newFavoriteMovie);
    saveToLocalStorage(newFavoriteMovie);
  }

  return (
    <div className='container-fluid movie-app'>
      <div className='d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Movies'/>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className='row'>
        <div className='d-flex align-items-center mt-4 mb-4'>
          <MovieList handleFavoritesClick={addFavoriteMovie} movies = {movies} favoriteComponent={AddFavorites} />
        </div>
      </div>
      <div className='d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Favorites'/>
      </div>
      <div className='row'>
        <div className='d-flex align-items-center mt-4 mb-4'>
          <MovieList handleFavoritesClick={removeFromFavorites} movies = {favorites} favoriteComponent={RemoveFavorites} />
        </div>
      </div>
    </div>
  )
}

export default App