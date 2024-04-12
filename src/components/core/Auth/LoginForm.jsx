import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { LoginDummyData } from "../../../data/logindata"
import { login } from "../../../services/operations/authAPI"


function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)

  const { email, password } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password, navigate))
  }

  const dummyDataClickHandler = (email, password) => {
  setFormData({
    ...formData,
    email: email,
    password: password,
  })
}


  return (
    <form
      onSubmit={handleOnSubmit}
      className="flex w-full flex-col gap-y-4"
    >
      <label className="w-full">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Email Address <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type="text"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
        />
      </label>
      <label className="relative">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Password <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleOnChange}
          placeholder="Enter Password"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[38px] z-[10] cursor-pointer"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          )}
        </span>
        <Link to="/forgot-password">
          <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
            Forgot Password
          </p>
        </Link>
      </label>
      <button
        type="submit"
        className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-semibold text-richblack-900"
      >
        Sign In
      </button>

      {/* Dummy Login Data */}
      <div className="flex flex-col gap-3">
      <p className="font-edu-sa text-[1.4rem] font-semibold leading-[2.375rem] text-richblack-5">Login Data</p>
      <div className="carousel rounded-box w-full container gap-x-5">
      {
        LoginDummyData.map((data,index) => {
          return (
            <div className="carousel-item w-1/2 outline-caribbeangreen-200 flex flex-col flex-wrap max-w-[50%] box" key={index} onClick={() => dummyDataClickHandler(data.email, data.password)}>
              <p className="font-edu-sa font-bold text-blue-100">{data.accountType}</p>
              <p className="text-richblack-100">Email: {data.email}</p>
              <p className="text-richblack-100">Password: {data.password}</p>
            </div>
          )
        })
      }
      </div>
      </div>

    </form>
  )
}

export default LoginForm