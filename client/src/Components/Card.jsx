import 'animate.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { download } from '../assets';
import { downloadImage, getRandomColor } from '../utils';

const Card = ({ _id, name, prompt, photo, likes }) => {
     const navigate = useNavigate();

     const [like, setLike] = useState(parseInt(likes));
     const [isLiked, setIsLiked] = useState(false);

     const handleLike = () => {
          if (isLiked) {
               setLike(like - 1);
          } else {
               setLike(like + 1);
          }
          setIsLiked(!isLiked);
     };

     const color = getRandomColor();

     return (
          <div className="relative rounded-xl group card shadow-card hover:shadow-cardHover cursor-pointer overflow-hidden">
               <img src={photo} alt={prompt} className="w-full h-auto object-cover rounded-xl" draggable={false} onClick={() => navigate(`/post/${_id}`)} />
               <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute left-0 right-0 bottom-0 bg-[#232423d5] m-2.5 p-4 rounded-xl animate__animated animate__fadeInDown">
                    <p className="capitalize text-white overflow-y-auto text-base font-medium cardPrompt">{prompt.slice(0, 47)}{prompt.length > 47 && "..."}</p>
                    <div className="mt-3 flex justify-between items-center gap-1">
                         <div className="flex items-center gap-2.5">
                              <div className="avatar placeholder  select-none">
                                   <div className="rounded-full w-10" style={{ backgroundColor: color }}>
                                        <span className="text-xl font-semibold text-white">{name[0]}</span>
                                   </div>
                              </div>
                              <p className="text-white text-[1.1rem] select-none font-medium">{name}</p>
                         </div>
                         <div className="flex items-center gap-1.5">
                              <button type="button" onClick={() => downloadImage(_id, photo)} className="outline-none bg-transparent border-none">
                                   <img src={download} alt="download" className="w-6 h-6 object-contain invert" draggable={false} />
                              </button>
                              {
                                   isLiked === true ? <button type="submit" onClick={(e) => handleLike(e, _id)} className="outline-none bg-transparent border-none tooltip tooltip-top" data-tip={like}>
                                        <i className="ri-heart-fill text-[1.65rem] text-red-500"></i>
                                   </button> : <button type="submit" onClick={(e) => handleLike(e, _id)} className="outline-none bg-transparent border-none tooltip tooltip-top" data-tip={like}>
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