import { useEffect } from 'react';
import { API_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addTrailerVideo } from '../store/moviesSlice';

const useMovieTrailer = movieID => {
  const disatch = useDispatch();
  const getBackGroundVideo = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieID}/videos?language=en-US`, API_OPTIONS);

    const json = await res.json();
    const filterData = json.results.filter(video => video.type === 'Trailer');
    const trailer = filterData.length ? filterData[0] : json.results[0];
    disatch(addTrailerVideo(trailer));
  };
  useEffect(() => {
    getBackGroundVideo();
  }, []);
};

export default useMovieTrailer;
