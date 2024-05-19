import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Search from './pages/Search';
import Library from './pages/Library';
import Playlist from './pages/Playlist';
import LikedSongs from './pages/LikedSongs';
import './App.css';
import NavbarPart2 from './components/NavbarPart2';
import Activity from './components/Activity';

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  return (
    <>
      {code ? (
        <div className="flex mx-[20px]">
          <div className="w-[17%] mt-[40px]">
            <Navbar />
            <NavbarPart2/>
          </div>
          <div className="w-[66%] h-[100vh] overflow-auto">
            <Routes>
              <Route path="/" element={<Dashboard code={code} />} />
              <Route path="/search" element={<Search />} />
              <Route path="/library" element={<Library />} />
              <Route path="/playlist" element={<Playlist />} />
              <Route path="/liked" element={<LikedSongs />} />
            </Routes>
          </div>
          <div className="w-[17%] mt-[40px]">
            <Activity/>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;
