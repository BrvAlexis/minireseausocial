import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAtom } from 'jotai';
import { authAtom } from '../jotai/authAtoms.jsx';

function PostsList() {
  const [auth, setAuth] = useAtom(authAtom);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Vérifiez si l'utilisateur est connecté avant de faire la requête
    if (auth.isLoggedIn && auth.token) {
      axios
        .get('http://localhost:1337/api/posts?populate=user&sort=createdAt:desc', {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
        .then((response) => {
          if (response.data && Array.isArray(response.data.data)) {
            // Mettre à jour l'état avec les posts
            setPosts(response.data.data);
          } else {
            // Assurez-vous que posts est toujours un tableau
            setPosts([]);
          }
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des posts :', error);
          // Assurez-vous que posts est toujours un tableau
          setPosts([]);
        });
    }
  }, [auth.isLoggedIn, auth.token]);

  // Ajoutez des instructions console.log pour déboguer
  console.log('Auth:', auth);
  

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto my-4">
          <p className="text-gray-700">{post.attributes.text}</p>
          {/* Affichez l'adresse e-mail de l'auteur */}
          <p className="text-gray-500">Auteur : {auth.email}</p>
        </div>
      ))}
    </div>
  );
}

export default PostsList;

