import React,{ useState, useRef } from 'react'
import { Input } from './UserInput'
import { ClipLoader } from "react-spinners";
import DefImg from "../logos/default_profile.png"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const EditProfile = ({ setModal, modal }) => {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [email,setEmail] = useState('')
    const [profileImage,setProfileImage] = useState(null)
    const [coverImage,setCoverImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const hiddenProfileFileInput = useRef(null);
    const hiddenCoverFileInput = useRef(null);
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passError, setPassError] = useState('')
    const [passLoading, setPassLoading] = useState(false)

    const handlePassChange = async (e)=>{
        e.preventDefault();
        setPassLoading(true)
        try {
            const token = localStorage.getItem('token')
            if(newPassword !== confirmPassword){
                throw new Error('Passwords do not match')
            }
            const body_data = {
                oldPassword : oldPassword,
                newPassword : newPassword
            }
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/profile/pass`,
            {
                method : 'PUT',
                headers : {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify(body_data)
            })
            const data = await res.json()
            if(data.error){
                throw new Error(data.error)
            }
            setModal('')
        } catch (error) {
            setPassError(error.message)
        }
        setPassLoading(false)
    }

    const handlePassChangeCancel = (e)=>{
        e.preventDefault();
        
        setOldPassword('')
        setNewPassword('')
        setConfirmPassword('')

        setPassLoading(false)

        setModal('')
    }

    const handleCancel = (e)=>{
        e.preventDefault();
        setUsername('')
        setEmail('')
        setPassword('')
        setProfileImage(null)
        setCoverImage(null)
        setLoading(false)

        setModal('')
    }
    const handleSave = async (e)=>{
        e.preventDefault();
        setLoading(true)

        let data = {
            username : username,
            email: email,
            password: password
        }
        if(profileImage){
            const formProfileData = new FormData ();
            formProfileData.append("file", profileImage);
            formProfileData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);
            try {
                const res = await axios.post(
                `https://api.cloudinary.com/v1_1/${ process.env.REACT_APP_CLOUDINARY_NAME }/image/upload`,
                formProfileData
                )
                data = {
                    ...data,
                    profileImage: res.data.secure_url,
                    profileImagePid: res.data.public_id
                }
            } catch (error) {
                setError(error.message)
                console.log(error)
            }
        }
        if(coverImage){
            const formCoverData = new FormData ();
            formCoverData.append("file", coverImage);
            formCoverData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);
            try {
                const res = await axios.post(
                `https://api.cloudinary.com/v1_1/${ process.env.REACT_APP_CLOUDINARY_NAME }/image/upload`,
                formCoverData
                )
                data = {
                    ...data,
                    coverImage: res.data.secure_url,
                    coverImagePid: res.data.public_id
                }
            } catch (error) {
                setError(error.message)
                console.log(error)
            }
        }

        try {
            const token = localStorage.getItem('token')
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/profile`,
            {
                method : 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body : JSON.stringify(data)
            })
            const res = await response.json();
            if(res.error) throw new Error(res.error);
            setUsername('');
            setEmail('');
            setPassword('');
            setLoading(false)
            navigate(0)
        } catch (error) {
            setLoading(false)
            setError(error.message);
        }

        
    }

    const handleProfileClick = (event) => {
        hiddenProfileFileInput.current.click();
    };
    const handleProfileImageChange = (event) => {
        const file = event.target.files[0];
        const imgname = event.target.files[0].name;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const img = new Image();
          img.src = reader.result;
          img.onload = () => {
            const canvas = document.createElement("canvas");
            const maxSize = Math.max(img.width, img.height);
            canvas.width = maxSize;
            canvas.height = maxSize;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(
              img,
              (maxSize - img.width) / 2,
              (maxSize - img.height) / 2
            );
            canvas.toBlob(
              (blob) => {
                const file = new File([blob], imgname, {
                  type: "image/png",
                  lastModified: Date.now(),
                });
    
                console.log(file);
                setProfileImage(file);
              },
              "image/jpeg",
              0.8
            );
          };
        };
      };
    const handleCoverClick = (event) => {
        hiddenCoverFileInput.current.click();
    };
    const handleCoverImageChange = (event) => {
        const file = event.target.files[0];
        const imgname = event.target.files[0].name;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const img = new Image();
          img.src = reader.result;
          img.onload = () => {
            const canvas = document.createElement("canvas");
            const maxSize = Math.max(img.width, img.height);
            canvas.width = maxSize;
            canvas.height = maxSize;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(
              img,
              (maxSize - img.width) / 2,
              (maxSize - img.height) / 2
            );
            canvas.toBlob(
              (blob) => {
                const file = new File([blob], imgname, {
                  type: "image/png",
                  lastModified: Date.now(),
                });
    
                console.log(file);
                setCoverImage(file);
              },
              "image/jpeg",
              0.8
            );
          };
        };
      };
    
    

    if(modal === 'edit'){
        return (
        <div className='mx-20'>
          <form>
            <Input 
                label='Username' 
                placeholder='Enter new username' 
                type='text'
                data={username}
                setData={setUsername}
                bg={true}
            />
            <Input 
                label='Email' 
                placeholder='Enter new email address' 
                type='email'
                data={email}
                setData={setEmail}
                bg={true}
            />
            <div onClick={handleProfileClick} className='cursor-pointer border border-slate-900 rounded-lg w-60 flex flex-col items-center justify-center'>
                {profileImage ? (
                <img
                    src={URL.createObjectURL(profileImage)}
                    alt="upload profile"
                    className="w-40 m-2 rounded-full"
                />
                ) : (
                <img
                    src= {DefImg}
                    alt="upload profile"
                    className="w-32"
                />
                )}
                <div className='font-semibold mb-2'>UPLOAD PROFILE IMAGE</div>
    
                <input
                type="file"
                onChange={handleProfileImageChange}
                ref={hiddenProfileFileInput}
                style={{ display: "none" }}
                />
            </div>
            <div onClick={handleCoverClick} className='cursor-pointer mt-4 border border-slate-900 rounded-lg w-60 flex flex-col items-center justify-center'>
                {coverImage ? (
                <img
                    src={URL.createObjectURL(coverImage)}
                    alt="upload cover"
                    className="w-40 m-2 rounded-full"
                />
                ) : (
                <img
                    src= {DefImg}
                    alt="upload cover"
                    className="w-32"
                />
                )}
                <div className='font-semibold mb-2'>UPLOAD COVER IMAGE</div>
    
                <input
                type="file"
                onChange={handleCoverImageChange}
                ref={hiddenCoverFileInput}
                style={{ display: "none" }}
                />
            </div>
            <Input 
                label='Password' 
                placeholder='Enter your password' 
                type='password'
                data={password}
                setData={setPassword}
                bg={true}
            />
            <div className='flex items-center justify-center'>
                <button onClick={handleSave} className='border-2 border-black mt-8 p-2 rounded-md flex items-center cursor-pointer hover:bg-green-200 hover:border-green-700 transition duration-150 ease-out hover:ease-in'>
                    SAVE
                    { loading &&  <ClipLoader className='ml-2' size={20} color="#36d7b7"/> }
                </button>
                <div className='mx-2 mt-8'>
                    {
                        error &&
                        <div className='text-red-800 '>{ error }</div>
                    }
                </div>
                <button onClick={handleCancel} className='border-2 border-black mt-8 ml-4 p-2 rounded-md flex items-center cursor-pointer hover:bg-red-200 hover:border-red-700 transition duration-150 ease-out hover:ease-in'>
                    CANCEL
                </button>
    
            </div>
            
          </form>
        </div>
      )
    }
    if(modal === 'passChange'){
        return (
            <div className='mx-20'>
                <form>
                    <Input
                        label= 'Old Password'
                        placeholder= 'Enter old password'
                        type= 'password'
                        data={oldPassword}
                        setData={setOldPassword}
                        bg={true}
                    />
                    <Input
                        label= 'New Password'
                        placeholder= 'Enter new password'
                        type= 'password'
                        data={newPassword}
                        setData={setNewPassword}
                        bg={true}
                    />
                    <Input
                        label= 'Confirm New Password'
                        placeholder= 'Enter new password again'
                        type= 'password'
                        data={confirmPassword}
                        setData={setConfirmPassword}
                        bg={true}
                    />
                    <div className='flex items-center justify-center'>
                        <button onClick={handlePassChange} className='border-2 border-black mt-8 p-2 rounded-md flex items-center cursor-pointer hover:bg-green-200 hover:border-green-700 transition duration-150 ease-out hover:ease-in'>
                            <div>SAVE</div>
                            { passLoading &&  <ClipLoader className='ml-2' size={20} color="#36d7b7"/> }
                        </button>
                        
                        <button onClick={handlePassChangeCancel} className='border-2 border-black mt-8 ml-4 p-2 rounded-md flex items-center cursor-pointer hover:bg-red-200 hover:border-red-700 transition duration-150 ease-out hover:ease-in'>
                            CANCEL
                        </button>
                        <div className='mx-2 mt-8'>
                            {
                                passError &&
                                <div className='text-red-800 '>{ passError }</div>
                            }
                        </div>
            
                    </div>
                </form>
            </div>
        )
    }
}

export default EditProfile
