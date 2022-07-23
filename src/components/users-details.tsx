import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Timer } from './timer';
import { UserResponceType } from './users-list';

type UserDetailsPropsType = {
  selectedUser: UserResponceType | null;
};

export const UserDetails = (props: UserDetailsPropsType) => {
  const [userDetails, setUserDetails] = useState<UserType | null>(null);

  const { selectedUser } = props;

  useEffect(() => {
    if (selectedUser) {
      axios
        .get<UserType>(`https://api.github.com/users/${selectedUser.login}`)
        .then((res) => setUserDetails(res.data));
    }
  }, [selectedUser]);

  return (
    <main>
      {userDetails && (
        <>
          <Timer selectedUser={selectedUser} setUserDetails={setUserDetails} />
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

export type UserType = {
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
