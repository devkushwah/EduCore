import { useEffect, useState } from "react"
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"

import logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from "../../data/navbar-links"
import { apiConnector } from "../../services/apiconnector"  
import { categories } from "../../services/apis"
import { ACCOUNT_TYPE } from "../../utils/constants" 
import ProfileDropdown from "../core/Auth/ProfileDropDown"

function Navbar() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCatalogOpen, setIsCatalogOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev)
  }

  useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        console.log(res);
        setSubLinks(res?.data.data)
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
      setLoading(false)
    })()
  }, [])
 

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" width={120} height={24} loading="lazy" />
        </Link>
        {/* Navigation links */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      <p>{link.title}</p>
                      <BsChevronDown />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : (subLinks && subLinks.length) ? (
                          <>
                            {subLinks
                              ?.filter(
                                (subLink) => subLink?.courses?.length > 0
                              )
                              ?.map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                  key={i}
                                >
                                  <p>{subLink.name}</p>
                                </Link>
                              ))}
                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            {/* Slide-in Menu */}
            <div className="fixed top-0 right-0 z-50 h-full w-4/5 max-w-xs bg-richblack-900 rounded-l-2xl shadow-2xl p-6 overflow-y-auto transform transition-transform duration-300 md:hidden animate-slide-in">
              {/* Close Icon */}
              <button
                className="absolute top-4 right-4 text-3xl text-yellow-300 hover:text-yellow-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                ✖
              </button>
              <ul className="flex flex-col items-start gap-y-10 mt-10 text-richblack-25">
                {NavbarLinks.map((link, index) => (
                  <li key={index} className="w-full">
                    {link.title === "Catalog" ? (
                      <>
                        <div
                          className="flex items-center justify-between cursor-pointer px-2 py-2 rounded-lg hover:bg-richblack-800 transition"
                          onClick={() => setIsCatalogOpen((prev) => !prev)}
                        >
                          <p className="text-xl font-bold text-yellow-300">
                            {link.title}
                          </p>
                          <BsChevronDown
                            className={`ml-2 text-lg transition-transform ${
                              isCatalogOpen ? "rotate-180" : ""
                            }`}
                          />
                        </div>
                        {isCatalogOpen && (
                          <ul className="mt-2 ml-4 space-y-2 bg-richblack-800 rounded-lg p-3 shadow-inner">
                            {loading ? (
                              <li className="text-center text-yellow-300">Loading...</li>
                            ) : subLinks && subLinks.length ? (
                              subLinks
                                .filter((subLink) => subLink?.courses?.length > 0)
                                .map((subLink, i) => (
                                  <li key={i}>
                                    <Link
                                      to={`/catalog/${subLink.name
                                        .split(" ")
                                        .join("-")
                                        .toLowerCase()}`}
                                      onClick={() => setIsMobileMenuOpen(false)}
                                      className="block text-yellow-200 hover:text-yellow-400 px-2 py-1 rounded transition"
                                    >
                                      {subLink.name}
                                    </Link>
                                  </li>
                                ))
                            ) : (
                              <li className="text-center text-yellow-300">No Courses Found</li>
                            )}
                          </ul>
                        )}
                      </>
                    ) : (
                      <Link
                        to={link?.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <p
                          className={`text-xl font-bold text-yellow-300 px-2 py-2 rounded-lg hover:bg-richblack-800 hover:scale-105 transition-all duration-200 ${
                            matchRoute(link?.path) && link.title !== "Contact Us"
                              ? "underline decoration-yellow-400"
                              : ""
                          }`}
                        >
                          {link.title}
                        </p>
                      </Link>
                    )}
                  </li>
                ))}
                {/* Add Login/Signup buttons in mobile menu */}
                {token === null && (
                  <>
                    <li className="w-full">
                      <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                        <button className="w-full rounded-[8px] border border-yellow-400 bg-richblack-800 px-[12px] py-[10px] text-yellow-200 font-semibold hover:bg-yellow-400 hover:text-richblack-900 transition">
                          Log in
                        </button>
                      </Link>
                    </li>
                    <li className="w-full">
                      <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                        <button className="w-full rounded-[8px] border border-yellow-400 bg-richblack-800 px-[12px] py-[10px] text-yellow-200 font-semibold hover:bg-yellow-400 hover:text-richblack-900 transition">
                          Sign up
                        </button>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
            {/* Animation keyframes */}
            <style>
              {`
                @keyframes slideInRight {
                  from { transform: translateX(100%); }
                  to { transform: translateX(0); }
                }
                .animate-slide-in {
                  animation: slideInRight 0.3s cubic-bezier(0.4,0,0.2,1);
                }
              `}
            </style>
          </>
        )}
        {/* Login / Signup / Dashboard */}
        <div className="hidden items-center md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative mr-4">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 ml-3">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>
        <div className="flex items-center gap-0 md:hidden">
          <button className="mr-2" onClick={toggleMobileMenu}>
            <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
          </button>
          {token !== null && <ProfileDropdown />}
        </div>
      </div>
    </div>
  )
}

export default Navbar