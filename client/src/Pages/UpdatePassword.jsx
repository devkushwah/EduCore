import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { resetPassword } from '../services/operations/authAPI';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { toast } from "react-hot-toast";

const UpdatePassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  });

  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  const { password, confirmPassword } = formData;

  // Validation functions
  const validatePassword = (password) => {
    // Minimum 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return passwordRegex.test(password)
  }

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    
    // Password validation
    if (!validatePassword(password)) {
      toast.error("Password must contain at least 8 characters, including uppercase, lowercase, number and special character")
      return
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match")
      return
    }

    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password, confirmPassword, token));
  };

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">Choose new password</h1>
          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">Almost done. Enter your new password and youre all set.</p>
          <form onSubmit={handleOnSubmit}>
            {/* New Password */}
            <label className="relative block">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">New Password  <sup className="text-pink-200">*</sup></p>
              <input
                className="form-style w-full !pr-10"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your new password"
                name="password"
                value={password}
                onChange={handleOnChange}
              />
              <span
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <AiFillEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiFillEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label >

            {/* Confirm Password */}
            <label className="relative mt-3 block">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Confirm Password  <sup className="text-pink-200">*</sup></p>
              <input
                className="form-style w-full !pr-10"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your new password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
              />
              <span
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? (
                  <AiFillEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiFillEye fontSize={24}  fill="#AFB2BF"/>
                )}
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
             className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
            >
              Update Password
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-6 flex items-center justify-between">
            <Link to="/login">
              <p className="flex items-center gap-x-2 text-richblack-5"> 
              <BiArrowBack />Back to Login</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
