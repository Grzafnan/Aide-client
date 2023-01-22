import React from 'react';
import Banner from '../../components/Banner/Banner';
import Brand from '../../components/Brand/Brand';
import Shop from '../../components/Shop/Shop';

const Home = () => {
  return (
    <div className='section'>
      <Banner />
      <Brand />
      <Shop />
    </div >
  );
};

export default Home;