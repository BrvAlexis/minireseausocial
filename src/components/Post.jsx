import React from 'react';

function Post() {
    const username = "Nom d'utilisateur";
    const userHandle = "@username";
    const postContent = "Contenu du post...";
    
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              {/* Remplacez '/path-to-your-image.jpg' par le chemin de votre image */}
              <img src="/path-to-your-image.jpg" alt="avatar" className="w-12 h-12 rounded-full" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-lg font-medium text-gray-900 truncate">
                {username}
              </p>
              <p className="text-sm text-gray-500 truncate">
                {userHandle}
              </p>
            </div>
            <div className="flex-shrink-0">
              <button type="button" className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-1 px-2 rounded transition duration-300 ease-in-out">
                Suivre
              </button>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-700">
              {postContent}
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <button type="button" className="flex items-center text-gray-500 hover:text-gray-600 transition duration-300 ease-in-out">
              {/* Icône de like (exemple avec Heroicons) */}
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {/* ... */}
              </svg>
              <span className="ml-1">J'aime</span>
            </button>
            <button type="button" className="flex items-center text-gray-500 hover:text-gray-600 transition duration-300 ease-in-out">
              {/* Icône de commentaire (exemple avec Heroicons) */}
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {/* ... */}
              </svg>
              <span className="ml-1">Commenter</span>
            </button>
          </div>
        </div>
      );
    }

export default Post;