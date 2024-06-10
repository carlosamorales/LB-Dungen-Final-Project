// client/src/components/Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => (
  <nav>
    <ul>
      <li>
        <NavLink exact="true" to="/" activeclassname="active">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/leaderBoard" activeclassname="active">
          Leaderboard
        </NavLink>
      </li>
      <li>
        <NavLink to="/quiz" activeclassname="active">
          Quiz
        </NavLink>
      </li>
      <li>
        <NavLink to="/donate" activeclassname="active">
          Donate
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Navbar;
