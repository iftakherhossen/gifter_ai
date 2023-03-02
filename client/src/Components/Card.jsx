import React from 'react';
import 'animate.css';

import { download } from '../assets';
import { downloadImage } from '../utils';

const Card = ({ _id, name, prompt, photo }) => {
     return (
          <div className="rounded-xl group relative card shadow-card hover:shadow-cardHover cursor-pointer">
               <img src={photo} alt={prompt} className="w-full h-auto object-cover rounded-xl" draggable={false} />
               <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute left-0 right-0 bottom-0 bg-[#232423d5] m-2 p-4 rounded-xl animate__animated animate__fadeInDown">
                    <p className="capitalize text-white overflow-y-auto text-base font-medium">{prompt}</p>
                    <div className="mt-3 flex justify-between items-center gap-2 border-t pt-3 border-[#232423d0]">
                         <div className="flex items-center gap-2">
                              <div className="w-9 h-9 relative flex justify-center items-center rounded-full bg-green-700 text-xl text-white uppercase font-bold select-none">{name[0]}</div>
                              <p className="text-white text-base select-none font-semibold">{name}</p>
                         </div>
                         <button type="button" onClick={() => downloadImage(_id, photo)} className="outline-none bg-transparent border-none">
                              <img src={download} alt="download" className="w-7 h-7 object-contain invert" draggable={false} />
                         </button>
                    </div>
               </div>
          </div>
     );
};

export default Card;