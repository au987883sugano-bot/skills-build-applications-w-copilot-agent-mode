import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [data, setData] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(json => {
        console.log('Teams fetched from:', endpoint);
        console.log('Teams data:', json);
        setData(json.results || json);
      });
  }, [endpoint]);

  return (
    <div>
      <h2>Teams</h2>
      <ul>
        {data.map((item, idx) => (
          <li key={idx}>{item.name ? `${item.name}: ${item.description}` : JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
};
export default Teams;
