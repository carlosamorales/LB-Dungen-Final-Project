import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SplashPage.css';
import { ADD_USER } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import AvatarSelection from '../components/AvatarSelection';

export default function SplashPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [addUser, { error }] = useMutation(ADD_USER);

  useEffect(() => {
    if (Auth.loggedIn()) {
      navigate('/home');
    }
  }, [navigate]);

  const handleSignUpClick = async () => {
    try {
      const { data } = await addUser({ variables: { username, password, avatar } });
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error('Error signing up:', e);
    }
  };

  return (
    <div className="splash-page">
      <h1>Welcome to</h1>
      <img src="src/assets/LD_Logo_1000px.png" alt="logo" className="logo" />
      <h2>About The Language Dungeon</h2>
      <div className="paragraph-container">
        <p>
          <span className="paragraph-text">
            The Language Dungeon is your ultimate destination for language learning and exploration.
            Embark on an exciting journey through the realms of words and unlock the secrets of effective communication.
          </span>
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
        <AvatarSelection setAvatar={setAvatar} />
        <button onClick={handleSignUpClick}>Sign Up Now</button>
      </div>
      {error && <div>Signup failed: {error.message}</div>}
      <footer>
        &copy; 2023 The Language Dungeon. All rights reserved.
      </footer>
    </div>
  );
}
