import React, { useEffect, useState } from 'react';
import { Search } from 'components/search';
import { UserDetails } from 'components/users-details';
import { UserResponceType, UsersList } from 'components/users-list';
import s from './App.module.css';

const App = () => {
  const initialSearchState = 'it-kamasutra';

  const [selectedUser, setSelectedUser] = useState<UserResponceType | null>(null);
  const [searchTerm, setSearchTerm] = useState(initialSearchState);

  useEffect(() => {
    if (selectedUser) {
      document.title = `Github Users Search | Looking for '${selectedUser.login}'`;
    } else {
      document.title = `Github Users Search`;
    }
  }, [selectedUser]);

  return (
    <div className={s.mainContainer}>
      <aside>
        <Search value={searchTerm} onSubmit={setSearchTerm} />
        <button onClick={() => setSearchTerm(initialSearchState)}>reset</button>
        <UsersList
          searchTerm={searchTerm}
          selectedUser={selectedUser}
          onUserSelect={setSelectedUser}
        />
      </aside>
      <UserDetails selectedUser={selectedUser} />
    </div>
  );
};

export default App;
