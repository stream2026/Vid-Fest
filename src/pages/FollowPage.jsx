import React,{ useState, useEffect } from 'react'
import VidGrid from '../component/VidGrid'
import { ClipLoader } from 'react-spinners'

const FollowPage = () => {
    const [vids, setVids] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null);

    useEffect(()=>{
        setLoading(true)
        const token = localStorage.getItem('token')
        fetch(`${process.env.REACT_APP_BASE_URL}/videos/following`,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(response => setVids(response.data))
        .catch(error=>{
            setError(error.message);
            console.error(error)
        })
        setLoading(false)
    },[])

    if(error){
        return (
          <div className='text-4xl text-red-700 m-auto'>
            { error }
          </div>
        )
    }

  return (
    <div>
        {
            loading ? 
            <div className='flex items-center justify-center w-full'>
                <ClipLoader className='mt-20' size={200}/>
            </div> 
            :
            <div>
                <VidGrid data={vids} />
            </div>
        }
    </div>
  )
}

export default FollowPage
