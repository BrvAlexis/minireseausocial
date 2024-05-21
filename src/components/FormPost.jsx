import React, { useState } from 'react';
import axios from 'axios';
import { useAtom } from 'jotai';
import { authAtom } from '../jotai/authAtoms.jsx';

function FormPost() {
  const [text, setText] = useState('');
  const [auth, setAuth] = useAtom(authAtom);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (auth.token && auth.userId) {
      axios.post('http://localhost:1337/api/posts', {
        data: {
          text: text,
          user: auth.userId
        }
      }, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      })
      .then(response => {
        console.log('Post créé avec succès:', response.data);
        // Mettre à jour l'atome avec le nouveau post
        setAuth({ ...auth, posts: [...auth.posts, response.data.data] });
        setText('');
      })
      .catch(error => {
        console.error('Erreur lors de la création du post:', error.response.data);
      });
    } else {
      console.error('L\'utilisateur n\'est pas connecté ou les informations de l\'utilisateur ne sont pas disponibles.');
    }
  };

   // Afficher le formulaire uniquement si l'utilisateur est connecté
   if (!auth.isLoggedIn) {
    return null; // ou vous pouvez rediriger l'utilisateur vers la page de connexion
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl overflow-hidden p-6 space-y-6 max-w-md mx-auto">
  <textarea
    value={text}
    onChange={(e) => setText(e.target.value)}
    placeholder="Qu'avez-vous à dire ?"
    className="w-full rounded-md border border-gray-300 p-4 text-sm shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 transition duration-200 ease-in-out transform hover:-translate-y-1"
    required
  ></textarea>
  <button
    type="submit"
    className="mt-5 inline-block w-full cursor-pointer bg-[#276ef1] px-6 py-3 text-center font-semibold text-white transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
  >
    Publier
  </button>
</form>
  );
}

export default FormPost;