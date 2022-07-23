import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import s from '../App.module.css';

type UsersListPropsType = {
  searchTerm: string;
  selectedUser: UserResponceType | null;
  onUserSelect: (user: UserResponceType | null) => void;
};

export const UsersList = (props: UsersListPropsType) => {
  const { searchTerm, selectedUser, onUserSelect } = props;

  const [users, setUsers] = useState<UserResponceType[]>([]);

  const onUserClick = (user: UserResponceType) => {
    onUserSelect(user);
  };

  useEffect(() => {
    axios
      .get<UsersSearchResponceType>(`https://api.github.com/search/users?q=${searchTerm}`)
      .then((res) => setUsers(res.data.items));
  }, [searchTerm]);

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

export type UserResponceType = {
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
