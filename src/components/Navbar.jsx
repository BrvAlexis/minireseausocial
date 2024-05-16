import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
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
              <Link to="/Profile" className="text-lg no-underline text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md">Mon Profil</Link>
              
            </div>
            <div className="flex flex-col space-y-8 lg:space-x-3 lg:space-y-0 lg:flex-row lg:mt-0">
              <Link to="/login" className="text-lg no-underline text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md">Connexion</Link>
              <Link to="/Register" className="text-lg no-underline text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md">Inscription</Link>
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
}

export default Navbar;

