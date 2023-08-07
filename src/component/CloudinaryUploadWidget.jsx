import React, { useEffect, useRef } from 'react'

const CloudinaryUploadWidget = ({ setData,onlyImages,setPid }) => {
    const cloudName = process.env.REACT_APP_CLOUDINARY_NAME; 
    const uploadPreset = process.env.REACT_APP_UPLOAD_PRESET; 
    const cloudinaryRef = useRef()
    const widgetRef = useRef()
    useEffect(()=>{
        cloudinaryRef.current = window.cloudinary
        if(onlyImages){

          widgetRef.current = cloudinaryRef.current.createUploadWidget(
              {
              cloudName: cloudName,
              uploadPreset: uploadPreset,
              // cropping: true, //add a cropping step
              // showAdvancedOptions: true,  //add advanced options (public_id and tag)
              // sources: [ "local", "url"], // restrict the upload sources to URL and local files
              multiple: false,  //restrict upload to a single file
              // folder: "uploaded_videos", //upload files to the specified folder
              // tags: ["users", "profile"], //add the given tags to the uploaded files
              // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
              // clientAllowedFormats: ["images"], //restrict uploading to image files only
              maxImageFileSize: 2000000,  //restrict file size to less than 2MB
              // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
              // theme: "purple", //change to a purple theme
              },
              (error, result) => {
                  if (!error && result && result.event === "success") {
                      setData(result.info.secure_url)
                      setPid(result.info.public_id)
                  }
              }
          );
        }else {
          widgetRef.current = cloudinaryRef.current.createUploadWidget(
            {
            cloudName: cloudName,
            uploadPreset: uploadPreset,
            // cropping: true, //add a cropping step
            // showAdvancedOptions: true,  //add advanced options (public_id and tag)
            sources: [ "local", "url"], // restrict the upload sources to URL and local files
            multiple: false,  //restrict upload to a single file
            // folder: "uploaded_videos", //upload files to the specified folder
            // tags: ["users", "profile"], //add the given tags to the uploaded files
            // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
            // clientAllowedFormats: ["images"], //restrict uploading to image files only
            maxImageFileSize: 30000000,  //restrict file size to less than 2MB
            // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
            // theme: "purple", //change to a purple theme
            },
            (error, result) => {
                if (!error && result && result.event === "success") {
                    setData(result.info.secure_url)
                    setPid(result.info.public_id)
                }
            }
        );
        }
    },[])
  return (
    <div>
      <button className='border border-black p-4 rounded-md cursor-pointer hover:bg-red-200 hover:border-red-700 transition duration-150 ease-out hover:ease-in' onClick={()=> widgetRef.current.open()}>
        UPLOAD
      </button>
    </div>
  )
}

export default CloudinaryUploadWidget
