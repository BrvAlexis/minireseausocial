import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAtom } from 'jotai';
import { authAtom, saveToken, removeToken } from '../jotai/authAtoms.jsx';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useAtom(authAtom);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:1337/api/auth/local', {
        identifier: email,
        password
      });
      if (response.data.jwt) {
        // Utilisez la fonction saveToken pour enregistrer le JWT dans un cookie
        saveToken(response.data.jwt);
        // Mettez à jour l'état global d'authentification avec Jotai
        setAuth({ ...auth, isLoggedIn: true, token: response.data.jwt, userId: response.data.user.id, email });
        console.log('Connexion réussie et utilisateur connecté');
        navigate('/'); // Redirige l'utilisateur vers la page d'accueil
      } else {
        console.error('Erreur lors de la connexion :', response.data.message);
      }
    } catch (error) {
      console.error('Il y a eu une erreur !', error);
      // Utilisez la fonction removeToken pour supprimer le JWT du cookie en cas d'erreur
      removeToken();
      setAuth({ ...auth, isLoggedIn: false, token: null, userId: null, email: '' });
    }
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
          <button
  type="submit"
  className="mt-5 inline-block w-full cursor-pointer bg-[#276ef1] px-6 py-3 text-center font-semibold text-white transition [box-shadow:rgb(171,_196,_245)_-8px_8px] hover:[box-shadow:rgb(171,_196,_245)_0px_0px]"
>
  Se connecter
</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;