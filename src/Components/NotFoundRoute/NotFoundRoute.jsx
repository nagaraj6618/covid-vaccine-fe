import React from 'react';

const NotFoundRoute = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-6">The page you are looking for does not exist.</p>
        <a href="/" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default NotFoundRoute;
