import React from 'react'

const MovieList = (props) => {

    const FavoriteComponent = props.favoriteComponent;

  return (
    <>
        {props.movies.map((movie, index)=>
        <div className='row align-items-start' key={index}>
            <div className='image-container d-flex justify-content-start'>
                <img src={movie.Poster} alt='movie'/>                
                <div onClick={()=>props.handleFavoritesClick(movie)} className='overlay d-flex align-items-center justify-content-center'>  
                    <FavoriteComponent/>
                </div>                
            </div>
        </div>
        )}
    </>
  )
}

export default MovieList