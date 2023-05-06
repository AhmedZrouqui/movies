import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IMovie } from '../../@types/types';
import { MoviesContext } from '../../app/contextAPI';
import Layout from '../../components/Layout';

function Preview() {
  const { slug } = useParams();
  const ctx = React.useContext(MoviesContext);
  const [movie, setMovie] = React.useState<IMovie | null>();
  const navigateTo = useNavigate();

  React.useEffect(() => {
    if (!slug) navigateTo('/');
    const _movie = ctx?.movies?.filter(
      (movie: IMovie) => movie.Title.toLowerCase() === slug?.toLowerCase()
    );
    if (!_movie || _movie?.length === 0) navigateTo('/');
    else setMovie(_movie[0]);
  }, [slug, ctx?.movies, navigateTo]);

  return (
    <Layout>
      <div className="w-full p-5">{movie?.Title}</div>
    </Layout>
  );
}

export default Preview;
