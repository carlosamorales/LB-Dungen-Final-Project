// client/src/pages/SplashPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import '../styles/SplashPage.css';

const SplashPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [addUser] = useMutation(ADD_USER);

  const handleSignUpClick = async () => {
    try {
      const { data } = await addUser({ variables: { username, password } });
      Auth.login(data.addUser.token);
      navigate('/home');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="splash-page">
      <h1>Welcome to</h1>
      <img src="src/assets/LD_Logo_1000px.png" alt="logo" className="logo" />
      <h2>About The Language Dungeon</h2>
      <div className="paragraph-container">
        <p className="paragraph-text">
          The Language Dungeon is your ultimate destination for language learning and exploration.
          Embark on an exciting journey through the realms of words and unlock the secrets of effective communication.
        </p>
      </div>
      <div className="signup-container">
        <h2>Get Started</h2>
        <p>Please create a <b>Username</b> and <b>Password</b> to begin your Language Learning Journey!</p>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSignUpClick}>Sign Up Now</button>
      </div>
      <footer>
        &copy; 2023 The Language Dungeon. All rights reserved.
      </footer>
    </div>
  );
};

export default SplashPage;
