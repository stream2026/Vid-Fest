import React,{ useState } from "react";
import Comment from "./comment";
import { ClipLoader } from "react-spinners";


const Comments = ({ comments, videoId, setSeed }) => {
  const [text,setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  //TODO: ADD NEW COMMENT FUNCTIONALITY

  const handleCommentSubmit = async (e)=>{
    e.preventDefault();
    setLoading(true)
    setError(null)
    setMessage(null)
    const token = localStorage.getItem('token')
    const data = {
      commentText: text
    }
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/videos/${videoId}/comments`,{
      method: 'POST',
      headers:{
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
    const { error, message } = await res.json()

    if(error){
      setError(error)
    }
    if(message){
      setSeed(seed => !seed)
      setMessage(message)
    }
    
    setLoading(false)
  }

  return (
      <div className="border-1 border-black rounded-md p-4 mt-4">
        <form className="flex flex-col border-1 border-black rounded-md p-2">
          <input
            className=" border-black text-black bg-transparent outline-none p-5 w-[100%]"
            placeholder="Add a comment..."
            value={text}
            onChange={(e)=>setText(e.target.value)}
          />
          <div className="flex items-center">
            <button
              className="bg-subMain flex items-center justify-center w-30 h-10 transition hover:bg-red-400 flex-rows  text-black px-4 rounded-lg border-2 border-slate-950 mt-8"
              type="submit"
              onClick={handleCommentSubmit}
            >
              Post
            </button>
            { loading &&  <ClipLoader size={35} color="#36d7b7" className="ml-4 mt-8"/> }
            {error && 
              <div className="text-red-700 ml-4">
                { error }
              </div>
            }
            {
              message && 
              <div className="text-green-700 ml-4">
                { message }
              </div>
            }
          </div>
        </form>
        <div className="border border-black p-4 rounded-md mt-2">

          {comments.map((comment,i) => (
            <Comment key={i} comment={comment} />
          ))}
        </div>
      </div>
  );
};

export default Comments;
