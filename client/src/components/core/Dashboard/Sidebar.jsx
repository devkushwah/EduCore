import React from 'react'
import { useState } from 'react'
import { VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { sidebarLinks } from "../../../data/dashboard-links"
import { logout } from "../../../services/operations/authAPI"
import ConfirmationModal from '../../Common/ConfirmationModal'
import SidebarLink from './SidebarLink'



const Sidebar = () => {

  const { user, loading: profileLoading } = useSelector( (state) => state.profile)
  const { loading: authLoading } = useSelector( (state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // To keep track of confirmation modal, starting me display nahi hoga isliye null rakha hai
  const [confirmationModal, setConfirmationModal] = useState(null)


  // agar dono mese koi bhi loading hui to hum (spinner) use krenge
  if (profileLoading || authLoading ) {
    return (
      <div className='grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800'>
        <div className='spinner'></div>
      </div>
    )
  }



  return (
    <>
        <div className=''>
        <div className='flex flex-col'>
          {/* Ab sidebar links ke liye map loop lagaaynge  aur agar inn links me type object present hai to condition ke hisaab se links ko display krenge aur link samaz nhi aa raha hai to map me check karo kya props diya hai*/}
          {
            // data dheko usme instructor aur student ke liye alag alag links hai isliye humne sidebarLinks me type bhi add kiya hai jisse hum student ke type ke hisaab se links show kar sake, jaise data me 6 id's hai usme kuch instructor ke liye hai aur kuch student ke liye, to humne type bhi add kiya hai jisse hum user ke type ke hisaab se links show kar sake, jaise agar user student hai to usko sirf student ke links dikhayenge aur agar instructor hai to usko sirf instructor ke links dikhayenge jaise link.type = instructor jiski 4 id's hai to baaki 2 id's o null krdenge
            sidebarLinks.map( (link) => {
              if (link.type && user?.accountType !== link.type) return null
              // aur agar match ho gaya to hum hum ye sab display karwa denge
              return (
                <SidebarLink 
                key={link.id} 
                link={link}
                iconName={link.icon} 
                />
              )
            })
          }

        </div>
        
        {/* ye spacing dedi*/}
        <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700'></div>

        {/* Ye  Settings ke liye*/}
        <div className="flex flex-col items-center">
          <SidebarLink 
          link={{ name: "Settings", path: "/dashboard/settings" }}
          iconName="VscSettingsGear"
          />
          {/* Ye logout ke liye */}
          <button 
          onClick={() => 
            setConfirmationModal({
              text1: "Are you sure?",
              text2: "You will be logged out of your account.", 
              btn1Text: "Logout",
              btn2Text: "Cancel",
              btn1Handler: () => {
                dispatch(logout());
                navigate("/login"); // Manually navigating after logout
            },
            
              btn2Handler: () => setConfirmationModal(null)
            })}
            className="px-8 py-2 text-sm font-medium text-richblack-300" 
          >
            <div className="flex items-center gap-x-2">
              {/* icon */}
              <VscSignOut className="text-lg" />
              {/* button */}
              <span>Logout</span>
            </div>

          </button>
        </div>

    </div>

    {/* // Agar confirmationModal present hai joki logout button par click karne par  hoga , to hum modal ka props send kr denge */}
    {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}

export default Sidebar