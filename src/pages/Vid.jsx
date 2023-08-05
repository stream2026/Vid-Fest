import React, { useEffect, useState } from 'react'
import VidPlayer from '../component/VidPlayer'
import { useParams } from "react-router-dom"
import VidCard from "../component/VidCard";
import Comments from "../component/comments";
import {
  AiFillLike,
  AiFillDislike,
  AiOutlineLike,
  AiOutlineDislike,
} from "react-icons/ai";
import { ClipLoader } from "react-spinners";
import VidGrid from '../component/VidGrid';

const Vid = () => {
  const { id } = useParams()
  const [vid,setVid] = useState(null)
  const [isLiked, setIsLiked] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [recVids,setRecVids] = useState([]);
  const [seed,setSeed] = useState(false);
  const [descExpand, setDescExpand] = useState(false);
  const [author, setAuthor] = useState(null);
  const [followed, setFollowed] = useState(false);
  const [showComment, setShowComment] = useState(false);

  useEffect(()=>{
    const token = localStorage.getItem('token')
    fetch(`${process.env.REACT_APP_BASE_URL}/videos/${id}`,{
      headers:{
        'Authorization':`Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then((res)=>res.json())
    .then(data=>{
      console.log(data.uploadedBy?.username)
      setVid(data)
      setAuthor(data.uploadedBy)
      const category = data.category

      const authHeader = "Bearer " + token;
      fetch(`${process.env.REACT_APP_BASE_URL}/videos/categories/${category}`, {
        headers:{
          "Content-Type": "application/json",
          'Authorization': authHeader,
        }
      })
      .then(async (response) => {
        const { data } = await response.json();
        setRecVids(data);
      })
      .catch((err) => console.log(err));
     
      checkIfFollwed(token,data.uploadedBy?.username)
      checkIfVideoLiked(token);
      checkIfVideoDisliked(token)
    })
    .catch((err)=>{
      console.error(err)
    })

    
    

  },[id,seed])

  const follow = async (e)=>{
    e.preventDefault();
    const token = localStorage.getItem('token')
    try {
      const data = JSON.stringify({
        followingUsername: author.username
      })
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/profile/follow`,{
        method: 'POST',
        headers:{
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: data

      })
      const { message } = await response.json();
      console.log(message)
      setFollowed(true)
    } catch (error) {
      console.log(error)
    }
  }
  const unfollow = async (e)=>{
    e.preventDefault();
    const token = localStorage.getItem('token')
    try {
      const data = JSON.stringify({
        followingUsername: author.username
      })
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/profile/unfollow`,{
        method: 'POST',
        headers:{
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: data
      })
      const { message } = await response.json();
      console.log(message)
      setFollowed(false)
    } catch (error) {
      console.log(error)
    }
  }

  const checkIfFollwed = async (token,username)=>{
    try {
      const bodyData = JSON.stringify({
        followingUsername: username
      });
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/profile/followed`,{
        method: 'POST',
        headers:{
          'Authorization': `Bearer ${token}`,
          'Content-Type' : 'application/json'
        },
        body: bodyData
      });
      const { data } = await response.json(); // the backend returns { isLiked: true } or { isLiked: false }
      console.log(data)
      setFollowed(data);
    } catch (error) {
      console.error("Error checking if video is followed:", error);
    }
  }

  const checkIfVideoDisliked = async (token) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/videos/${id}/disliked`,{
        headers:{
          'Authorization': `Bearer ${token}`,
          'Content-Type' : 'application/json'
        }
      });
      const { data } = await response.json(); // the backend returns { isLiked: true } or { isLiked: false }
      setDislike(data);
    } catch (error) {
      console.error("Error checking if video is liked:", error);
    }
  };
  const checkIfVideoLiked = async (token) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/videos/${id}/liked`,{
        headers:{
          'Authorization': `Bearer ${token}`,
          'Content-Type' : 'application/json'
        }
      });
      const { data } = await response.json(); // the backend returns { isLiked: true } or { isLiked: false }
      setIsLiked(data);
    } catch (error) {
      console.error("Error checking if video is liked:", error);
    }
  };

  const handleLike = async (e) => {
    const token = localStorage.getItem('token')
    if(dislike){
      await fetch(`${process.env.REACT_APP_BASE_URL}/videos/${id}/removeDislike`,{
        headers:{
          'Authorization': `Bearer ${token}`
        }
      });
      setVid(vid=>{
        return {
          ...vid,
          dislikes: vid.dislikes-1
        }
      })
    } 
    
    if(isLiked){
      await fetch(`${process.env.REACT_APP_BASE_URL}/videos/${id}/removeLike`,{
        headers:{
          'Authorization': `Bearer ${token}`
        }
      });
      setVid(vid=>{
        return {
          ...vid,
          likes: vid.likes-1
        }
      })
    }else{
      await fetch(`${process.env.REACT_APP_BASE_URL}/videos/${id}/like`,{
        headers:{
          'Authorization': `Bearer ${token}`
        }
      });
      setVid(vid=>{
        return {
          ...vid,
          likes: vid.likes+1
        }
      })
    }

    setIsLiked((liked) => !liked);
    setDislike(false)
  };

  
  const handleDislike = async () => {
    const token = localStorage.getItem('token')
    if(isLiked) {
      await fetch(`${process.env.REACT_APP_BASE_URL}/videos/${id}/removeLike`,{
        headers:{
          'Authorization': `Bearer ${token}`
        }
      });
      setVid(vid=>{
        return {
          ...vid,
          likes: vid.likes-1
        }
      })
    }
    
    if(dislike){
      await fetch(`${process.env.REACT_APP_BASE_URL}/videos/${id}/removeDislike`,{
        headers:{
          'Authorization': `Bearer ${token}`
        }
      });
      setVid(vid=>{
        return {
          ...vid,
          dislikes: vid.dislikes-1
        }
      })
    }else{
      await fetch(`${process.env.REACT_APP_BASE_URL}/videos/${id}/dislike`,{
        headers:{
          'Authorization': `Bearer ${token}`
        }
      });
      setVid(vid=>{
        return {
          ...vid,
          dislikes: vid.dislikes+1
        }
      })
    }

    setIsLiked(false);
    setDislike((dislike) => !dislike);
  };


  if(!vid){
    return (
      <div className='flex items-center justify-center w-full'>
        <ClipLoader className='mt-20' size={200}/>
      </div>
    )
  }


  return (
    <div className="w-full flex flex-col items-center">
      {/* Video Player */}
      <div className="w-11/12 mt-6 flex flex-col gap-2">
        
        <VidPlayer video={vid}/>
        <div className='text-2xl font-bold ml-4 mt-6'>
          { vid.videoName }
        </div>
        <hr />
        <div className='flex flex-col gap-4'>
          <div>
            { descExpand ?
             vid.videoDescription :
             vid.videoDescription.substring(0,20)+' ...'
            }
          </div>
          <div onClick={()=> setDescExpand(desc=> !desc)} className='font-semibold cursor-pointer text-lg'>
            Read { descExpand ? 'less':'more'}
          </div>
        </div>
        <hr />

        <div className='flex items-center gap-2'>
          <div>
            <img className='w-[50px] h-[50px] rounded-[50%] border border-black' src={author?.profileImage} alt="author profile" />
          </div>
          <div>
            { author?.username }
          </div>
          {
            followed ?
            <div onClick={unfollow} className='border border-black p-2 rounded-md bg-green-600 cursor-pointer'>
              Followed
            </div>:
            <div onClick={follow} className='border border-black rounded-md p-2 cursor-pointer hover:bg-red-200 hover:border-red-700 transition duration-150 ease-out hover:ease-in'>
              Follow
            </div>
          }
        </div>
        <hr />
        {/* Like Dislike Views */}
        {/* here i've implemented if video is liked or disliked then BiSolidLike or BiLike */}
        {/* Confusion in onclick function where if the icon click then liked in the backend */}
        {/* Same for dislike */}
        <div className='flex flex-col'>
          <div className='text-xl mt-1 mb-4'>{vid?.views} views</div>
          <div className="flex text-black gap-[20px]">
            <div
              className="flex items-center cursor-pointer gap-[5px]"
              onClick={handleLike}>
              {isLiked ? <AiFillLike size={30} /> : <AiOutlineLike size={30} />}
              {vid?.likes}
            </div>{" "}
            <div
              className="flex items-center cursor-pointer gap-[5px]"
              onClick={handleDislike}>
              {dislike ? (
                <AiFillDislike size={30} />
              ) : (
                <AiOutlineDislike size={30} />
              )}
              {vid?.dislikes}
            </div>
            {/* views */}
            
          </div>
        </div>

        {/* Comments */}
        
        {
          showComment ?
          <div>
            <span className="font-semibold text-xl mt-4">Comments</span>
            <Comments setSeed={setSeed} comments={vid?.comments} videoId={id} />
            <button onClick={()=> setShowComment(false)} className='border border-black mt-2 rounded-md p-2 cursor-pointer hover:bg-green-200 hover:border-green-600 transition duration-150 ease-out hover:ease-in'>
              Collapse Comments
            </button>
          </div>
          :
          <div className='border border-black flex items-center justify-center rounded-md p-4 mt-4'>
            <button onClick={()=> setShowComment(true)} className='border border-black rounded-md p-2 cursor-pointer hover:bg-green-200 hover:border-green-600 transition duration-150 ease-out hover:ease-in'>
              Load Comments
            </button>
          </div>

        }
      </div>

      {/* Same Categories Movie */}
      {/* Here the MOvies comes from temporary data Movie.......need to connect from backend */}

      <div className='mx-4 mt-2'>
        <h1 className='mt-4'>Recommended Videos</h1>

        <VidGrid data={recVids} />
      </div>
    </div>
  )
}

export default Vid
