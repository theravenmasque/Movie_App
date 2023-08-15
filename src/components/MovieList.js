import React from "react";

const MovieList = (props) => {
    const FavouriteComponent = props.favouriteComponent;


    return (
        <>
            {props.movies.map((movie, index) => (
                <div className="col">
                    <div className=" image-container d-flex justify-content-start m-2">
                        <img height={300} src={movie.Poster} alt="movie" />
                        <div onClick={() => props.handleFavouriteClick(movie)} className="overlay d-flex align-items-center justify-content-center">
                            <FavouriteComponent />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default MovieList;