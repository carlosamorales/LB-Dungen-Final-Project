import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

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

const SignUpForm = () => {
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
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">Error: {errorMessage}</p>}
    </form>
  );
};

export default SignUpForm;
