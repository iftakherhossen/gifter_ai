import React from 'react';
import { Link } from 'react-router-dom';

import { logo } from '../assets';

const Navigation = () => {
     return (
          <header className="bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4] sticky top-0 z-20 shadow-sm">
               <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link to="/">
                         <img
                              src={logo}
                              alt="logo"
                              className="w-28 object-contain"
                              draggable={false}
                         />
                    </Link>
                    <Link to="/create-post" className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md">Create</Link>
               </div>
          </header>
     );
};

export default Navigation;