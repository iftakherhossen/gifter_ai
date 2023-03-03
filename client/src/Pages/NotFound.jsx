import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
     return (
          <div className="flex flex-col justify-center items-center text-center">
               <img 
                    src="https://cdn.dribbble.com/users/1175431/screenshots/6188233/404-error-dribbble-800x600.gif" 
                    alt="Not Found" 
                    className="w-1/2 mb-8" 
               />
               <Link to="/">
                    <button className="py-2.5 px-10 bg-blue-500 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 focus:ring-opacity-75 text-base focus:outline-none">Head to Home</button>
               </Link>
          </div>
     );
};

export default NotFound;