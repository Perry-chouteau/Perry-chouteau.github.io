import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <header className='header'>
      <p/>
      {/*<NavLink to="/" className='w-10 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md px-10'>
        <p className='blue-text'>Home</p>
      </NavLink>*/}
      <nav className='flex text-lg gap-7 font-medium'>
      <NavLink to="/about" className={({isActive}) => isActive ? 'text-blue-500' : 'text-black'}>About</NavLink>
      <NavLink to="/projects" className={({isActive}) => isActive ? 'text-blue-500' : 'text-black'}>Projects</NavLink>
      <NavLink to="/voyage" className={({isActive}) => isActive ? 'text-blue-500' : 'text-black'}>Voyage</NavLink>
      </nav>
    </header>
  );
};

export default NavBar;