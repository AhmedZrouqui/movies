import Search from '../../components/Search';
import Layout from '../../components/Layout';
import React from 'react';
import { MoviesContext } from '../../app/contextAPI';
import Loader from '../../components/Loader';

function Home() {
  const ctx = React.useContext(MoviesContext);

  if (ctx?.loading) {
    return <Loader />;
  }

  return (
    <Layout>
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-[70px] font-extrabold max-w-[900px] mb-8 text-white leading-[80px]">
            Unlimited movies, TV shows, and more!
          </h1>
        </div>
        <Search />
      </div>
    </Layout>
  );
}

export default Home;
