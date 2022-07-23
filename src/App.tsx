import axios from 'axios';
import React, { ChangeEvent, useEffect, useState } from 'react';
import s from './App.module.css';

type SearchPropsType = {
  tempSearch: string;
  setTempSearch: (tempSearch: string) => void;
  setSearchTerm: (searchTerm: string) => void;
};

export const Search = (props: SearchPropsType) => {
  const { tempSearch, setTempSearch, setSearchTerm } = props;

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setTempSearch(value);
  };

  return (
    <div>
      <input placeholder="search" value={tempSearch} onChange={onInputChange} />
      <button onClick={() => setSearchTerm(tempSearch)}>find</button>
    </div>
  );
};

type UsersListPropsType = {
  users: UserResponceType[];
  selectedUser: UserResponceType | null;
  setSelectedUser: (user: UserResponceType | null) => void;
};

export const UsersList = (props: UsersListPropsType) => {
  const { users, selectedUser, setSelectedUser } = props;

  const onUserClick = (user: UserResponceType) => {
    setSelectedUser(user);
  };

  return (
    <ul>
      {users.map((u) => (
        <li
          key={u.id}
          className={selectedUser?.id === u.id ? s.selected : ''}
          onClick={() => onUserClick(u)}
        >
          {u.login}
        </li>
      ))}
    </ul>
  );
};

type UserDetailsPropsType = {
  userDetails: UserType | null;
};

export const UserDetails = (props: UserDetailsPropsType) => {
  const { userDetails } = props;
  return (
    <main>
      {userDetails && (
        <>
          <h2>{userDetails.login}</h2>
          <img src={userDetails.avatar_url} alt="avatar" />
          <p>Followers: {userDetails.followers}</p>
          <p>Location: {userDetails.location || 'no info'}</p>
          <a href={userDetails.url}>Link</a>
        </>
      )}
    </main>
  );
};

const App = () => {
  const [selectedUser, setSelectedUser] = useState<UserResponceType | null>(null);
  const [users, setUsers] = useState<UserResponceType[]>([]);
  const [tempSearch, setTempSearch] = useState('it-kamasutra');
  const [searchTerm, setSearchTerm] = useState('it-kamasutra');
  const [userDetails, setUserDetails] = useState<UserType | null>(null);

  useEffect(() => {
    if (selectedUser) {
      document.title = `Github Users Search | Looking for '${selectedUser.login}'`;
    } else {
      document.title = `Github Users Search`;
    }
  }, [selectedUser]);

  useEffect(() => {
    axios
      .get<UsersSearchResponceType>(`https://api.github.com/search/users?q=${searchTerm}`)
      .then((res) => setUsers(res.data.items));
  }, [searchTerm]);

  useEffect(() => {
    if (selectedUser) {
      axios
        .get<UserType>(`https://api.github.com/users/${selectedUser.login}`)
        .then((res) => setUserDetails(res.data));
    }
  }, [selectedUser]);

  return (
    <div className={s.mainContainer}>
      <aside>
        <Search
          tempSearch={tempSearch}
          setTempSearch={setTempSearch}
          setSearchTerm={setSearchTerm}
        />
        <UsersList users={users} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      </aside>
      <UserDetails userDetails={userDetails} />
    </div>
  );
};

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

type UserType = {
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
  name: null;
  company: null;
  blog: string;
  location: null;
  email: null;
  hireable: null;
  bio: null;
  twitter_username: null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
};
