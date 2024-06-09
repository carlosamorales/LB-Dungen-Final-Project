import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import '../index.css'; // Ensure you have some CSS for styling
import Navbar from '../components/Navbar';

const ADD_USER = gql`
  mutation AddUser($username: String!, $password: String!) {
    addUser(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export default function HomePage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [addUser, { loading }] = useMutation(ADD_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await addUser({ variables: { username, password } });
      if (data) {
        setSuccessMessage('User created successfully!');
        setErrorMessage('');
        setUsername('');
        setPassword('');
      }
    } catch (error) {
      setErrorMessage(error.message);
      alert(`Error creating user: ${error.message}`);
    }
  };

  return (
    <div className="home-page">
      <Navbar />
      <h1>Welcome to the Language Dungeon</h1>
      <img src="src/assets/LD_Logo_1000px.png" alt="Language Dungeon" className="logo" />
      <h2>About The Language Dungeon</h2>
      <p>The Language Dungeon is your ultimate destination for language learning and exploration.</p>
      <div>
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
          <button type="submit" disabled={loading}>Sign Up Now</button>
        </form>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">Error: {errorMessage}</p>}
      </div>
      <h2>Continue Your Language Learning Journey</h2>
      <div className="paragraph-container">
        <p>
          Pick up where you left off and dive into the exciting world of language learning.
          Choose a quiz to test your skills and unlock new levels of language mastery.
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
