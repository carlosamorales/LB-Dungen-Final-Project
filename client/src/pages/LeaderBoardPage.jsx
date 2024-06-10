import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_TOP_PERFORMERS } from '../utils/queries';

const LeaderBoardPage = () => {
  const { loading, error, data } = useQuery(QUERY_TOP_PERFORMERS);

  useEffect(() => {
    if (error) {
      console.error("Error fetching top performers:", error);
    }
  }, [error]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="leaderboard">
      <h2>Top Performers</h2>
      <ul>
        {data.topPerformers.map((user, index) => (
          <li key={index}>
            {index + 1}. {user.username} - {user.points} points
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaderBoardPage;
