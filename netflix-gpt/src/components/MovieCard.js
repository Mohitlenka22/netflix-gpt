import { IMAGE_CDN_URL } from '../utils/constants';

const MovieCard = ({ poster_path }) => {
  return (
    <div className="w-48 object-contain m-2 transition-transform duration-100 transform hover:scale-110">
      <img className="h-56 w-48" src={IMAGE_CDN_URL + poster_path} alt="movieImage" />
    </div>
  );
};

export default MovieCard;
