import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('jwt'); // Récupère le JWT stocké dans le stockage local
    if (token) {
      axios.get('http://localhost:1337/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setUser(response.data);
        setFullName(response.data.username);
        setEmail(response.data.email ?? ''); // ou un autre champ correspondant au nom complet
        setDescription(response.data.description ?? '');
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
    }
  }, []);

  const handleUpdateProfile = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('jwt'); // Récupère le JWT stocké dans le stockage local
    if (token && user) {
      console.log('Envoi de la mise à jour avec la description:', description);
      axios.put(`http://localhost:1337/api/users/${user.id}`, {
        username: fullName,
        description
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        console.log('Profil mis à jour avec succès');
        // Mettre à jour l'état de l'utilisateur avec les nouvelles données
        setUser(response.data);
        setDescription(response.data.description ?? '');
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour du profil:', error);
      });
    }
  };

  if (!user) {
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
          <h3 className="text-lg font-bold">{fullName}</h3>
          {email && <p className="text-sm text-gray-600">{email}</p>}
          {description && <p className="text-sm text-gray-600">{description}</p>}
        </div>
        <form onSubmit={handleUpdateProfile} className="space-y-6">
          <div className="mb-4">
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              placeholder="Nom Complet"
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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