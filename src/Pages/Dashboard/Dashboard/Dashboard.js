import React from 'react';
import Navbar from '../../Shared/Navbar/Navbar';
import '../../Shared/Navbar/Navbar..css'
import './Dashboard.css'
import user from '../../../assets/dashboard/user.png'
import users from '../../../assets/dashboard/users.png'
import addProduct from '../../../assets/dashboard/add-product.png'
import { AiOutlineDown } from "react-icons/ai";
import { Link, NavLink, Outlet } from 'react-router-dom';

import { BsFillArrowLeftCircleFill } from 'react-icons/bs'
import { MdNotificationsNone } from 'react-icons/md'
import { RiMoonLine } from 'react-icons/ri'


const Dashboard = () => {


  return (
    <>
      {/* <Navbar /> */}
      <section className='dashboard-container'>
        <input type="checkbox" id="nav-toggle" />
        <div className="sidebar">
          <div className="sidebar-brand">
            <h1> <span className="fab fa-asymmetrik"> </span> <span>ADMIN PANEL</span>
            </h1>
          </div>
          <div className="sidebar-menu">
            <ul>
              <li>
                <NavLink to='' className={({ isActive }) =>
                  isActive ? "active" : undefined
                } >
                  <img src={users} alt=''></img>
                  <span>All Users</span>
                </NavLink>
              </li>

              <li>
                <NavLink to='add-user' className={({ isActive }) =>
                  isActive ? "active" : undefined
                }>
                  <img src={user} alt="" />
                  <span>Add User</span>
                </NavLink>
              </li>
              <li>
                <NavLink to='add-product' className={({ isActive }) =>
                  isActive ? "active" : undefined
                }>
                  <img src={addProduct} alt="" />
                  <span>Add Product</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="main-content">
          <header className='header-container'>
            <label htmlFor="nav-toggle">
              <span >
                <BsFillArrowLeftCircleFill />
              </span>
            </label>

            <div className="user-wrapper">
              <Link className='home-link' to='/'>Home</Link>

              <div>
                <RiMoonLine style={{ fontSize: '35px' }} />
              </div>
              <div className="notification-icon">
                <MdNotificationsNone style={{ fontSize: '35px' }} />
              </div>
              <img src="https://www.seekpng.com/png/detail/514-5147412_default-avatar-icon.png" width="40px" height="40px" alt="profile-img" />

            </div>
          </header>

          <main className='dashboard-main'>
            <Outlet />
          </main>
        </div>
      </section>
    </>
  );
};

export default Dashboard;