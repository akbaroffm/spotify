import React from 'react';
import Navlink from './Navlink';
import HomeIcon from '../assets/images/home.svg';
import SeachIcon from '../assets/images/search.svg';
import LibraryIcon from '../assets/images/library.svg';
import PlaylistIcon from '../assets/images/playlist.svg';
import LikedIcon from '../assets/images/liked.svg';

function Navbar() {
  return (
    <div>
      <ul className='flex flex-col gap-y-[10px]'>
        <li>
          <Navlink URL='/' imgURL={HomeIcon} title='Home' />
        </li>
        <li>
          <Navlink URL='/search' imgURL={SeachIcon} title='Search' />
        </li>
        <li className='mb-[40px]'>
          <Navlink URL='/library' imgURL={LibraryIcon} title='Your Library' />
        </li>
        <li>
          <Navlink URL='/playlist' imgURL={PlaylistIcon} title='Create Playlist' />
        </li>
        <li>
          <Navlink URL='/liked' imgURL={LikedIcon} title='Liked Songs' />
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
