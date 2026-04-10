import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [data, setData] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(json => {
        console.log('Workouts fetched from:', endpoint);
        console.log('Workouts data:', json);
        setData(json.results || json);
      });
  }, [endpoint]);

  return (
    <div>
      <h2>Workouts</h2>
      <ul>
        {data.map((item, idx) => (
          <li key={idx}>{item.workout ? `${item.user}: ${item.workout} (${item.reps} reps)` : JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
};
export default Workouts;
