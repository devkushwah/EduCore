import React from 'react'
import { FiTrash2 } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { deleteProfile } from "../../../../services/operations/SettingsAPI"

const DeleteAccount = () => {

    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    async function handleDeleteAccount() {
        try {
            // API CAll
            dispatch(deleteProfile(token, navigate))
        } catch (error) {
            console.log("error", error)
        }
    }
  return (
    <>
      <div className='my-10 flex flex-col gap-y-5 rounded-md border-[1px] border-pink-700 bg-pink-900 p-8 sm:flex-row sm:gap-x-5 sm:px-12'>
          <div className='flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700 mx-auto sm:mx-0'>
                <FiTrash2 className='text-3xl text-pink-200'/>
          </div>
            <div className='flex flex-col space-y-2 text-center sm:text-left'>
                <h2 className='text-lg font-semibold text-richblack-5'>
                    Delete Account
                </h2>
                <div className='text-pink-25 sm:w-3/5 mx-auto sm:mx-0'>
                    <p>Would you like to delete account?</p>
                    <p>
                    This account may contain Paid Courses. Deleting your account is
                    permanent and will remove all the content associated with it.
                    </p>
                </div>
                <button
                  type='button'
                    onClick={handleDeleteAccount}
                    className='w-fit cursor-pointer italic text-pink-300 mx-auto sm:mx-0'
                >
                    I want to delete my account
                </button>
            </div>
       </div>
    </>
  )
}

export default DeleteAccount