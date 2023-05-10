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
            {ctx?.loadingMore ? (
              <div className="text-center">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-6 h-6 mr-2 text-[transparent] animate-spin fill-white"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              'See More'
            )}
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
