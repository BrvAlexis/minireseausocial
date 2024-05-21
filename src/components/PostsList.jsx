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
    if (auth.isLoggedIn && auth.token) {
      axios
        .get('http://localhost:1337/api/posts?populate=user&sort=createdAt:desc', {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
        .then((response) => {
          // Vérifiez que la réponse contient bien la propriété 'data'
          if (response.data && Array.isArray(response.data.data)) {
            const updatedPosts = response.data.data.map((post) => {
              // Assurez-vous que chaque post a une propriété 'user' et 'id' avant d'accéder à 'data.id'
              const userId = post.attributes.user && post.attributes.user.data ? post.attributes.user.data.id : null;
              return {
                ...post,
                userId: userId, // Utilisez l'ID de l'utilisateur extrait ou null si non disponible
                isLiked: false,
                likes: post.attributes.likes || 0,
              };
            });
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

const handleDelete = (postId) => {
  console.log('Posts actuels:', posts);
  console.log('ID du post à supprimer:', postId);

  const post = posts.find((p) => p.id === postId);
  if (!post) {
    console.error('Erreur : Le post à supprimer est introuvable.');
    return;
  }

  if (post.userId !== auth.userId) {
    console.log('Action non autorisée : vous ne pouvez pas supprimer les posts des autres utilisateurs.');
    return;
  }

  axios
    .delete(`http://localhost:1337/api/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`, // Utilisez le token JWT pour l'authentification
      },
    })
    .then((response) => {
      // Suppression réussie, mettez à jour l'état pour retirer le post de l'affichage
      setPosts(posts.filter((p) => p.id !== postId));
      console.log('Post supprimé avec succès');
    })
    .catch((error) => {
      console.error('Erreur lors de la suppression du post :', error);
    });
};


  // Ajoutez des instructions console.log pour déboguer
  console.log('Auth:', auth);
  

  return (
    <div className="flex flex-wrap -mx-2">
  {posts.map((post) => (
    <div key={post.id} className="p-2 w-1/5">
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <p className="text-gray-700">{post.attributes.text}</p>
      
      <Link to={`/author/${auth}`} className="text-blue-600 font-semibold">
        Auteur : {auth.email}
      </Link>
      <p className="text-gray-700">{post.attributes.text}</p>
      <div className="mt-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => handleLike(post.id)}
          className={`flex items-center ${post.isLiked ? 'text-blue-600' : 'text-gray-500'} hover:text-blue-600 transition duration-300 ease-in-out`}
        >
          <HeartIcon className="h-6 w-6" />
          <span className="ml-1">{post.likes} J'aime</span>
        </button>
        <button
          type="button"
          onClick={() => handleDelete(post.id)} // Passez l'identifiant du post ici
          className="flex items-center text-gray-500 hover:text-gray-600 transition duration-300 ease-in-out"
        >
          <TrashIcon className="h-6 w-6" />
          <span className="ml-1">Supprimer</span>
        </button>
        </div>
      </div>
    </div>
  ))}
</div>
  );
}

export default PostsList;

