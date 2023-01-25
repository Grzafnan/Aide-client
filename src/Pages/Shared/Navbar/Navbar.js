import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../../components/Spinner/Spinner';
import { AuthContext } from '../../../contexts/AuthProvider/Authprovider';
import useRole from '../../../hooks/useRole';
import './Navbar..css'

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const [role, isRoleLoading] = useRole(user?.email)
  const openMenu = () => {
    setOpen(true)
  }

  const closeMenu = () => {
    setOpen(false)
  }

  if (isRoleLoading) {
    return <Spinner />
  }
  console.log(role);

  return (
    <>
      <header className="header">
        <nav className="nav container flex">
          <Link to='/' className="logo-link">
            <span className="logo-text">Shakil</span>
          </Link>
          <div className={`menu-content ${open ? 'open overflowY-hidden' : 'overflowY-scroll'}`}>
            <ul className="menu-list flex">
              <li><a href="#home" className="nav-link active-navlink">home</a></li>
              <li><a href="#shop" className="nav-link">Shop</a></li>

              {
                role === 'user' && (
                  <li>
                    <Link to="my-cart" className="nav-link">My Cart</Link>
                  </li>
                )
              }

              {role === 'admin' && (
                <>
                  <li>
                    <Link to="/dashboard" className="nav-link">Dashboard</Link>
                  </li>
                </>
              )
              }


              {
                user?.email || user?.uid ? (
                  <li>
                    <button onClick={logOut} className="nav-btn">Sign out</button>
                  </li>

                )
                  : (
                    <li>
                      <Link to="/login" className="nav-link">Log in</Link>
                    </li>
                  )
              }



            </ul>

            <button
              onClick={closeMenu}
              className='navClose-btn'
            >
              <i className='bx bx-x '></i>
            </button>
          </div>

          <div className="contact-content">
            <a href="tel:+880-1772-9090" className='contact-link flex'>
              <i className='bx bx-phone phone-icon' ></i>
              <span className="phone-number">+880-1772-9090</span>
            </a>

          </div>

          <button
            onClick={openMenu}
            className='navOpen-btn'
          >
            <i className='bx bx-menu'></i>
          </button>
        </nav>

      </header>

    </>
  );
};

export default Navbar;