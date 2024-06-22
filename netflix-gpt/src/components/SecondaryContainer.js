import { useSelector } from 'react-redux';
import MovieList from './MovieList';

const SecondaryContainer = () => {
  const movies = useSelector(store => store.movies);
  return (
    <div className=" bg-gray-950">
      <div className="-mt-52 relative z-20">
        <MovieList title={'Now Playing'} movies={movies?.nowPlayingMovies} />
      </div>
      <MovieList title={'Popular Movies'} movies={movies?.popularMovies} />
      <MovieList title={'Top Rated'} movies={movies?.topRatedMovies} />
      <MovieList title={'Upcoming Movies'} movies={movies?.upcomingMovies} />
    </div>
  );
};

export default SecondaryContainer;
