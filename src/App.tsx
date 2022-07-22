import React, { useEffect, useState } from 'react';
import s from './App.module.css';

function App() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  useEffect(() => {
    if (selectedUser) {
      document.title = `Github Users Search | Looking for '${selectedUser}'`;
    } else {
      document.title = `Github Users Search`;
    }
  }, [selectedUser]);

  const onUserClick = (username: string) => {
    setSelectedUser(username);
  };

  return (
    <div className={s.mainContainer}>
      <aside>
        <div>
          <input placeholder="search" />
          <button>find</button>
        </div>
        <ul>
          {['user1', 'user2'].map((u) => (
            <li
              key={u}
              className={selectedUser === u ? s.selected : ''}
              onClick={() => onUserClick(u)}
            >
              {u}
            </li>
          ))}
        </ul>
      </aside>
      <main>
        <h2>Username</h2>
        <div>Details</div>
      </main>
    </div>
  );
}

export default App;

type UserResponceType = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  score: number;
};

type UsersSearchResponceType = {
  total_count: number;
  incomplete_results: boolean;
  items: Array<UserResponceType>;
};
