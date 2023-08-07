import React, { useState } from "react";
import { Input, Message, Select } from "../component/UserInput";
import { Category } from "../Data/Category";
import { ImUpload3 } from "react-icons/im";
import CloudinaryUploadWidget from "../component/CloudinaryUploadWidget";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";


function AddMovie() {
  const [videoName, setVideoName] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [thumbnail,setThumbnail] = useState(null);
  const [category,setCategory] = useState(null)
  const [video, setVideo] = useState(null);
  const [pid,setPid] = useState(null)
  const [thumbnailPid, setThumbnailPid] = useState(null)

  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);


  const navigate = useNavigate()

  const handleUpload = async ()=>{
    setLoading(true)
    if(!videoName || !videoDescription || !thumbnail || !category || !video){
      setError("Please provide full data")
      setLoading(false)
      return
    }
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/videos`,
      {
        method: 'POST',
        headers:{
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body : JSON.stringify({
          videoName : videoName,
          videoDescription : videoDescription,
          thumbnail : thumbnail,
          thumbnailPid: thumbnailPid,
          pid: pid,
          category : category,
          video : video
        })
      })
      const message = await res.json();
      setLoading(false);
      navigate('/')
      
    } catch (error) {
      setError(error)
      console.error(error)
    }
  }

  return (
    <div className="container mb-16 mx-auto px-2 flex-col text-black">
      <div className="w-full 2xl:w-1/2 gap-5 flex-colo p-6 sm:p-14 md:w-3/5 bg-main rounded-lg border-border">
        <h1 className="text-black text-2xl mb-8 font-bold">Upload Video</h1>
        <Input
          label="Video Title"
          placeholder="Video Title"
          type="text"
          data={videoName}
          setData = {setVideoName}
          bg={true}
        />
        <div className="flex flex-col gap-2 w-full">
          <p className="text-border font-semibold text-sm">
            Thumbnail Image
          </p>
          <CloudinaryUploadWidget setData={setThumbnail} onlyImages={true} setPid={setThumbnailPid} />
        </div>
        <Message label="Video Description" placeholder="Make it short and sweet" data={videoDescription} setData={setVideoDescription} />
        <div className="text-sm w-full">
          <Select label="Category" options={Category} setData = {setCategory} />
        </div>
        <div className="flex my-4 flex-col gap-2 w-full">
          <label className="text-black font-semibold text-sm">Video</label>
          <CloudinaryUploadWidget setData={setVideo} setPid={setPid} />
        </div>
        <div className="flex flex-col w-full justify-end items-center my-8">
          <button 
            className="bg-subMain flex py-2 w-full gap-2 font-medium transitions hover:bg-red-200 hover:border-red-700 transition duration-150 ease-out hover:ease-in border border-black text-black rounded"
            onClick={handleUpload}
          >
            <ImUpload3 className="mx-auto" size={24}/>
            { loading &&  <ClipLoader size={20} color="#36d7b7" className="mr-8" /> }
          </button>
          { error && <div className="text-sm text-red-600 mt-4">{ error }</div> }
        </div>
      </div>
    </div>
  );
}

export default AddMovie;
