import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const Main = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0 })
  }, [pathname])

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Main;