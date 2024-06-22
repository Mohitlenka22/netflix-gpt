import { useSelector } from 'react-redux';
import languages from '../utils/languageConstants';
import model from '../utils/geminiai';
import { useRef } from 'react';
import { API_OPTIONS } from '../utils/constants';

const GptSearchBar = () => {
  const language = useSelector(store => store.config.language);
  const inputRef = useRef(null);
  const searchText = inputRef?.current?.value;
  console.log(searchText);

  const getSearchMovies = async movie => {
    const data = await fetch(
      'https://api.themoviedb.org/3/search/movie?query=' +
        movie +
        '&include_adult=false&language=en-US&primary_release_year=2024&page=1&region=India',
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearch = async () => {
    const getQuery =
      'Act as a Movie Recommendation System and suggest some movies for the query: ' +
      searchText +
      '. only give me names of 5 movies in a format of comma separated strings, give results without asking any further questions.';

    const result = await model.generateContent(getQuery);
    const response = await result.response;
    const text = response.text();
    const gptMovies = text.split(',');
    console.log(gptMovies);

    const promiseArray = gptMovies?.map(movie => getSearchMovies(movie));
    // console.log(promiseArray);
    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults);
  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form className="bg-black p-8 grid grid-cols-12" onSubmit={e => e.preventDefault()}>
        <input
          ref={inputRef}
          className="p-2 m-2 col-span-10 rounded-lg pl-4"
          type="text"
          placeholder={languages[language].searchPlaceHolder}
        />
        <button onClick={handleGptSearch} className="bg-red-600 m-2 py-2 px-6 text-white rounded-lg col-span-2">
          {languages[language].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
