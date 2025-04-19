import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { FiUpload } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'

import { updateDisplayPicture } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../../Common/IconBtn"


const ChangeProfilePicture = () => {

    const dispatch = useDispatch()
    //  Redux store se logged-in user ka profile data le raha hai.
    const { user } = useSelector((state) => state.profile)
    //  User authentication ke liye token fetch kar raha hai.
    const { token } = useSelector((state) => state.auth)

    const [loading, setLoading] = useState(false)
    const [imageFile, setImageFile] = useState(null)
    // Image ka base64 preview data store karta hai.
    const [previewSource, setPreviewSource] = useState(null)

    //  File input ko programmatically access karne ke liye useRef use hota hai.
    const fileInputRef = useRef()

    // File upload button ko click karne par hidden file input open hota hai.
    const handleClick = () => {
        fileInputRef.current.click()
    }

    // User ne jo file select ki hai (e.target.files[0]), use state me set karte hain.
    // previewFile(file) call karte hain image ka preview dikhane ke liye.
    const handleFileChange = (e) => {
        const file = e.target.files[0]
        // console.log("file", file)
        if (file) {
            setImageFile(file)
            previewFile(file)
        }
    }

    // FileReader ka use karke file ko base64 URL me convert karte hain, jo preview dikhata hai.
    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }

    const handleFileUpload = () => {
        try {
            console.log("oploading.....");
            setLoading(true)
            // formdata: Image file ko backend me bhejne ke liye multipart form data format me set karta hai.
            const formData = new FormData()
            formData.append("image", imageFile)
            // console.log("formData", formData)
            // dispatch(updateDisplayPicture): Redux action ke through backend ko request bhejta hai.
            dispatch(updateDisplayPicture(token, formData)).then(() => {
                // Upload complete hone ke baad, loading false aur image file null kar deta hai
                setLoading(false)
                setImageFile(null)
            })
            
        } catch (error) {
            console.log("error", error)
            setLoading(false)
            
        }
    }

    // Agar imageFile state change hota hai, toh useEffect -> file ka naya preview generate karta hai.
    useEffect( () => {
        if (imageFile) {
            previewFile(imageFile)
        }
    }, [imageFile])


  return (
   <>
    <div className='flex items-center justify-between rounded-md border-[1px]] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5'>
        <div className='flex items-center gap-x-4'>
            {/* Image */}
            <img
             src={previewSource || user?.image} 
             alt={`profile-${user?.firstName}`} 
             className='aspect-square w-[78px] rounded-full object-cover'
             />
             <div className='space-y-2'>
                <p>Change Profile Picture</p>
                <div className='flex flex-row gap-3'>
                    {/* Input */}
                    <input
                     type="file" 
                     ref={fileInputRef}
                        onChange={handleFileChange}
                        className='hidden'
                        accept="image/png, image/jpeg, image/jpg, image/gif"
                     />
                     {/* button */}
                    <button
                        onClick={handleClick}
                        disabled={loading}
                        className='cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50'
                    >
                     Select
                    </button>
                    {/* Icon bbutton */}
                    <IconBtn 
                       text={loading ? "Uploading..." : "Upload"}
                          onClick={handleFileUpload}
                    >
                    {!loading && (
                        <FiUpload className='text-lg text-richblack-900' />
                    )}
                    </IconBtn >
                </div>
             </div>
        </div>
    </div>
   </>
  )
}

export default ChangeProfilePicture