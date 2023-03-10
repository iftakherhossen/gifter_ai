import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Loader, PostDetails } from '../Components';

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

     return (
          <section className="max-w-7xl mx-auto p-2.5 md:p-0 overflow-x-hidden">
               {
                    loading ? (
                         <div className="flex justify-center items-center overflow-hidden">
                              <Loader />
                         </div>
                    ) : (
                         <div key={params.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 select-none">
                              <div className="w-full">
                                   <img
                                        src={post?.photo}
                                        alt={post?.prompt}
                                        className="rounded-xl shadow-card cursor-pointer"
                                        draggable={false}
                                   />
                              </div>
                              <PostDetails {...post} />
                         </div>
                    )
               }
          </section>
     );
};

export default SinglePost;