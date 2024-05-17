import React from 'react';

function Post() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <img src="/path-to-your-image.jpg" alt="avatar" className="w-12 h-12 rounded-full" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-lg font-medium text-gray-900 truncate">
            Nom d'utilisateur
          </p>
          <p className="text-sm text-gray-500 truncate">
            @username
          </p>
        </div>
        <div className="flex-shrink-0">
          <button type="button" className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-1 px-2 rounded">
            Suivre
          </button>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-gray-700">
          Contenu du post...
        </p>
      </div>
      <div className="mt-4 flex items-center">
        <div className="flex space-x-4">
          <button type="button" className="text-gray-500 hover:text-gray-600">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {/* Icone de like */}
            </svg>
            <span className="ml-1">J'aime</span>
          </button>
          <button type="button" className="text-gray-500 hover:text-gray-600">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {/* Icone de commentaire */}
            </svg>
            <span className="ml-1">Commenter</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Post;