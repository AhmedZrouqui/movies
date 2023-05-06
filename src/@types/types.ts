export interface IMovie {
  Title: string;
  Poster: string;
  Type?: string;
  Year?: string;
  imdbID?: string;
}

export interface IMovieContext {
  movies: IMovie[] | null;
  keyword: string;
  canFetchMore: boolean;
  updatePage: (v: number) => void;
  updateMoviesCallback: (v?: IMovie[]) => void;
  fetchMoreMoviesCallback: () => void;
  updateKeyword: (v: string) => void;
  clearMovies: () => void;
  updateCanFetchMore: (v: boolean) => void;
}
