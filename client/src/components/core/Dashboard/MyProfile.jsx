import React from 'react'
import { RiEditBoxLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { formattedDate } from "../../../utils/dateFormatter"
import IconBtn from "../../Common/IconBtn"

const MyProfile = () => {

  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()

  return (
    <>
      {/* Heading of my profile */}
      <h1 className='mb-14 text-3xl font-medium text-richblack-5'>
        My Profile
      </h1>

      {/* Section1(Profile Details): firstName, LastName, User Image, Email, iconbtn*/}
      <div className='flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12'>
        <div className='flex items-center gap-x-4'>
          {/* User Image */}
          <img
            src={user?.image}
            alt={`profile-${user?.firstName ?? "User"}`}
            className='aspect-square w-[78px] rounded-full object-cover'
          />
          
          <div className='space-y-1'>
            {/* FirstName and lastName*/}
            <p className='text-lg font-semibold text-richblack-5'>
              {user?.firstName + " " + user?.lastName}
            </p>
            {/* Email */}
            <p className='text-sm text-richblack-300'>{user?.email}</p>
          </div>
        </div>
        {/* Icon Button for Edit */}
        <IconBtn
          text="Edit"
          onClick={() => navigate("/dashboard/settings")}
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>

      {/* Section2(About Section): About heading, icnbtn, paragraph line */}
      <div className='my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12'>
        <div className='flex w-full items-center justify-between'>
          <p className='text-lg font-semibold text-richblack-5'>About</p>
          <IconBtn
            text="Edit"
            onClick={() => navigate("/dashboard/settings")}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p
          className={`${
            user?.additionalDetails?.about
              ? "text-richblack-5"
              : "text-richblack-400"
          } text-sm font-medium`}
        >
          {user?.additionalDetails?.about ?? "Write something about yourself"}
        </p>
      </div>

      {/* Personal Details */}
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className='text-lg font-semibold text-richblack-5'>Personal Details</p>
          <IconBtn
            text="Edit"
            onClick={() => navigate("/dashboard/settings")}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <div className="flex max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className='mb-2 text-sm text-richblack-600'>First Name</p>
              <p className='text-sm font-medium text-richblack-5'>{user?.firstName}</p>
            </div>
            <div>
              <p className='mb-2 text-sm text-richblack-600'>Email</p>
              <p className='text-sm font-medium text-richblack-5'>{user?.email}</p>
            </div>
            <div>
              <p className='mb-2 text-sm text-richblack-600'>Gender</p>
              <p className='text-sm font-medium text-richblack-5'>
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className='mb-2 text-sm text-richblack-600'>Last Name</p>
              <p className='text-sm font-medium text-richblack-5'>{user?.lastName}</p>
            </div>
            <div>
              <p className='mb-2 text-sm text-richblack-600'>Phone Number</p>
              <p className='text-sm font-medium text-richblack-5'>
                {user?.additionalDetails?.phoneNumber ?? "Add Phone Number"}
              </p>
            </div>
            <div>
              <p className='mb-2 text-sm text-richblack-600'>Date Of Birth</p>
              <p className='text-sm font-medium text-richblack-5'>
                {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyProfile
