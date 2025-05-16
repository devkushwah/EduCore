import React from 'react'
import { RiEditBoxLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { formattedDate } from "../../../utils/dateFormatter"
import IconBtn from "../../Common/IconBtn"

const MyProfile = () => {

  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()

  // for testing purposes, we can use console.log to check if the user is logged in or not
  const handleEditClick = () => {
    console.log("Navigating to settings...");
    navigate("/dashboard/settings");
  };

  return (
    <>
      {/* Heading of my profile */}
      <h1 className="mb-8 text-2xl font-medium text-richblack-5 md:mb-14 md:text-3xl text-right">
        My Profile
      </h1>

      {/* Section1(Profile Details): firstName, LastName, User Image, Email, iconbtn */}
      <div className="flex flex-col md:flex-row items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 md:p-8 md:px-12">
        <div className="flex items-center gap-x-4">
          {/* User Image */}
          <img
            src={user?.image}
            alt={`profile-${user?.firstName ?? "User"}`}
            className="aspect-square w-[60px] md:w-[78px] rounded-full object-cover"
          />
          <div className="space-y-1 max-w-[200px] sm:max-w-full break-words">
            {/* FirstName and lastName */}
            <p className="text-base md:text-lg font-semibold text-richblack-5">
              {user?.firstName + " " + user?.lastName}
            </p>
            {/* Email */}
            <p className="text-sm text-richblack-300 break-words">
              {user?.email}
            </p>
          </div>

        </div>
        {/* Icon Button for Edit */}
        <IconBtn
          text="Edit"
          onClick={handleEditClick}
          className="mt-4 md:mt-0 "
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>

      {/* Section2(About Section): About heading, icnbtn, paragraph line */}
      <div className="my-6 md:my-10 flex flex-col gap-y-6 md:gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 md:p-8 md:px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-base md:text-lg font-semibold text-richblack-5">About</p>
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
      <div className="my-6 md:my-10 flex flex-col gap-y-6 md:gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 md:p-8 md:px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-base md:text-lg font-semibold text-richblack-5">Personal Details</p>
          <IconBtn
            text="Edit"
            onClick={() => navigate("/dashboard/settings")}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <div className="flex flex-wrap gap-y-6 md:gap-y-0 md:max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5 w-full md:w-1/2">
            <div>
              <p className="mb-2 text-sm text-richblack-600">First Name</p>
              <p className="text-sm font-medium text-richblack-5">{user?.firstName}</p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Email</p>
              <p className="text-sm font-medium text-richblack-5">{user?.email}</p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Gender</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5 w-full md:w-1/2">
            <div>
              <p className="mb-2 text-sm text-richblack-600">Last Name</p>
              <p className="text-sm font-medium text-richblack-5">{user?.lastName}</p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.phoneNumber ?? "Add Phone Number"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
              <p className="text-sm font-medium text-richblack-5">
                {formattedDate(user?.additionalDetails?.dateOfBirth) ?? "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyProfile
