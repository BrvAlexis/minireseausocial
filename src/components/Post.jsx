import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HeartIcon, TrashIcon } from '@heroicons/react/24/outline';

function Post({ postId }) {
  const [post, setPost] = useState({
    username: "Nom d'utilisateur",
    userHandle: "@username",
    postContent: "Contenu du post...",
    likes: null,
    isLiked: false,
  });
  const token = localStorage.getItem('jwt'); // Récupère le JWT stocké dans le stockage local

  useEffect(() => {
    // Charger les détails du post
    axios.get(`http://localhost:1337/api/posts/${postId}?populate=user`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      const postData = response.data;
      setPost({
        ...post,
        username: postData.user.username,
        userHandle: postData.user.userHandle,
        postContent: postData.text,
        likes: postData.likes || 0, // Si null, initialiser à 0
      });
    })
    .catch(error => {
      console.error('Erreur lors de la récupération du post:', error);
    });
  }, [postId, token]);

  const handleLike = () => {
    // Supposons que userId est l'ID de l'utilisateur connecté
    // Vous devez remplacer cette partie par la logique réelle pour récupérer l'ID de l'utilisateur
    const userId = JSON.parse(localStorage.getItem('user')).id;
  
    // Vérifiez si l'utilisateur a déjà aimé le post
    const alreadyLiked = post.users_likes.includes(userId);
  
    // Calculez le nouveau nombre de likes
    const newLikes = alreadyLiked ? post.likes - 1 : post.likes + 1;
  
    // Mettez à jour la liste des utilisateurs qui ont aimé le post
    const updatedUsersLikes = alreadyLiked
      ? post.users_likes.filter(id => id !== userId)
      : [...post.users_likes, userId];
  
    // Envoyez la requête PUT pour mettre à jour le post
    axios.put(`http://localhost:1337/api/posts/${postId}`, {
      likes: newLikes,
      users_likes: updatedUsersLikes
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      // Mettre à jour l'état local des posts
      setPost({ ...post, likes: newLikes, isLiked: !alreadyLiked, users_likes: updatedUsersLikes });
    })
    .catch(error => {
      console.error('Erreur lors du like du post:', error);
    });
  };

  const handleDelete = () => {
    // Logique pour supprimer un post
    axios.delete(`http://localhost:1337/api/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      // Supprimer le post de l'affichage ou rediriger l'utilisateur
      console.log('Post supprimé avec succès');
    })
    .catch(error => {
      console.error('Erreur lors de la suppression du post:', error);
    });
  };


  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <img src="/path-to-your-image.jpg" alt="avatar" className="w-12 h-12 rounded-full" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-lg font-medium text-gray-900 truncate">
            {post.username}
          </p>
          <p className="text-sm text-gray-500 truncate">
            {post.userHandle}
          </p>
        </div>
        <div className="flex-shrink-0">
          <button type="button" className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-1 px-2 rounded transition duration-300 ease-in-out">
            Suivre
          </button>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-gray-700">
          {post.postContent}
        </p>
      </div>
      <div className="mt-4 flex items-center justify-between">
      <button type="button" onClick={handleLike} className={`flex items-center ${post.isLiked ? 'text-blue-600' : 'text-gray-500'} hover:text-blue-600 transition duration-300 ease-in-out`}>
          {/* Icône de like (exemple avec Heroicons) */}
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <HeartIcon className="h-6 w-6" />
          </svg>
          <span className="ml-1">{post.likes || 0} J'aime</span>
        </button>
        <button type="button" onClick={handleDelete} className="flex items-center text-gray-500 hover:text-gray-600 transition duration-300 ease-in-out">
          {/* Icône de poubelle (exemple avec Heroicons) */}
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <TrashIcon className="h-6 w-6" />
          </svg>
          <span className="ml-1">Supprimer</span>
        </button>
      </div>
    </div>
  );
}

export default Post;