import React, { useState, useEffect } from 'react';

export default function App() {
  const [followers, setFollowers] = useState([]);
  const [username, setUsername] = useState('davidalves1');

  useEffect(async () => {
    handleFollowers();
  }, []);

  function handleChange(ev) {
    setUsername(ev.target.value);
  }

  async function handleFollowers() {
    try {
      if (!username) {
        return;
      }

      const githubFolowers = await fetch(`https://api.github.com/users/${username}/followers`);
      const data = await githubFolowers.json();

      setFollowers(data);

      document.title = `Folowers of ${username}`;
    } catch (err) {
      setFollowers([]);
    } 
  }

  return (
    <>
      <input type="text" placeholder="username" value={username} onChange={handleChange}/> <button onClick={handleFollowers}>Followers</button>
      <ul>
        {followers.map(folower => (
          <li key={folower.id}>
            <img
              src={folower.avatar_url}
              alt={folower.login}
              style={{ width: "50px", height: "auto", marginRight: "1rem" }}
            />
            <a
              href={folower.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {folower.login}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
