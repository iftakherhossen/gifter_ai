import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { Card, FormField, Loader } from '../Components';

const RenderCards = ({ data, title }) => {
     if (data?.length > 0) {
          return data.map((post) => <Card key={post._id} {...post} />)
     }

     return (
          <h2 className="my-5 font-bold text-[#6449ff] text-xl uppercase">
               {title}
          </h2>
     )
}

const Home = () => {
     const [loading, setLoading] = useState(false);
     const [allPosts, setAllPosts] = useState([]);
     const [hasMore, setHasMore] = useState(true);
     const [page, setPage] = useState(1);

     const [isSearch, setIsSearch] = useState(false);
     const [searchText, setSearchText] = useState('');
     const [searchTimeout, setSearchTimeout] = useState(null);
     const [searchedResults, setSearchedResults] = useState([]);

     const fetchPosts = async (page) => {
          const newItems = [];
          setLoading(true);

          for (let i = 0; i < 100; i++) {
               newItems.push(i)
          }

          if (page === 100) {
               setHasMore(false)
          }

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
          fetchPosts(page);
     }, []);

     const handleSearchChange = (e) => {
          clearTimeout(searchTimeout);

          setSearchText(e.target.value);

          (searchText !== "" || searchText.length >= 0) ? setIsSearch(true) : setIsSearch(false);

          setSearchTimeout(
               setTimeout(() => {
                    const searchResults = allPosts.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));

                    setSearchedResults(searchResults);
               }, 500)
          )
     }

     return (
          <section className="max-w-7xl mx-auto p-2.5 md:p-0">
               <div className="my-14">
                    <h1 className="font-extrabold text-[#222328] text-4xl">The Community Showcase</h1>
                    <p className="mt-2 text-[#666e75] text-base font-medium">Browse through a collection of imaginative and visually stunning images generated by Gifter AI</p>
               </div>

               <FormField
                    labelName="Search Post"
                    type="text"
                    name="text"
                    placeholder="Search post"
                    value={searchText}
                    handleOnChange={handleSearchChange}
                    isSearch={isSearch}
                    searchBar
               />

               <div className="my-10">
                    {
                         loading ? (
                              <div className="flex justify-center items-center">
                                   <Loader />
                              </div>
                         ) : (
                              <>
                                   {
                                        searchText && (
                                             <h2 className="font-medium text-[#666e75] text-xl mb-3">
                                                  Showing results for <span className="text-[#222328] font-bold">{searchText}</span>
                                             </h2>
                                        )
                                   }
                                   <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 animate__animated animate__fadeInUp">
                                        {
                                             searchText ? (
                                                  <RenderCards
                                                       data={searchedResults}
                                                       title="No search results found!"
                                                  />
                                             ) : (
                                                  <RenderCards
                                                       data={allPosts}
                                                       title="No post found!"
                                                  />
                                             )
                                        }
                                   </div>
                              </>
                         )
                    }
               </div>
          </section>
     );
};

export default Home;