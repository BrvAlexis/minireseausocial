import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAtom } from 'jotai';
import { authAtom } from '../jotai/authAtoms.jsx';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useAtom(authAtom);
  const navigate = useNavigate(); // Hook pour la redirection

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:1337/api/auth/local', {
      identifier: email,
      password
    })
    .then(response => {
      if (response.data.jwt) {
        setAuth({ isLoggedIn: true, token: response.data.jwt, userId: response.data.user.id, email });
        console.log('Connexion réussie et utilisateur connecté');
        navigate('/'); // Redirige l'utilisateur vers la page d'accueil
      } else {
        console.error('Erreur lors de la connexion :', response.data.message);
      }
    })
    .catch(error => {
      console.error('Il y a eu une erreur !', error);
    });
  };

  return (
    <div className="container mx-auto p-4 flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4">
          <div className="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4">
            Connexion
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Adresse Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Se connecter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;