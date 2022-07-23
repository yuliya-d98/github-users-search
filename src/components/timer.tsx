import React from 'react';
import { useEffect, useState } from 'react';
import { UserType } from './users-details';
import { UserResponceType } from './users-list';

type TimerPropsType = {
  selectedUser: UserResponceType | null;
  setUserDetails: (userDetails: UserType | null) => void;
};

export const Timer = (props: TimerPropsType) => {
  const initialTime = 10;
  const [seconds, setSeconds] = useState(initialTime);

  const { selectedUser, setUserDetails } = props;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => {
      setSeconds(initialTime);
      clearInterval(intervalId);
    };
  }, [selectedUser]);

  useEffect(() => {
    if (seconds === 0) {
      setSeconds(initialTime);
      setUserDetails(null);
    }
  }, [seconds]);

  return <p>{seconds}</p>;
};
