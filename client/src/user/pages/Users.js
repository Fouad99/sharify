import React from 'react';

import UsersList from '../components/UsersList';

const Users = () => {
  /*
   * Dummy data. Will be changed when Api calls implemented
   */

  const USERS = [
    {
      id: 'u1',
      name: '
	    Foufou le Fou',
      image:
        'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      places: 3
    },
    {
      id: 'u2',
      name: 'Fasdish la biche',
      image:
        'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      places: 5
    },
    {
      id: 'u3',
      name: 'Alex beaudry',
      image:
        'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      places: 2
    },
    {
      id: 'u4',
      name: 'Qui est long',
      image:
        'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      places: 7
    }
  ];

  return <UsersList items={USERS} />;
};

export default Users;

