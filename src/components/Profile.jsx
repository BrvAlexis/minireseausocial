import React, { useEffect } from 'react';
import axios from 'axios';
import { useAtom } from 'jotai';
import { authAtom } from '../jotai/authAtoms.jsx'; // Assurez-vous que le chemin est correct

function Profile() {
  const [auth, setAuth] = useAtom(authAtom);

  useEffect(() => {
    // Utilisez l'ID de l'utilisateur et le token stockés dans authAtom
    if (auth.isLoggedIn && auth.token && auth.userId) {
      axios.get(`http://localhost:1337/api/users/${auth.userId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      })
      .then(response => {
        // Mettre à jour l'atome avec les informations de l'utilisateur
        setAuth({ ...auth, ...response.data });
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
    }
  }, [auth.isLoggedIn, auth.token, auth.userId]);

  const handleUpdateProfile = (event) => {
    event.preventDefault();
    if (auth.token && auth.userId) {
      axios.put(`http://localhost:1337/api/users/${auth.userId}`, {
        email: auth.email,
        description: auth.description
      }, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      })
      .then(response => {
        setAuth({ ...auth, ...response.data });
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour du profil:', error);
      });
    }
  };

  if (!auth.userId) {
    return <div>Loading...</div>;
  }

  return (
    <section className="flex justify-center items-center h-screen">
      <div className="container mx-auto max-w-xl bg-white shadow-lg rounded-lg px-8 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 md:text-5xl">Votre Profil</h2>
        <p className="mx-auto my-4 text-center text-gray-600">
          Gérez vos informations personnelles et vos paramètres de compte
        </p>
        <div className="mx-auto mt-8 mb-12 flex max-w-sm flex-col items-center justify-center">
          <h3 className="text-lg font-bold">{auth.username}</h3>
          {auth.email && <p className="text-sm text-gray-600">{auth.email}</p>}
          {auth.description && <p className="text-sm text-gray-600">{auth.description}</p>}
        </div>
        <form onSubmit={handleUpdateProfile} className="space-y-6">
          <div className="mb-4">
            <input
              type="text"
              value={auth.username}
              onChange={(e) => setAuth({ ...auth, username: e.target.value })}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              placeholder="Nom Complet"
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              value={auth.description}
              onChange={(e) => setAuth({ ...auth, description: e.target.value })}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              placeholder="Description"
              required
            ></textarea>
          </div>
          <button type="submit" className="w-full rounded-md bg-blue-500 px-4 py-2 text-center font-semibold text-white shadow-lg hover:bg-blue-700">
            Mettre à jour le profil
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Besoin d'aide? 
          <a href="#" className="font-bold text-black">
            Contactez le support
          </a>
        </p>
      </div>
    </section>
  );
}

export default Profile;