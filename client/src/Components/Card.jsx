import 'animate.css';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

import { download } from '../assets';
import { downloadImage } from '../utils';

const Card = ({ _id, name, prompt, photo }) => {
     //const savedItems = ['6400eba715dac7cd9ed8fca4', '6400edbdf5f70e0d1d142a65', '6400eba715dac7cd9ed8fca3'];

     const [marked, setMarked] = useState(false);
     const [savedItems, setSavedItems] = useState(['6400eba715dac7cd9ed8fca4', '6400edbdf5f70e0d1d142a65', '6400eba715dac7cd9ed8fca3']);

     const handleBookmark = (e, _id) => {
          e.preventDefault();

          setMarked(!marked);
          marked === false ? toast.success("Post saved successfully!") : toast("Post removed from saved items!");
          setSavedItems(...savedItems, _id)
          console.log(_id);
     }

     console.log(savedItems)

     return (
          <div className="rounded-xl group relative card shadow-card hover:shadow-cardHover cursor-pointer overflow-hidden">
               <img src={photo} alt={prompt} className="w-full h-auto object-cover rounded-xl" draggable={false} />
               <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute left-0 right-0 bottom-0 bg-[#232423d5] m-2 p-4 rounded-xl animate__animated animate__fadeInDown">
                    <p className="capitalize text-white overflow-y-auto text-base font-medium cardPrompt">{prompt}</p>
                    <div className="mt-3 flex justify-between items-center gap-2">
                         <div className="flex items-center gap-2.5">
                              <div className="w-9 h-9 relative flex justify-center items-center rounded-full bg-green-700 text-xl text-white uppercase font-bold select-none">{name[0]}</div>
                              <p className="text-white text-base select-none font-semibold">{name}</p>
                         </div>
                         <div className="flex items-center gap-2.5">
                              <button type="button" onClick={() => downloadImage(_id, photo)} className="outline-none bg-transparent border-none">
                                   <img src={download} alt="download" className="w-7 h-7 object-contain invert" draggable={false} />
                              </button>
                              {
                                   marked === true ? <button type="button" onClick={() => handleBookmark(_id)} className="outline-none bg-transparent border-none">
                                        <i className="ri-heart-fill text-[1.65rem] text-red-500"></i>
                                   </button> : <button type="button" onClick={(e) => handleBookmark(e, _id)} className="outline-none bg-transparent border-none">
                                        <i className="ri-heart-line text-[1.65rem] text-slate-300 opacity-60"></i>
                                   </button>
                              }
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default Card;