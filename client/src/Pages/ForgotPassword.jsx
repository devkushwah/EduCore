import React from 'react'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI';
import { useDispatch } from 'react-redux';  
 

const ForgotPassword = () => {

   

    const [email, setEmail] = useState("");
    const [emailsent, setEmailSent] = useState(false);
    const { loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const HandleOnSubmit = (e) => { 
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent));
    }


  return (
    <div className='grid place-items-center h-screen'>
        {
            loading ? (
                <div className="spinner"></div>
            ) : (
                <div className='max-w-[500] p-4 lg:p-8 '>
                    <h1 className='text-[1.875rem] font-semibold leading-[2.375rem]
                    text-richblack-5'>
                       {
                         !emailsent ? "Reset Your Password" : "Check your Email"
                       }
                    </h1>

                    <p className='my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100'>
                        {
                            !emailsent ? "Enter your email address below to reset your password"
                            : `We have sent the reset email to ${email} `
                        }
                    </p>

                    <form onSubmit={HandleOnSubmit}>
                        {
                            !emailsent && (
                                <label className='w-full'>
                                    <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>Email Address  <sup className="text-pink-200">*</sup></p>
                                    <input 
                                    className="form-style w-full"
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                            
                                </label>
                            )
                        }

                    <button
                    type='submit'
                    className='mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900'
                    >
                        {
                            !emailsent ? "Send Email" : "Resend Email"
                        }
                    </button>

                    </form>

                    <div className='mt-6 flex items-center justify-between'>
                        <Link to="/login">
                        <p className='flex items-center gap-x-2 text-richblack-5'>Back to Login</p>
                         </Link>
                    </div>
                </div>
            )

        }
    </div>
  )
}

export default ForgotPassword