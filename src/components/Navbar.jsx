import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { authAtom } from '../jotai/authAtoms';

function Navbar() {
  const navigate = useNavigate();
  const [, setAuth] = useAtom(authAtom);

  const handleLogout = () => {
    // Mettre à jour l'état d'authentification avec Jotai
    setAuth({
      isLoggedIn: false,
      token: null,
      userId: null,
      email: '',
      posts: []
    });
    // Rediriger l'utilisateur vers la page de connexion
    navigate('/login');
  };

  return (
    <section>
      <div className="h-auto w-screen">
        <nav className="font-inter mx-auto h-auto w-full max-w-[1600px] lg:relative lg:top-0">
          <div className="flex flex-col px-6 py-6 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-4 xl:px-20">
            <Link to="/" className="relative float-left bg-transparent leading-[0] text-[#333333] no-underline hover:outline-0 max-[991px]:mr-auto max-[767px]:pl-0" aria-label="home">
              {/* Ici, vous pouvez insérer votre logo ou du texte si vous n'avez pas de logo */}
              <strong>MiniRS</strong>
            </Link>
            <div className="flex flex-col space-y-8 lg:space-x-1 lg:space-y-0 lg:flex-row lg:mt-0">
              <Link to="/Profile" className="mt-5 inline-block cursor-pointer bg-[#276ef1] px-6 py-3 text-center font-semibold text-white transition [box-shadow:rgb(171,_196,_245)_-8px_8px] hover:[box-shadow:rgb(171,_196,_245)_0px_0px] md:mt-0">Mon Profil</Link>
            </div>
            <div className="flex flex-col space-y-8 lg:space-x-3 lg:space-y-0 lg:flex-row lg:mt-0">
              <Link to="/login" className="mt-5 inline-block cursor-pointer bg-[#276ef1] px-6 py-3 text-center font-semibold text-white transition [box-shadow:rgb(171,_196,_245)_-8px_8px] hover:[box-shadow:rgb(171,_196,_245)_0px_0px] md:mt-0">Connexion</Link>
              <button onClick={handleLogout} className="mt-5 inline-block cursor-pointer bg-[#276ef1] px-6 py-3 text-center font-semibold text-white transition [box-shadow:rgb(171,_196,_245)_-8px_8px] hover:[box-shadow:rgb(171,_196,_245)_0px_0px] md:mt-0">
                Déconnexion
              </button>
              <Link to="/Register" className="mt-5 inline-block cursor-pointer bg-[#276ef1] px-6 py-3 text-center font-semibold text-white transition [box-shadow:rgb(171,_196,_245)_-8px_8px] hover:[box-shadow:rgb(171,_196,_245)_0px_0px] md:mt-0">Inscription</Link>
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
}

export default Navbar;

