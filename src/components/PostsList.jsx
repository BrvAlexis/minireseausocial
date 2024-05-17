import React, { useState, useEffect } from 'react';
import axios from 'axios';


function PostsList() {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem('jwt');

  useEffect(() => {
    axios.get('http://localhost:1337/api/posts?populate=user', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      // Assurez-vous que la réponse est bien structurée comme attendu
      if (response.data && Array.isArray(response.data.data)) {
        // Mise à jour de l'état avec les posts
        setPosts(response.data.data);
      }
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des posts:', error);
    });
  }, [token]);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto my-4">
          <p className="text-gray-700">{post.attributes.text}</p>
          {/* Ajoutez ici d'autres détails du post si nécessaire */}
        </div>
      ))}
    </div>
  );
}

export default PostsList;