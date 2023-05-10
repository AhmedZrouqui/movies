import React from 'react';
import Layout from '../../components/Layout';
import { MoviesContext } from '../../app/contextAPI';
import { IMovie } from '../../@types/types';
import { useNavigate } from 'react-router-dom';
import { Placeholder } from '../../assets';
import ProgressiveImage from 'react-progressive-graceful-image';
import Loader from '../../components/Loader';

function Results() {
  const ctx = React.useContext(MoviesContext);
  const navigateTo = useNavigate();
  const seeMore = (e: any) => {
    e.preventDefault();
    ctx?.fetchMoreMoviesCallback();
  };

  const handleMovieClick = async (t: string, imdb?: string) => {
    if (imdb) {
      ctx?.fetchMovieByIMDB(imdb);
      if (!ctx?.loading) {
        navigateTo('/preview/' + t);
      }
    }
  };

  console.log(!ctx?.movies);

  if (ctx?.loading) {
    return <Loader />;
  }

  return (
    <Layout dark>
      <div className="w-full p-5 flex flex-col justify-center items-center max-w-7xl m-auto">
        <div
          className="text-white text-lg self-start mb-2 cursor-pointer font-semibold  "
          onClick={() => navigateTo(-1)}
        >
          Go back
        </div>

        <div className="grid grid-cols-5 gap-4">
          {ctx?.movies &&
            ctx?.movies.map(
              ({ Title, Poster, Year, imdbID }: IMovie, index: number) => (
                <div
                  key={index}
                  className="rounded overflow-hidden cursor-pointer"
                  onClick={() => handleMovieClick(Title, imdbID)}
                >
                  <div className="h-[300px] mb-1">
                    <ProgressiveImage
                      src={Poster !== 'N/A' ? Poster : Placeholder}
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
                  <div className="mb-2">
                    <p className="text-white max-w-[100%] overflow-ellipsis whitespace-nowrap overflow-hidden">
                      {Title}
                    </p>
                    <p className="text-white opacity-60 text-sm">{Year}</p>
                  </div>
                </div>
              )
            )}
        </div>
        {ctx?.canFetchMore && (
          <button
            type="button"
            className="p-2 px-8 mt-4 font-medium outline-none rounded text-md bg-[#E40915] text-white"
            onClick={seeMore}
          >
            See more
          </button>
        )}
        <div>
          {!ctx?.movies && (
            <h1 className="text-white">
              No matching results for "{ctx?.keyword}"
            </h1>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Results;
