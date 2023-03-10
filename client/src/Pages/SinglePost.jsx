import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RWebShare } from "react-web-share";

import { download } from '../assets';
import { Loader } from '../Components';
import { downloadImage, getRandomColor } from '../utils';

const SinglePost = () => {
     const params = useParams();

     const [loading, setLoading] = useState(false);
     const [allPosts, setAllPosts] = useState([]);

     const fetchPosts = async () => {
          setLoading(true);

          try {
               const response = await fetch(`${import.meta.env.VITE_SERVER_LINK}/api/v1/post`, {
                    method: 'GET',
                    headers: {
                         'Content-Type': 'application/json',
                    },
               });

               if (response.ok) {
                    const result = await response.json();

                    setAllPosts(result.data.reverse());
               }
          }
          catch (error) {
               toast.error('Failed to fetch data!');
               console.log(error);
          }
          finally {
               setLoading(false);
          }
     }

     useEffect(() => {
          fetchPosts();
     }, []);

     const post = allPosts.find(post => post._id === params.id);

     const [like, setLike] = useState(parseInt(post?.likes));
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

     const kFormatter = num => {
          return Math.abs(num) > 1099 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num);
     }

     console.log(post);

     return (
          <section className="max-w-7xl mx-auto p-2.5 md:p-0 overflow-x-hidden">
               {
                    loading ? (
                         <div className="flex justify-center items-center overflow-hidden">
                              <Loader />
                         </div>
                    ) : (
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                              <div className="w-full">
                                   <img
                                        src={post?.photo}
                                        alt={post?.prompt}
                                        className="rounded-xl shadow-card cursor-pointer"
                                        draggable={false}
                                   />
                              </div>
                              <div className="w-full">
                                   <div className="flex flex-col bg-gray-100 rounded-xl p-4 h-full max-h-[632px]">
                                        <div className="flex items-center gap-2.5 border-b pt-1 pb-3">
                                             <div className="avatar placeholder select-none">
                                                  <div className="rounded-full w-10" style={{ backgroundColor: color }}>
                                                       <span className="text-xl font-semibold text-white z-10">{post?.name[0]}</span>
                                                  </div>
                                             </div>
                                             <p className="text-black text-xl select-none font-semibold">{post?.name}</p>
                                        </div>

                                        <div className="p-1 my-3 md:my-5 md:mb-auto">
                                             <p className="text-black text-lg md:text-xl font-semibold first-letter:capitalize">{post?.prompt}</p>
                                        </div>

                                        <div className="flex justify-between items-center border-t pt-2.5">
                                             <div className="flex items-center gap-x-2">
                                                  <div>
                                                       {
                                                            isLiked === true ? <button type="submit" onClick={(e) => handleLike(e, post?._id)} className="outline-none bg-transparent border-none">
                                                                 <i className="ri-heart-fill text-[1.7rem] text-red-500"></i>
                                                            </button> : <button type="submit" onClick={(e) => handleLike(e, post?._id)} className="outline-none bg-transparent border-none">
                                                                 <i className="ri-heart-line text-[1.7rem] text-black opacity-90"></i>
                                                            </button>
                                                       }
                                                  </div>
                                                  <div className="flex items-center gap-x-1">
                                                       <RWebShare
                                                            data={{
                                                                 text: post?.prompt,
                                                                 url: window.location.href,
                                                                 title: `Shared by ${post?.name} on Gifter AI`,
                                                            }}
                                                       >
                                                            <button className="tooltip tooltip-right tooltip-primary" data-tip="Share externally">
                                                                 <i className="ri-send-plane-fill text-[1.65rem] text-black opacity-90"></i>
                                                            </button>
                                                       </RWebShare>
                                                  </div>
                                             </div>
                                             <div className="flex items-center gap-x-1">
                                                  <button type="button" onClick={() => downloadImage(post?._id, post?.photo)} className="outline-none bg-transparent border-none tooltip tooltip-left tooltip-primary" data-tip="Download Image">
                                                       <img src={download} alt="download" className="w-6 h-6 object-contain" draggable={false} />
                                                  </button>
                                             </div>
                                        </div>
                                        <div className="flex justify-between text-black text-base font-semibold opacity-90">
                                             <div className="flex flex-col">
                                                  <p>Liked by {kFormatter(like ? like : 1580)} people</p>
                                                  <p className="text-gray-700">{moment(post?.timestamps ? post.timestamps : "2023-03-10T12:50:59+06:00", "YYYYMMDD").fromNow()}</p>
                                             </div>
                                             <div>
                                                  <p>{post?.downloads ? post.downloads : 100}</p>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    )
               }
          </section>
     );
};

export default SinglePost;