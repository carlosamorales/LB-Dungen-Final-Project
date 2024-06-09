import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <nav>
    <ul>
      <li>
        <NavLink exact to="/" activeClassName="active">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/leaderBoard" activeClassName="active">
          Leaderboard
        </NavLink>
      </li>
      <li>
        <NavLink to="/quiz" activeClassName="active">
          Quiz
        </NavLink>
      </li>
      <li>
        <NavLink to="/donate" activeClassName="active">
          Donate
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Navbar;
