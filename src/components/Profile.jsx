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

    
    return(

        
        <section>
        {/* Container */}
        <div className="py-16 md:py-24 lg:py-32">
          {/* Component */}
          <div className="mx-auto max-w-xl bg-[#f2f2f7] px-5 py-12 text-center md:px-10">
            {/* Title */}
            <h2 className="text-3xl font-bold md:text-5xl">Votre Profil</h2>
            <p className="mx-auto mb-5 mt-4 max-w-xl text-[#647084] md:mb-8">
              Gérez vos informations personnelles et vos paramètres de compte
            </p>
            {/* User Info */}
            <div className="mx-auto mb-14 mt-14 flex max-w-sm flex-col items-center justify-center">
          <h3 className="text-lg font-bold">{fullName}</h3>
          {email && <p className="text-sm text-[#647084]">{email}</p>}
          {description && <p className="text-sm text-[#647084]">{description}</p>}
        </div>
            {/* Form */}
            <form className="mx-auto mb-4 max-w-sm pb-4" onSubmit={handleUpdateProfile}>
              <div className="relative mb-4">
              <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mb-4 block w-full border border-black bg-white px-3 py-6 text-sm text-[#333333]"
            placeholder="Nom Complet"
            required
          />
              </div>
              <div className="relative mb-4">
              <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mb-4 block w-full border border-black bg-white px-3 py-6 text-sm text-[#333333]"
            placeholder="Description"
            required
          ></textarea>
              </div>
              <button type="submit" className="flex max-w-full justify-center bg-[#276ef1] px-8 py-4 text-center font-semibold text-white shadow-lg">
          <p className="font-bold">Mettre à jour le profil</p>
        </button>
      </form>
            <p className="text-sm text-[#636262]">
              Besoin d'aide? 
              <a href="#" className="font-[Montserrat,_sans-serif] text-sm font-bold text-black">
                Contactez le support
              </a>
            </p>
          </div>
        </div>
      </section>
          );
        }
        

export default Profile;