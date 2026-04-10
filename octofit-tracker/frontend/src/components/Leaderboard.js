import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(json => {
        console.log('Leaderboard fetched from:', endpoint);
        console.log('Leaderboard data:', json);
        setData(json.results || json);
      });
  }, [endpoint]);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {data.map((item, idx) => (
          <li key={idx}>{item.user ? `${item.user}: ${item.score}` : JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
};
export default Leaderboard;
