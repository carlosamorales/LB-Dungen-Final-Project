import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import '../styles/HomePage.css';
import Navbar from '../components/Navbar';
import GreyBrickBackground from '../assets/Grey_Brick_Background.png';

const ADD_USER = gql`
  mutation AddUser($username: String!, $password: String!, $avatar: String!) {
    addUser(username: $username, password: $password, avatar: $avatar) {
      token
      user {
        _id
        username
        avatar
      }
    }
  }
`;

export default function HomePage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(''); // State for selected avatar
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [addUser, { loading, error }] = useMutation(ADD_USER);

  const avatars = [
    'avatars/avatar1.png', // Adjust paths according to your folder structure
    'avatars/avatar2.png',
    'avatars/avatar3.png',
    // Add more avatar paths as needed
  ];

  const handleStartQuizClick = () => {
    navigate('/quiz');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('Submitting form with:', { username, password, avatar });

      const { data } = await addUser({
        variables: { username, password, avatar },
      });

      if (data) {
        console.log('User created successfully, response:', data);
        setSuccessMessage('User created successfully!');
        setErrorMessage('');
        setUsername('');
        setPassword('');
        setAvatar(''); // Reset avatar
      }
    } catch (error) {
      if (error.networkError && error.networkError.result && error.networkError.result.errors) {
        console.error('Network error:', error.networkError.result.errors);
        setErrorMessage(error.networkError.result.errors[0].message);
      } else if (error.graphQLErrors) {
        console.error('GraphQL error:', error.graphQLErrors);
        setErrorMessage(error.graphQLErrors[0].message);
      } else {
        console.error('Error creating user:', error.message);
        setErrorMessage(error.message);
      }
      alert(`Error creating user: ${error.message}`);
    }
  };

  return (
    <div className="home-page" style={{ backgroundImage: `url(${GreyBrickBackground})` }}>
      <Navbar />

      <h1>Welcome to</h1>
      <img src="src/assets/LD_Logo_1000px.png" alt="Language Dungeon" className="logo" />
      <h2>About The Language Dungeon</h2>
      <p>
        The Language Dungeon is your ultimate destination for language learning and exploration. Embark on an exciting journey through the realms of words and unlock the secrets of effective communication.
      </p>
      
      <div className="signup-container">
        <h2>Get Started</h2>
        <p>Please create a Username and Password to begin your Language Learning Journey!</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="avatar-selection">
            <h3>Select an Avatar</h3>
            <div className="avatars">
              {avatars.map((avatarPath, index) => (
                <img
                  key={index}
                  src={avatarPath}
                  alt={`Avatar ${index + 1}`}
                  className={`avatar ${avatar === avatarPath ? 'selected' : ''}`}
                  onClick={() => setAvatar(avatarPath)}
                />
              ))}
            </div>
          </div>
          <button type="submit" disabled={loading}>Sign Up Now</button>
        </form>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">Error: {errorMessage}</p>}
      </div>

      <h2>Continue Your Language Learning Journey</h2>
      <div className="paragraph-container">
        <p>
          <span className="paragraph-text">
            Pick up where you left off and dive into the exciting world of language learning. Choose a quiz to test your skills and unlock new levels of language mastery.
          </span>
        </p>
      </div>

      <div className="quiz-container">
        <h2>Start a Quiz</h2>
        <button onClick={handleStartQuizClick}>Begin Quiz</button>
      </div>

      <footer>
        &copy; 2023 The Language Dungeon. All rights reserved.
      </footer>
    </div>
  );
}
