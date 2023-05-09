import React from 'react';
import { IMovie, IMovieContext, ImdbMovie } from '../@types/types';
import { fetchMovies, fetchMovie } from '../api/movies';

export const MoviesContext = React.createContext<IMovieContext | null>(null);

export const MoviesProvider = ({ children }: React.PropsWithChildren) => {
  const [movies, setMovies] = React.useState<IMovie[] | null>(null);
  const [page, setPage] = React.useState<number>(6);
  const [keyword, setKeyword] = React.useState<string>('');
  const [canFetchMore, setCanFetchMore] = React.useState<boolean>(true);
  const [imdbMovie, setImdbMovie] = React.useState<ImdbMovie | null>(null);

  const clearMovies = React.useCallback(() => {
    setMovies(null);
  }, []);

  const updateKeyword = React.useCallback((keyword: string) => {
    setKeyword(keyword);
  }, []);

  const updateMoviesCallback = React.useCallback((movies?: IMovie[]) => {
    if (movies) {
      setMovies((prev) => prev?.concat(movies) || movies);
    }
  }, []);

  const updatePage = React.useCallback((page: number) => {
    setPage(page);
  }, []);

  const updateCanFetchMore = React.useCallback((bool: boolean) => {
    setCanFetchMore(bool);
  }, []);

  const fetchMoreMoviesCallback = React.useCallback(async () => {
    const response = await fetchMovies(keyword, page);
    if (!response.isLast) {
      setPage(page + 1);
      setCanFetchMore(true);
      setMovies((prev) => prev?.concat(response) || null);
    } else {
      setCanFetchMore(false);
    }
  }, [keyword, page]);

  const fetchMovieByIMDB = React.useCallback(async (imdb: string) => {
    const res = await fetchMovie(imdb);
    if (res.Response === 'True') {
      setImdbMovie(res);
    }

    return res.Response;
  }, []);

  return (
    <MoviesContext.Provider
      value={{
        movies,
        keyword,
        canFetchMore,
        imdbMovie,
        updatePage,
        updateKeyword,
        updateCanFetchMore,
        updateMoviesCallback,
        clearMovies,
        fetchMoreMoviesCallback,
        fetchMovieByIMDB,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
