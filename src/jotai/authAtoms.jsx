// authAtoms.jsx
import { atom } from 'jotai';
import Cookies from 'js-cookie';

export const authAtom = atom({
  isLoggedIn: false,
  token: null,
  userId: null,
  email: '',
  posts: [],
});

// Fonction pour sauvegarder le token JWT dans un cookie
export const saveToken = (token) => {
  Cookies.set('jwt', token, { expires: 1 }); // Le cookie expire après 1 jour
  authAtom.token = token;
};

// Fonction pour récupérer le token JWT du cookie
export const getToken = () => {
  return Cookies.get('jwt');
};

// Fonction pour supprimer le token JWT du cookie
export const removeToken = () => {
  Cookies.remove('jwt');
  authAtom.token = null;
};

// Fonction pour sauvegarder les posts dans un cookie
export const savePosts = (posts) => {
  Cookies.set('posts', JSON.stringify(posts), { expires: 1 }); // Le cookie expire après 1 jour
};

// Fonction pour récupérer les posts du cookie
export const getSavedPosts = () => {
  const posts = Cookies.get('posts');
  return posts ? JSON.parse(posts) : [];
};

// Fonction pour supprimer les posts du cookie
export const removeSavedPosts = () => {
  Cookies.remove('posts');
};
