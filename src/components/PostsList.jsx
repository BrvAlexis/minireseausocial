import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAtom } from 'jotai';
import { authAtom } from '../jotai/authAtoms.jsx';
import { Link } from 'react-router-dom';
import { HeartIcon, TrashIcon } from '@heroicons/react/24/outline';

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
            const updatedPosts = response.data.data.map((post) => ({
              ...post,
              isLiked: false, // Ajoutez une nouvelle propriété pour gérer l'état du like
              likes: post.attributes.likes || 0, // Utilisez les likes existants ou démarrez à 0
            }));
            setPosts(updatedPosts);
          } else {
            setPosts([]);
          }
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des posts :', error);
          setPosts([]);
        });
    }
  }, [auth.isLoggedIn, auth.token]);


// Fonction pour gérer le like
const handleLike = (postId) => {
  // Trouvez le post correspondant par son ID
  const postIndex = posts.findIndex((p) => p.id === postId);
  if (postIndex === -1) return; // Post non trouvé

  const post = posts[postIndex];
  const wasLiked = post.isLiked;
  const currentLikes = post.likes === null ? 0 : post.likes; // Traiter null comme 0
  const newLikes = wasLiked ? currentLikes - 1 : currentLikes + 1;

  // Assurez-vous que users_likes est un tableau, sinon utilisez un tableau vide
  const usersLikes = post.users_likes || [];

  // Mettre à jour l'état local avant la requête pour une réactivité instantanée
  const updatedPosts = [...posts];
  updatedPosts[postIndex] = { ...post, isLiked: !wasLiked, likes: newLikes, users_likes: usersLikes };
  setPosts(updatedPosts);

  // Préparer les données pour la requête PUT
  const data = {
    like: newLikes,
    users_likes: wasLiked
      ? usersLikes.filter((userId) => userId !== auth.userId) // Enlever l'ID de l'utilisateur
      : [...usersLikes, auth.userId], // Ajouter l'ID de l'utilisateur
  };

  // Envoyer la requête PUT pour mettre à jour le post dans la base de données
  axios
    .put(`http://localhost:1337/api/posts/${postId}`, { data }, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
    .then((response) => {
      console.log('Likes mis à jour avec succès');
    })
    .catch((error) => {
      console.error('Erreur lors de la mise à jour des likes :', error);
      // En cas d'erreur, revenez à l'état précédent
      setPosts(posts);
    });
};
  // Ajoutez des instructions console.log pour déboguer
  console.log('Auth:', auth);
  

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto my-4">
          <p className="text-gray-700">{post.attributes.text}</p>
          {/* Utilisez le composant Link pour créer un lien vers la page AuthorProfile */}
          <Link to={`/author/${auth}`}>Auteur : {auth.email}</Link>
          <div className="mt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => handleLike(post.id)}
              className={`flex items-center ${post.isLiked ? 'text-blue-600' : 'text-gray-500'} hover:text-blue-600 transition duration-300 ease-in-out`}
            >
              <HeartIcon className="h-6 w-6" />
              <span className="ml-1">{post.likes} J'aime</span>
            </button>
            {/* ... */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostsList;

