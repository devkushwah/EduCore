import React from 'react'
import * as Icons from "react-icons/vsc"
import { useDispatch } from "react-redux"
import { NavLink, matchPath, useLocation } from "react-router-dom"


// import { resetCourseState } from "../../../slices/courseSlice"




export default function SidebarLink({ link, iconName }) {
    const Icon = Icons[iconName]
    const location = useLocation()
    const dispatch = useDispatch()

    // jis pr click hoga usi par yellow color background color hoga uske liye matchRoute, kyoki matchRoute bataayga  ki yellow color bgc karna hai ya nahi
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname)
    }

    return (
        <NavLink
        to={link.path}
        onClick={ () => dispatch()}
        className={`relative px-8 py-8 text-sm font-medium ${matchRoute(link.path)
            ? "bg-yellow-800 text-yellow-50"
            : "bg-opacity-0 text-richblack-300"
        } transition-all duration-200`}
        >
            <span className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
                matchRoute(link.path)
                ? "opacity-100" 
                : "opacity-0"
            }`}> </span>

            <div className='flex items-center gap-x-2'>
                {/* Icon goes here */}
                <Icon className='text-lg' />
                <span>{link.name}</span>
            </div>

        </NavLink>
    )
}

