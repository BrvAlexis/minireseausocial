import React, { useEffect } from 'react';
import axios from 'axios';
import { useAtom } from 'jotai';
import { authAtom } from '../jotai/authAtoms.jsx';


function PostsList() {
  const [auth, setAuth] = useAtom(authAtom);

  useEffect(() => {
    // Vérifiez si l'utilisateur est connecté avant de faire la requête
    if (auth.isLoggedIn && auth.token) {
      axios.get('http://localhost:1337/api/posts?populate=user', {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      })
      .then(response => {
        if (response.data && Array.isArray(response.data.data)) {
          // Mettre à jour l'atome avec les posts
          setAuth({ ...auth, posts: response.data.data });
        } else {
          // Assurez-vous que posts est toujours un tableau
          setAuth({ ...auth, posts: [] });
        }
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des posts:', error);
        // Assurez-vous que posts est toujours un tableau
        setAuth({ ...auth, posts: [] });
      });
    }
  }, [auth.isLoggedIn, auth.token]);

  // Assurez-vous que posts est un tableau avant de l'utiliser avec map
  const postsToRender = auth.posts || [];



  return (
    <div>
      {postsToRender.map((post) => (
        <div key={post.id} className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto my-4">
          <p className="text-gray-700">{post.attributes.text}</p>
          {/* Ajoutez ici d'autres détails du post si nécessaire */}
        </div>
      ))}
    </div>
  );
}

export default PostsList;

