import 'animate.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { download } from '../assets';
import { downloadImage, getRandomColor } from '../utils';

const Card = ({ _id, name, prompt, photo }) => {
     const navigate = useNavigate();

     const color = getRandomColor();

     const [marked, setMarked] = useState(false);

     useEffect(() => {
          //checking liked for color
          const exists = getStorage();

          let color_cart = {};
          if (exists) {
               color_cart = JSON.parse(exists);

               if (color_cart[_id]) {
                    let icon = document.getElementById(`icon-heart-${_id}`);
                    icon.classList.add('text-rose-500');
                    setMarked(true);
               }
          }
     }, []);

     const [love, setLove] = useState(false);

     const handleLove = (id) => {
          const loading = toast.loading('Please wait ...');
          let loved = false;

          const alreadyLiked = addToStorage(id, loved);

          if (alreadyLiked) {
               toast.dismiss(loading);
               toast("You've already saved it!", {
                    icon: '🥳',
               });
          }
          else {
               let icon = document.getElementById(`icon-heart-${_id}`);
               icon.classList.add('text-rose-500');
               setLove(!love);
               toast.dismiss(loading);
               toast.success("You've saved the post!");
          }
     }

     //local storage utilities
     const addToStorage = (id, loved) => {
          const exists = getStorage();

          let react_cart = {};
          if (!exists) {
               react_cart[id] = true;
               loved = true;
          }
          else {
               react_cart = JSON.parse(exists);
               
               if (react_cart[id]) {
                    react_cart[id] = true;
                    loved = true;
               }
               else {
                    react_cart[id] = true;
                    loved = true;
               }
          }
          updateStorage(react_cart);
          return loved;
     }

     const getStorage = () => localStorage.getItem('bookmark');

     const updateStorage = cart => {
          localStorage.setItem('bookmark', JSON.stringify(cart));
     };

     return (
          <div className="relative rounded-xl group card shadow-card hover:shadow-cardHover cursor-pointer overflow-hidden">
               <img src={photo} alt={prompt} className="w-full h-auto object-cover rounded-xl" draggable={false} onClick={() => navigate(`/post/${_id}`)} />
               <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute left-0 right-0 bottom-0 bg-[#232423d5] m-2.5 p-4 rounded-xl animate__animated animate__fadeInDown">
                    <p className="capitalize text-white overflow-y-auto text-base font-medium cardPrompt">{prompt.slice(0, 18)}{prompt.length > 18 && "..."} {prompt.length > 18 && <b onClick={() => navigate(`/post/${_id}`)}>View</b>}</p>
                    <div className="mt-3 flex justify-between items-center gap-1">
                         <div className="flex items-center gap-2.5">
                              <div className="avatar placeholder select-none">
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
                                   marked ? <button type="submit" onClick={() => console.log(_id)} className="outline-none bg-transparent border-none">
                                        <i className="ri-heart-fill text-[1.7rem] cursor-pointer" id={`icon-heart-${_id}`}></i>
                                   </button> : <button type="submit" onClick={() => handleLove(_id)} className="outline-none bg-transparent border-none">
                                        <i className="ri-heart-fill text-[1.7rem] cursor-pointer" id={`icon-heart-${_id}`}></i>
                                   </button>
                              }
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default Card;