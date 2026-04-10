import React, { useEffect, useState } from 'react';

const Users = () => {
  const [data, setData] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(json => {
        console.log('Users fetched from:', endpoint);
        console.log('Users data:', json);
        setData(json.results || json);
      });
  }, [endpoint]);

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {data.map((item, idx) => (
          <li key={idx}>{item.name ? `${item.name} (${item.email})` : JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
};
export default Users;
