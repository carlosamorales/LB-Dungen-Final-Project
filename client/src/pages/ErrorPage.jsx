import React from 'react';
import '../styles/ErrorPage.css';

const ErrorPage = () => {
  return (
    <div className="error-page">
      <div className="error-content">
        <img src="path-to-your-logo.png" alt="Error Logo" className="error-logo" />
        <p className="error-text">Oops! Something went wrong.</p>
        <p className="error-message">Please try again later.</p>
      </div>
    </div>
  );
};

export default ErrorPage;
