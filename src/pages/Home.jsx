import React, { useEffect, useState } from 'react'
import Slider from "../component/Slider"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import VidGrid from '../component/VidGrid';
import { ClipLoader } from "react-spinners";

const Home = () => {
  const [vidList, setVidList] = useState([]);
  const [error,setError] = useState(null)
  const [loadedOnce,setLoadedOnce] = useState(false)
  useEffect(()=>{
    setLoadedOnce(true)
    const token = localStorage.getItem('token');
    const authHeader = "Bearer " + token;
    fetch(`${process.env.REACT_APP_BASE_URL}/videos`,
    {
      headers:{
        'Content-Type': 'application/json',
        'Authorization': authHeader
      }
    })
    .then(async response=>{
      const {data} = await response.json();
      setVidList(data);
    })
    .catch(err=>{
      setError(err.message);
      console.error(err)
    });
    setLoadedOnce(false)
  },[])

  if(error){
    return (
      <div className='text-4xl text-red-700 m-auto'>
        { error }
      </div>
    )
  }
  if(loadedOnce){
    return (
      <div className="flex h-full w-full items-center justify-content">

        <ClipLoader size={100} className="m-auto" />
      </div>
    )
  }

  return (
    <div>
      <Slider />
      <VidGrid data = {vidList}/>
    </div>
  )
}

export default Home
