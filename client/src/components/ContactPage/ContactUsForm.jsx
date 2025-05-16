import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import CountryCode from "../../data/countrycode.json"
import { apiConnector } from "../../services/apiconnector"  // Form data ko backend par bhejne ke liye API call function.
// import { contactusEndpoint } from "../../services/apis"

const ContactUsForm = () => {

  // loader state: Button disable karne ke liye jab API call chal rahi ho.
  const [loading, setLoading] = useState(false)

  // Component Initialization for react-hool-form 
  const {
    register,  // Form ke har input ko react-hook-form ke state se connect karta hai.
    handleSubmit,  // Form submit karne par submitContactForm function execute karega
    reset,  // Form inputs ko reset karta hai submit ke baad
    formState: { errors, isSubmitSuccessful },  // Errors handle karta hai aur successful submit track karta hai.
  } = useForm()

  const submitContactForm = async (data) => {
    // console.log("Form Data - ", data)
    try {
      setLoading(true)  //  Loader on.
      const res = await apiConnector(
        "POST",
        // contactusEndpoint.CONTACT_US_API,
        data
      )   //  Backend API call.
      // console.log("Email Res - ", res)
      setLoading(false)  // Loader off.
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)  // Error logging.
      setLoading(false)
    }
  }


  // Form submit hone ke baad agar successful ho, toh reset se saare input fields empty ho jate hain.
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      })
    }
  }, [reset, isSubmitSuccessful])   // reset



  return (
    <form
      className="flex flex-col gap-7"
      // handleSubmit(submitContactForm): React-hook-form ka handleSubmit form ke data ko validate karta hai aur submitContactForm ko call karta hai.
      onSubmit={handleSubmit(submitContactForm)}
    >
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="flex flex-col gap-2 lg:w-[48%] w-full">
          <label htmlFor="firstname" className="lable-style">
            First Name
          </label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="Enter first name"
            className="form-style w-full"
            // register("firstname", { required: true }): First name ko register karta hai aur required validation lagata hai.
            {...register("firstname", { required: true })}
          />
          {/* errors.firstname: Agar validation fail ho, error message dikhta hai */}
          {errors.firstname && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your name.
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2 lg:w-[48%] w-full">
          <label htmlFor="lastname" className="lable-style">
            Last Name
          </label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Enter last name"
            className="form-style w-full"
            {...register("lastname")}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="lable-style">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter email address"
          className="form-style w-full"
          {...register("email", { required: true })}
        /> 
        {errors.email && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please enter your Email address.
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="phonenumber" className="lable-style">
          Phone Number
        </label>

        <div className="flex flex-col gap-2 sm:flex-row sm:gap-5">
          <div className="flex w-full sm:w-[81px] flex-col gap-2">
            <select
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Enter first name"
              className="form-style w-full"
              {...register("countrycode", { required: true })}
            >
              {/* CountryCode: JSON file se data fetch karke dropdown banata hai. */}
              {CountryCode.map((ele, i) => {
                return (
                  <option key={i} value={ele.code}>
                    {ele.code} -{ele.country}
                  </option>
                )
              })}
            </select>
          </div>
          <div className="flex w-full sm:w-[calc(100%-90px)] flex-col gap-2">
            <input
              type="number"
              name="phonenumber"
              id="phonenumber"
              placeholder="12345 67890"
              className="form-style w-full"
              // Phone number validations: Length check karta hai (10-12 digits).
              {...register("phoneNo", {
                required: {
                  value: true,
                  message: "Please enter your Phone Number.",
                },
                maxLength: { value: 12, message: "Invalid Phone Number" },
                minLength: { value: 10, message: "Invalid Phone Number" },
              })}
            />
          </div>
        </div>
        {errors.phoneNo && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            {errors.phoneNo.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="lable-style">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          cols="30"
          rows="7"
          placeholder="Enter your message here"
          className="form-style w-full"
          {...register("message", { required: true })}
        />
        {errors.message && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please enter your Message.
          </span>
        )}
      </div>

      <button
        disabled={loading}   //  Disable button while loading.
        type="submit"
        className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] w-full sm:w-auto
         ${
           !loading &&
           "transition-all duration-200 hover:scale-95 hover:shadow-none"
         }  disabled:bg-richblack-500 sm:text-[16px] `}
      >
        Send Message
      </button>
    </form>
  )
}

export default ContactUsForm