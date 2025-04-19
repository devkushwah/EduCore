// API babane ke liye humne kya kya kiya hai:

// 1. pehle humne { toast, profileSlice se setUser, apiConnector, 
// settingsEndpoints se UPDATE_DISPLAY_PICTURE_API, UPDATE_PROFILE_API, CHANGE_PASSWORD_API, DELETE_PROFILE_API, logout } import kiya hai from react-hot-toast, profileSlice, apiconnector, apis, authAPI respectively.
                                                                                                                          
/*
 sab functions ko likhne ka tareeka:

  1. function name ko define karein
  2. return kare async keyword use karke jisme dispatch function ko pass karenge jisse function dispatch hoga.
  3. function ke andar ek toastId variable banayein jo toast.loading() function se aata hai
  4. try-catch block me apiConnector function ka use karein await karke(kyoki asynch return kar rahe hai)jo hume          UPDATE_DISPLAY_PICTURE_API endpoint pe request bhejta hai aur wo hum response object me store krenge
  5. apiConnector function ko use krne ke liye (method, url, bodyData, headers, params) jisme url me settingsEndpoints denge aur bodyData like image wo hum formData ke dwara denge, headers me hum Authorization: `Bearer ${token}` denge
  aur params me null denge har function me
  6. try block me hum response object ko check karenge ki woh null hai ya nahi, agar null hai to hum error throw karenge
  7. agar response object me success true aata hai to hum dispatch function ko call karke humare data ko update karenge aur toast.success() function se success toast dikhayenge aur agar koi error aata hai to hum toast.error() function se error toast dikhayenge aur toastId ko dismiss karenge 

 */


  import { toast } from "react-hot-toast"

  import { setUser } from "../../slices/profileSlice"
  import { apiConnector } from "../apiconnector"
  import { settingsEndpoints } from "../apis"
  import { logout } from "./authAPI"
  
  const {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API,
  } = settingsEndpoints
  
  // 2. Fir humne updateDisplayPicture function banaya jisme humne dispatch function ka use kiya hai jo hume profileSlice se setUser function ko call karke humare data ko update karega. Is function me humne pehle toastId banaya hai jo toast.loading() function se aata hai jo hume loading toast dikhata hai. Fir humne try-catch block me apiConnector function ka use kiya hai jo hume UPDATE_DISPLAY_PICTURE_API endpoint pe request bhejta hai. Agar response me success false aata hai to humne error throw kiya hai. Agar response me success true aata hai to humne toast.success() function se success toast dikhaya hai aur setUser function ko call karke humare data ko update kiya hai. Agar koi error aata hai to humne toast.error() function se error toast dikhaya hai. Ye function hume user ka display picture update karne me help karega.
  
  export function updateDisplayPicture(token, formData) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      try {
        const response = await apiConnector(
          "PUT",
          UPDATE_DISPLAY_PICTURE_API,
          formData,
          {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          }
        )
        console.log(
          "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
          response
        )
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        toast.success("Display Picture Updated Successfully")
        dispatch(setUser(response.data.data))
      } catch (error) {
        console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
        toast.error("Could Not Update Display Picture")
      }
      toast.dismiss(toastId)
    }
  }
  
  // 3. Fir humne updateProfile function banaya jisme humne dispatch function ka use kiya hai jo hume profileSlice se setUser function ko call karke humare data ko update karega. Is function me humne pehle toastId banaya hai jo toast.loading() function se aata hai jo hume loading toast dikhata hai. Fir humne try-catch block me apiConnector function ka use kiya hai jo hume UPDATE_PROFILE_API endpoint pe request bhejta hai. Agar response me success false aata hai to humne error throw kiya hai. Agar response me success true aata hai to humne toast.success() function se success toast dikhaya hai aur setUser function ko call karke humare data ko update kiya hai. Agar koi error aata hai to humne toast.error() function se error toast dikhaya hai. Ye function hume user ka profile update karne me help karega.
  
  export function updateProfile(token, formData) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      try {
        const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
          Authorization: `Bearer ${token}`,
        })
        console.log("UPDATE_PROFILE_API API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        // User ki image ko update karta hai. Agar nahi ho toh initials se ek image generate karta hai.
        const userImage = response.data.updatedUserDetails.image
          ? response.data.updatedUserDetails.image
          : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`
          // dispatch use krke setUser function ko trigger karna
        dispatch(
        // Redux store mein updated user details save karta hai.
          setUser({ ...response.data.updatedUserDetails, image: userImage })
        )
        toast.success("Profile Updated Successfully")
      } catch (error) {
        console.log("UPDATE_PROFILE_API API ERROR............", error)
        toast.error("Could Not Update Profile")
      }
      toast.dismiss(toastId)
    }
  }
  
  // 4. Fir humne changePassword function banaya jisme humne try-catch block me apiConnector function ka use kiya hai jo hume CHANGE_PASSWORD_API endpoint pe request bhejta hai. Agar response me success false aata hai to humne error throw kiya hai. Agar response me success true aata hai to humne toast.success() function se success toast dikhaya hai. Agar koi error aata hai to humne toast.error() function se error toast dikhaya hai. Ye function hume user ka password change karne me help karega.
  
  export async function changePassword(token, formData) {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
        Authorization: `Bearer ${token}`,
      })
      console.log("CHANGE_PASSWORD_API API RESPONSE............", response)
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Password Changed Successfully")
    } catch (error) {
      console.log("CHANGE_PASSWORD_API API ERROR............", error)
      toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
  }
  
  // 5. Fir humne deleteProfile function banaya jisme humne dispatch function ka use kiya hai jo hume profileSlice se setUser function ko call karke humare data ko update karega. Is function me humne pehle toastId banaya hai jo toast.loading() function se aata hai jo hume loading toast dikhata hai. Fir humne try-catch block me apiConnector function ka use kiya hai jo hume DELETE_PROFILE_API endpoint pe request bhejta hai. Agar response me success false aata hai to humne error throw kiya hai. Agar response me success true aata hai to humne toast.success() function se success toast dikhaya hai aur setUser function ko call karke humare data ko update kiya hai. Agar koi error aata hai to humne toast.error() function se error toast dikhaya hai. Ye function hume user ka profile delete karne me help karega.
  
  
  export function deleteProfile(token, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      try {
        const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
          Authorization: `Bearer ${token}`,
        })
        console.log("DELETE_PROFILE_API API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        toast.success("Profile Deleted Successfully")
        dispatch(logout(navigate))
      } catch (error) {
        console.log("DELETE_PROFILE_API API ERROR............", error)
        toast.error("Could Not Delete Profile")
      }
      toast.dismiss(toastId)
    }
  }