import axios from 'axios';

const url = new URL(
  'https://www.omdbapi.com/?apikey=' + import.meta.env.VITE_APP_OMDB_KEY
);

export async function fetchMovies(title: string, page?: number) {
  const { data } = await axios.get(url.toString(), {
    params: { s: title, page: page },
  });

  return data.Search || { isLast: true };
}

export async function fetchMovie(imdb: string) {
  return axios
    .get(url.toString(), {
      params: { i: imdb },
    })
    .then((res) => res.data);
}
