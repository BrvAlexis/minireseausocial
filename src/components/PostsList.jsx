import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAtom } from 'jotai';
import { authAtom, savePosts, getSavedPosts } from '../jotai/authAtoms.jsx';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { HeartIcon, TrashIcon } from '@heroicons/react/24/outline';

function PostsList() {
  const [auth] = useAtom(authAtom);
  const [posts, setPosts] = useState(getSavedPosts());

  useEffect(() => {
    const token = Cookies.get('jwt');
    if (token) {
      axios.get('http://localhost:1337/api/posts?populate=user&sort=createdAt:desc', {
        headers: { Authorization: `Bearer ${token}` },
      }).then((response) => {
        if (response.data && Array.isArray(response.data.data)) {
          const updatedPosts = response.data.data.map((post) => ({
            ...post,
            userId: post.attributes.user && post.attributes.user.data ? post.attributes.user.data.id : null,
            isLiked: false,
            likes: post.attributes.likes || 0,
          }));
          setPosts(updatedPosts);
          savePosts(updatedPosts);
        } else {
          setPosts([]);
        }
      }).catch((error) => {
        console.error('Erreur lors de la récupération des posts :', error);
      });
    }
  }, [auth.token]);

  const handleLike = (postId) => {
    const postIndex = posts.findIndex((p) => p.id === postId);
    if (postIndex === -1) return;
    const post = posts[postIndex];
    const wasLiked = post.isLiked;
    const currentLikes = post.likes === null ? 0 : post.likes;
    const newLikes = wasLiked ? currentLikes - 1 : currentLikes + 1;
    const usersLikes = post.users_likes || [];
    const updatedPosts = [...posts];
    updatedPosts[postIndex] = { ...post, isLiked: !wasLiked, likes: newLikes, users_likes: usersLikes };
    setPosts(updatedPosts);
    savePosts(updatedPosts);
    const data = {
      like: newLikes,
      users_likes: wasLiked ? usersLikes.filter((userId) => userId !== auth.userId) : [...usersLikes, auth.userId],
    };
    axios.put(`http://localhost:1337/api/posts/${postId}`, { data }, {
      headers: { Authorization: `Bearer ${auth.token}` },
    }).then((response) => {
      console.log('Likes mis à jour avec succès');
    }).catch((error) => {
      console.error('Erreur lors de la mise à jour des likes :', error);
      setPosts(posts);
    });
  };

  const handleDelete = (postId) => {
    const post = posts.find((p) => p.id === postId);
    if (!post || post.userId !== auth.userId) {
      console.error('Action non autorisée ou post introuvable.');
      return;
    }
    axios.delete(`http://localhost:1337/api/posts/${postId}`, {
      headers: { Authorization: `Bearer ${auth.token}` },
    }).then((response) => {
      const updatedPosts = posts.filter((p) => p.id !== postId);
      setPosts(updatedPosts);
      savePosts(updatedPosts);
      console.log('Post supprimé avec succès');
    }).catch((error) => {
      console.error('Erreur lors de la suppression du post :', error);
    });
  };

  return (
    <div className="flex flex-wrap -mx-2">
      {posts.map((post) => (
        <div key={post.id} className="p-2 w-1/5">
          <div className="bg-white p-6 rounded-lg shadow-lg">
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
                onClick={() => handleDelete(post.id)}
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