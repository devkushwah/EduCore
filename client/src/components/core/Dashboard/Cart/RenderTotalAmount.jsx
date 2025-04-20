import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import IconBtn from "../../../Common/IconBtn"
// Ye ek function hai jo course purchase karne ke liye backend API call karta hai.
import { buyCourse } from "../../../../services/operations/studentFeaturesAPI"

// Ye ek functional component hai jiska naam RenderTotalAmount hai. Iska kaam hai cart ka total amount aur "Buy Now" button dikhana.
export default function RenderTotalAmount() {
    // redux store se  total: total amount aur Cart: Cart mein jo courses hain, unka array hai
  const { total, cart } = useSelector((state) => state.cart)
   //  User ka authentication token hai.
  const { token } = useSelector((state) => state.auth)
  // Logged-in user ka data hai.
  const { user } = useSelector((state) => state.profile)

  const navigate = useNavigate()
  const dispatch = useDispatch()

    // "Buy Now" Button ka Handler
  const handleBuyCourse = () => {
    // courses: Cart mein jo courses hain, unke IDs ko ek array mein store kiya jata hai.
    const courses = cart.map((course) => course._id)
    buyCourse(token, courses, user, navigate, dispatch)
  }

  
  // UI Render Karna
  return (
    <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
      <p className="mb-6 text-3xl font-medium text-yellow-100">₹ {total}</p>
      <IconBtn
        text="Buy Now"
        onclick={handleBuyCourse}
        customClasses="w-full justify-center"
      />
    </div>
  )
}