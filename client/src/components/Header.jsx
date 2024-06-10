import React from 'react';
import Navbar from './Navbar';
import LdSign from '../assets/LD_Sign_600px.png';
import '../styles/Header.css';

const Header = () => (
  <div className="header">
    <img src={LdSign} alt="Language Dungeon title on a wooden sign" className="header-image" />
    <Navbar />
  </div>
);

export default Header;
