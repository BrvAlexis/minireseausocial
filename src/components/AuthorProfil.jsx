import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AuthorProfile = ({ match }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:1337/api/users/${match.params.username}`, {
          headers: {
            Authorization: 'Bearer YOUR_JWT_TOKEN',
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [match.params.username]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{user.username}</h1>
      <p>{user.description}</p>
      {/* Display user's messages here */}
    </div>
  );
};

export default AuthorProfile;