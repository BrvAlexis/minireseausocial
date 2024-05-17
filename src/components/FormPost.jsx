import React, { useState } from 'react';
import axios from 'axios';

function FormPost() {
  const [text, setText] = useState('');
  const token = localStorage.getItem('jwt');
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const userId = user ? user.id : null;

  console.log('Token JWT:', token);
  console.log('ID de l\'utilisateur:', userId);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (token && userId) {
      axios.post('http://localhost:1337/api/posts', {
        data: {
          text: text,
          user: userId
        }
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        console.log('Post créé avec succès:', response.data);
        setText('');
      })
      .catch(error => {
        console.error('Erreur lors de la création du post:', error.response.data);
      });
    } else {
      console.error('L\'utilisateur n\'est pas connecté ou les informations de l\'utilisateur ne sont pas disponibles.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Qu'avez-vous à dire ?"
        className="w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        required
      ></textarea>
      <button type="submit" className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Publier
      </button>
    </form>
  );
}

export default FormPost;