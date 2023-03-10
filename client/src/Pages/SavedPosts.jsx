import React, { useEffect, useState } from 'react';
import { Card, Loader } from '../Components';

const RenderCards = ({ data, title }) => {
     if (data?.length > 0) {
          return data.map((post) => <Card key={post._id} {...post} saved={true} />)
     }

     return (
          <h2 className="my-5 font-bold text-[#6449ff] text-xl uppercase">
               {title}
          </h2>
     )
}

const SavedPosts = () => {
     const getStorage = () => localStorage.getItem('bookmark');

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

     const specificPosts = Object.keys(JSON.parse(getStorage()));
     const savedPosts = allPosts.filter(post => specificPosts.find(a => a === post._id));

     return (
          <section className="max-w-7xl mx-auto p-2.5 md:p-0">
               <div className="my-14">
                    <h1 className="font-extrabold text-[#222328] text-4xl">Saved Posts</h1>
                    <p className="mt-2 text-[#666e75] text-base font-medium">Browse through the collection of imaginative and visually stunning images you have saved!</p>
               </div>

               <div className="my-10">
                    {
                         loading ? (
                              <div className="flex justify-center items-center">
                                   <Loader />
                              </div>
                         ) : (
                              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 animate__animated animate__fadeInUp">
                                   <RenderCards
                                        data={savedPosts}
                                        title="No post found!"
                                   />
                              </div>
                         )
                    }
               </div>
          </section>
     );
};

export default SavedPosts;