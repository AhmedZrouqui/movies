import React from 'react';
import { MoviesContext } from '../../app/contextAPI';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';
import { fetchMovies } from '../../api/movies';

function Search() {
  const [title, setTitle] = React.useState<string>('');
  const ctx = React.useContext(MoviesContext);
  const navigateTo = useNavigate();

  const handleMovieSearch = async (e: any) => {
    e.preventDefault();
    ctx?.clearMovies();
    ctx?.updateLoading(true);
    ctx?.updateKeyword(title);
    for (let i = 1; i < 6; i++) {
      const response = await fetchMovies(title, i);
      if (!response.isLast) {
        ctx?.updateMoviesCallback(response);
        ctx?.updatePage(i + 1);
        ctx?.updateCanFetchMore(true);
      } else {
        ctx?.updateCanFetchMore(false);
      }
    }
    ctx?.updateLoading(false);
    navigateTo(ROUTES.RESULTS);
  };

  return (
    <div>
      <input
        type="text"
        name="search"
        className="w-[380px] p-4 outline-none rounded mr-2 text-md text-offBlack font-medium"
        placeholder="The last of us"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <button
        type="button"
        className="p-4 px-8 font-medium outline-none rounded text-md bg-[#E40915] text-[rgb(255,255,255,.85)]"
        onClick={handleMovieSearch}
      >
        Search
      </button>
    </div>
  );
}

export default Search;
