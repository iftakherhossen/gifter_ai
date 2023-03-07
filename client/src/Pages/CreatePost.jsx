import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { preview } from '../assets';
import { FormField, Loader } from '../Components';
import { getRandomPrompt } from '../utils';

const CreatePost = () => {
     const navigate = useNavigate();

     const [form, setForm] = useState({
          name: "",
          prompt: "",
          photo: "",
     });
     const [generatingImg, setGeneratingImg] = useState(false);
     const [loading, setLoading] = useState(false);

     const generateImage = async () => {
          if (form.prompt) {
               try {
                    setGeneratingImg(true);
                    const response = await fetch(`${import.meta.env.VITE_SERVER_LINK}/api/v1/gifter`, {
                         method: 'POST',
                         headers: {
                              'Content-Type': 'application/json',
                         },
                         body: JSON.stringify({
                              prompt: form.prompt,
                         }),
                    });

                    const data = await response.json();

                    setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` })
               }
               catch (error) {
                    toast.error('error');
                    console.log(error);
               }
               finally {
                    setGeneratingImg(false);
                    toast.success('Image Generated!')
               }
          }
          else {
               toast.error('Please enter a prompt!');

          }
     };

     const handleOnChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

     const handleSurpriseMe = () => {
          const randomPrompt = getRandomPrompt(form.prompt);
          setForm({ ...form, prompt: randomPrompt })
     };

     const handleSubmit = async (e) => {
          e.preventDefault();

          if (form.name && form.prompt && form.photo) {
               setLoading(true);

               try {
                    const response = await fetch(`${import.meta.env.VITE_SERVER_LINK}/api/v1/post`, {
                         method: 'POST',
                         headers: {
                              'Content-Type': 'application/json'
                         },
                         body: JSON.stringify({ ...form }),
                    })

                    await response.json();
                    navigate('/');              
               } 
               catch (error) {
                    toast.error('Failed to shared the post!');
               }
               finally {
                    setLoading(false);
                    toast.success('Post shared successfully!');
               }
          }
          else {
               toast.error('Please fill up all the fields!');
          }
     };

     return (
          <section className="max-w-7xl mx-auto lg:p-3 h-auto">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="p-3">
                         <div className="mb-6 md:mb-10">
                              <h1 className="font-extrabold text-[#222328] text-[35px]">Create</h1>
                              <p className="mt-2 text-[#666e75] text-base font-medium">Create imaginative and visually stunning images through Gifter AI and share them with the community!</p>
                         </div>
                         <form className="flex flex-col gap-5">
                              <FormField
                                   labelName="Your Name"
                                   type="text"
                                   name="name"
                                   placeholder="Ex., John Doe"
                                   value={form.name}
                                   handleOnChange={handleOnChange}
                              />
                              <FormField
                                   labelName="Prompt"
                                   type="text"
                                   name="prompt"
                                   placeholder="A plush toy robot sitting against a yellow wall"
                                   value={form.prompt}
                                   handleOnChange={handleOnChange}
                                   isSurpriseMe
                                   handleSurpriseMe={handleSurpriseMe}
                              /> 
                              <div className="flex gap-5 mt-1 mb-5 lg:mb-0">
                                   <button type="button" onClick={generateImage} className="text-white bg-green-700 font-medium rounded-lg w-full px-5 py-3 text-center">
                                        {generatingImg ? "Generating..." : "Generate"}
                                   </button>
                              </div>
                         </form>
                    </div>

                    <div className="p-3">
                         <div className="relative bg-gray-50 border border-gray-300 text-gray-900 rounded-xl p-4 focus:ring-blue-500 focus:border-blue-500 w-full flex justify-center items-center">
                              <div title={form.prompt}>
                                   {
                                        form.photo ? (
                                             <img
                                                  src={form.photo}
                                                  alt={form.prompt}
                                                  className="w-full h-full object-contain"
                                                  draggable={false}
                                                  title={form.prompt}
                                             />
                                        ) : (
                                             <img
                                                  src={preview}
                                                  alt={preview}
                                                  className="w-9/12 h-9/12 mx-auto object-contain opacity-40"
                                                  draggable={false}
                                             />
                                        )
                                   }
                              </div>

                              {
                                   generatingImg && (<div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                                        <Loader />
                                   </div>)
                              }
                         </div>
                    </div>
               </div>
               <form className="mt-16 flex flex-col justify-center items-center w-full" onSubmit={handleSubmit}>
                    <p className="text-[#666e75] text-[14px]">N.B. Once you have created the image you want, you can share it with others in the community!</p>
                    <button type="submit" className="mt-5 w-full max-w-md text-white bg-[#6469ff] font-medium rounded-md px-5 py-2.5 text-center">
                         {loading ? "Sharing..." : "Share with the community"}
                    </button>
               </form>
          </section>
     );
};

export default CreatePost;