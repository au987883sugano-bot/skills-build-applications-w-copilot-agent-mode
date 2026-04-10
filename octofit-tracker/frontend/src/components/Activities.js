import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [data, setData] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(json => {
        console.log('Activities fetched from:', endpoint);
        console.log('Activities data:', json);
        setData(json.results || json);
      });
  }, [endpoint]);

  return (
    <div>
      <h2>Activities</h2>
      <ul>
        {data.map((item, idx) => (
          <li key={idx}>{item.activity ? `${item.user}: ${item.activity} (${item.duration} min)` : JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
};
export default Activities;
