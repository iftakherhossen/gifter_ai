import React from 'react';

const FormField = ({ labelName, type, name, placeholder, value, handleOnChange, isSurpriseMe, handleSurpriseMe, isSearch, searchBar }) => (
     <div>
          <div className="flex items-center gap-2 mb-2">
               <label htmlFor={name} className="block text-lg font-bold text-gray-900 pl-2">
                    {labelName}
               </label>
               {
                    isSurpriseMe && (
                         <button type="button" onClick={handleSurpriseMe} className="font-semibold text-sm bg-green-700 text-white py-1 px-2.5 rounded-[6px]">
                              Surprise Me
                         </button>
                    )
               }
          </div>
          <div className="relative">
               <input
                    type={type ? type : "text"}
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    defaultValue={value}
                    onChange={handleOnChange}
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-xl focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3 font-medium"
               /> 
               {
                    searchBar === true && (isSearch === false ? <button className="absolute right-1 my-auto translate-custom text-xl">
                         <i className="ri-search-line"></i>
                    </button> : <button className="absolute right-1 my-auto translate-custom text-xl" onClick={() => window.location.reload()}>
                         <i className="ri-close-line"></i>
                    </button>)
               }
          </div>
     </div>
);

export default FormField;