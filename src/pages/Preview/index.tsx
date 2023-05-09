import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IRating, ImdbMovie } from '../../@types/types';
import { MoviesContext } from '../../app/contextAPI';
import Layout from '../../components/Layout';
import ProgressiveImage from 'react-progressive-graceful-image';
import { Placeholder } from '../../assets';

function Preview() {
  const { slug } = useParams();
  const ctx = React.useContext(MoviesContext);
  const [movie, setMovie] = React.useState<ImdbMovie | null>();
  const navigateTo = useNavigate();

  React.useEffect(() => {
    if (!slug) navigateTo('/');
    if (!ctx?.imdbMovie) navigateTo('/');
    else setMovie(ctx?.imdbMovie);
  }, [slug, ctx?.imdbMovie, navigateTo]);

  const getRatingColor = (source: string) => {
    switch (source) {
      case 'Internet Movie Database':
        return 'text-imdb';
      case 'Rotten Tomatoes':
        return 'text-rotten';
      case 'Metacritic':
        return 'text-metacritic';
      default:
        'text-white';
    }
  };

  return (
    <Layout dark>
      <div className="w-full p-5 max-w-7xl m-auto">
        <div
          className="text-white text-lg self-start mb-2 cursor-pointer font-semibold"
          onClick={() => navigateTo(-1)}
        >
          Go back
        </div>
        <div>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-[48px] text-white mb-1 leading-none">
                {movie?.Title}
              </h1>
              <p className="text-white opacity-70 font-thin text-sm">
                {movie?.Released} • {movie?.Country} • {movie?.Runtime} •{' '}
                {movie?.Rated}
              </p>
            </div>
            <div>
              <div className="flex gap-4">
                {movie?.Ratings.map((rating: IRating) => (
                  <div
                    className={`flex flex-col justify-center items-center ${getRatingColor(
                      rating.Source
                    )}`}
                  >
                    <p className="text-md">{rating.Source}</p>
                    <p className="text-md font-medium">{rating.Value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="h-[480px] w-[400px] mb-1 rounded overflow-hidden">
              <ProgressiveImage
                src={
                  movie?.Poster !== 'N/A'
                    ? (movie?.Poster as string)
                    : Placeholder
                }
                placeholder={Placeholder}
              >
                {(src: string) => (
                  <img
                    className="w-full object-cover h-full pointer-events-none"
                    src={src}
                  />
                )}
              </ProgressiveImage>
            </div>
            <div>
              <div className="flex gap-2 mb-3">
                {movie?.Genre?.split(',').map((genre: string) => (
                  <div
                    key={genre}
                    className="text-white border border-white rounded px-2 py-1 opacity-60 cursor-pointer"
                  >
                    {genre}
                  </div>
                ))}
              </div>
              <div className="text-white opacity-80 my-4 text-sm">
                {movie?.Awards}
              </div>
              <div className="mb-3">
                <p className="text-md text-white opacity-60 mb-2">
                  Director:{' '}
                  <span className="font-semibold">{movie?.Director}</span>
                </p>
                <p className="text-md text-white opacity-60 mb-2">
                  Writer: <span className="font-semibold">{movie?.Writer}</span>
                </p>
                <p className="text-md text-white opacity-60 mb-2 ">
                  Stars: <span className="font-semibold">{movie?.Actors}</span>
                </p>
              </div>
              <div className="mt-8 max-w-[480px] text-white font-semibold opacity-60">
                Plot:
              </div>
              <div className="text-white opacity-80 max-w-[600px]">
                {movie?.Plot}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Preview;
