import React, { useEffect } from 'react';
import Layout from '../../components/Layout';
import { MoviesContext } from '../../app/contextAPI';
import { IMovie } from '../../@types/types';
import { useNavigate } from 'react-router-dom';
import { Placeholder } from '../../assets';

function Results() {
  const ctx = React.useContext(MoviesContext);
  const navigateTo = useNavigate();

  const seeMore = (e: any) => {
    e.preventDefault();
    ctx?.fetchMoreMoviesCallback();
  };

  return (
    <Layout>
      <div className="w-full p-5 flex flex-col justify-center items-center">
        <div className="grid grid-cols-6 gap-4">
          {ctx?.movies &&
            ctx?.movies.map(({ Title, Poster }: IMovie, index: number) => (
              <div
                key={index}
                className="h-[380px] rounded overflow-hidden cursor-pointer"
                onClick={() => navigateTo('/preview/' + Title)}
              >
                <img
                  className="w-full object-cover h-full pointer-events-none"
                  src={Poster !== 'N/A' ? Poster : Placeholder}
                />
              </div>
            ))}
        </div>
        {ctx?.canFetchMore && (
          <button
            type="button"
            className="p-2 px-8 mt-4 font-medium outline-none rounded text-md bg-[#E40915] text-[rgb(255,255,255,.85)]"
            onClick={seeMore}
          >
            See more
          </button>
        )}
      </div>
    </Layout>
  );
}

export default Results;
