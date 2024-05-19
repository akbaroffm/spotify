import React from 'react';
import { NavLink } from 'react-router-dom';

function Navlink({ URL, title, imgURL }) {
  return (
    <NavLink className='flex items-center text-white space-x-4' to={URL}>
      <img src={imgURL} alt="icon" width={25} height={28} />
      <span className='font-bold text-lg'>{title}</span>
    </NavLink>
  );
}

export default Navlink;
