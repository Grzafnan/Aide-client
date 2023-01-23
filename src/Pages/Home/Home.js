import React, { useContext } from 'react';
import Banner from '../../components/Banner/Banner';
import Brand from '../../components/Brand/Brand';
import Shop from '../../components/Shop/Shop';
import { AuthContext } from '../../contexts/AuthProvider/Authprovider';

const Home = () => {
  const { user } = useContext(AuthContext)
  // console.log(user);
  return (
    <div className='section'>
      <Banner />
      <Brand />
      <Shop />
    </div >
  );
};

export default Home;