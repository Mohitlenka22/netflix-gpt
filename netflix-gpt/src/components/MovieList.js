import MovieCard from './MovieCard';
const MovieList = ({ title, movies }) => {
  // console.log(movies);
  return (
    <div className="p-4  text-white">
      <h1 className="p-4 font-bold text-3xl">{title}</h1>
      <div className="flex  overflow-x-scroll">
        <div className="flex">{movies && movies.map(movie => <MovieCard key={movie?.id} poster_path={movie?.poster_path} />)}</div>
      </div>
    </div>
  );
};

export default MovieList;
