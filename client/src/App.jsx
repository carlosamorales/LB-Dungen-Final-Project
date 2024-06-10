import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Header from './components/Header';
import Cursor from './components/Cursor';
import ErrorPage from './pages/ErrorPage.jsx';
import HomePage from './pages/HomePage';
import LeaderBoardPage from './pages/LeaderBoardPage.jsx';
import QuizListPage from './pages/QuizListPage.jsx';
import QuizDetailPage from './pages/QuizDetailPage.jsx';
import SplashPage from './pages/SplashPage.jsx';
import Donate from './pages/Donate.jsx';

import './App.css';

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const location = useLocation();

  return (
    <ApolloProvider client={client}>
      <div className="flex-column justify-flex-start min-100-vh">
        {location.pathname !== '/' && <Header />}
        <div className="container">
          <Cursor />
          <Routes>
            <Route path="/" element={<SplashPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/leaderBoard" element={<LeaderBoardPage />} />
            <Route path="/quiz" element={<QuizListPage />} />
            <Route path="/quiz/:quizId" element={<QuizDetailPage />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
