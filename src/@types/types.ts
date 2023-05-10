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
  imdbMovie: ImdbMovie | null;
  loading: boolean;
  loadingMore: boolean;
  updatePage: (v: number) => void;
  updateMoviesCallback: (v?: IMovie[]) => void;
  fetchMoreMoviesCallback: () => void;
  updateKeyword: (v: string) => void;
  clearMovies: () => void;
  updateCanFetchMore: (v: boolean) => void;
  fetchMovieByIMDB: (v: string) => void;
  updateLoading: (v: boolean) => void;
}

export interface ImdbMovie {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: IRating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export interface IRating {
  Source: string;
  Value: string;
}
