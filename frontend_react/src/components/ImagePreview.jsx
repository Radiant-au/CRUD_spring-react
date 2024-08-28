import React from 'react'
import { useState ,useEffect } from 'react';

const ImagePreview = ({onImageSelect , initialimage}) => {

    useEffect(() => {
        if (initialimage) {
            setProfileImg(initialimage);
        }
    }, [initialimage]);

   const [profileImg, setProfileImg] = useState(initialimage || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = () => {
      if (reader.readyState === 2) {
        console.log(reader)
        setProfileImg(reader.result);
      }
    };
    reader.readAsDataURL(file);
    onImageSelect(file);
  };

  return (
    
      <div className="flex flex-col items-center">
        <h1 className="text-center mt-4 font-bold mb-4 text-2xl">Add Your Image</h1>
        <div className="m-auto w-36 h-36 border-black rounded">
          <img src={profileImg} alt="" id="img" className="w-36 h-36 object-cover" />
        </div>
        <input className='hidden' type="file" accept="image/*" name="image" id="input" onChange={imageHandler} />
        <div className="w-full mt-4 flex justify-center">
          <label className="w-48 h-12  text-white rounded bg-black text-center cursor-pointer m-4" htmlFor="input">
            <i className="material-icons">add_photo_alternate</i>
            Choose your Photo
          </label>
        </div>
      </div>
    
  )
}

export default ImagePreview