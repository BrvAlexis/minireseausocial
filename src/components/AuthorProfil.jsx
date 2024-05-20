import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAtom } from 'jotai';
import { useParams } from 'react-router-dom';
import { authAtom } from '../jotai/authAtoms.jsx';

const AuthorProfile = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]); // Ajout d'un état pour les posts
  const [auth] = useAtom(authAtom);
  const params = useParams();

  useEffect(() => {
    const userSlug = params.userId;

    if (auth.token && userSlug) {
      axios.get(`http://localhost:1337/api/users?filters[slug][$eq]=${userSlug}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((userResponse) => {
        if (userResponse.data && userResponse.data.length > 0) {
          const userData = userResponse.data[0];
          setUser(userData);

          // Maintenant, récupérez les posts de l'utilisateur
          axios.get(`http://localhost:1337/api/posts?populate=user&sort=createdAt:desc&filters[user][id][$eq]=${userData.id}`, {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          })
          .then((postsResponse) => {
            setPosts(postsResponse.data.data); // Assurez-vous d'accéder à la propriété data correcte
          })
          .catch((postsError) => {
            console.error('Error fetching posts:', postsError);
          });
        } else {
          console.log('No user found with this slug');
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
    } else {
      console.log('Missing auth token or user slug');
    }
  }, [params.userId, auth.token]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-sm mx-auto">
      <div className="bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-lg overflow-hidden">
        <div className="p-5">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">{user.username}</h2>
          <p className="text-gray-700">{user.description}</p>
          {/* Affichez les posts de l'utilisateur ici */}
          <div className="space-y-4 mt-4">
            {posts.map((post) => (
              <div key={post.id} className="bg-gray-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold">{post.attributes.text}</h3>
                
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorProfile;