import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { authAtom } from '../jotai/authAtoms.jsx';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useAtom(authAtom); // Utilisez l'atome d'authentification
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:1337/api/auth/local/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (data.jwt) {
        // Mettre à jour l'atome d'authentification avec les informations de l'utilisateur
        setAuth({ isLoggedIn: true, token: data.jwt, userId: data.user.id, email: data.user.email });
        console.log('Inscription réussie et utilisateur connecté');
        navigate('/profile'); // Redirige l'utilisateur vers la page de profil
      } else {
        console.error('Erreur lors de l\'inscription:', data.message);
      }
    } catch (error) {
      console.error('Erreur lors de la connexion à l\'API:', error);
    }
  };


  return (
    <div className="container mx-auto p-4 flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4">
  <div className="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4">
    Inscription
  </div>
  <div className="mb-4">
    <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
      Nom d'utilisateur
    </label>
    <input
      type="text"
      id="username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      required
    />
  </div>
  <div className="mb-4">
    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
      Email
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
  S'inscrire
</button>
  </div>
</form>
      </div>
    </div>
  );
}

export default Register;