import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RWebShare } from "react-web-share";
import { toast } from 'react-hot-toast';

import { download } from '../assets';
import { downloadImage, getRandomColor } from '../utils';

const PostDetails = ({ name, prompt, photo, createdAt }) => {
     const params = useParams();
     const postId = params.id;

     const color = getRandomColor();

     const [marked, setMarked] = useState(false);

     useEffect(() => {
          //checking liked for color
          const exists = getStorage();

          let color_cart = {};
          if (exists) {
               color_cart = JSON.parse(exists);

               if (color_cart[params.id]) {
                    let icon = document.getElementById(`icon-heart-${params.id}`);
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
               let icon = document.getElementById(`icon-heart-${params.id}`);
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
          <div className="w-full">
               <div className="flex flex-col bg-gray-100 rounded-xl p-4 h-full max-h-[632px]">
                    <div className="flex items-center gap-2.5 border-b pt-1 pb-3">
                         <div className="avatar placeholder select-none">
                              <div className="rounded-full w-10" style={{ backgroundColor: color }}>
                                   <span className="text-xl font-semibold text-white z-10">{name ? name.charAt(0) : ""}</span>
                              </div>
                         </div>
                         <p className="text-black text-xl select-none font-semibold">{name ? name : ""}</p>
                    </div>

                    <div className="p-1 my-3 md:my-5 md:mb-auto">
                         <p className="text-black text-lg md:text-xl font-semibold first-letter:capitalize select-text">{prompt}</p>
                    </div>

                    <div className="flex justify-between items-center border-t pt-2.5">
                         <div className="flex items-center gap-x-2">
                              <div>
                                   {
                                        marked ? <button type="submit" onClick={() => removeItem(postId)} className="outline-none bg-transparent border-none">
                                             <i className="ri-heart-fill text-[1.7rem] cursor-pointer" id={`icon-heart-${postId}`}></i>
                                        </button> : <button type="submit" onClick={() => handleLove(postId)} className="outline-none bg-transparent border-none">
                                             <i className="ri-heart-fill text-[1.7rem] cursor-pointer" id={`icon-heart-${postId}`}></i>
                                        </button>
                                   }
                              </div>
                              <div className="flex items-center gap-x-1">
                                   <RWebShare
                                        data={{
                                             text: prompt,
                                             url: window.location.href,
                                             title: `Shared by ${name} on Gifter AI`,
                                        }}
                                   >
                                        <button className="tooltip tooltip-right tooltip-primary" data-tip="Share externally">
                                             <i className="ri-send-plane-fill text-[1.65rem] text-black opacity-90"></i>
                                        </button>
                                   </RWebShare>
                              </div>
                         </div>
                         <div className="flex items-center gap-x-1">
                              <button type="button" onClick={() => downloadImage(postId, photo)} className="outline-none bg-transparent border-none tooltip tooltip-left tooltip-primary" data-tip="Download Image">
                                   <img src={download} alt="download" className="w-6 h-6 object-contain" draggable={false} />
                              </button>
                         </div>
                    </div>
                    <p className="flex justify-between text-gray-700 text-base font-semibold opacity-90">posted {moment(createdAt).fromNow()}</p>
               </div>
          </div>
     );
};

export default PostDetails;