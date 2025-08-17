import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import UseAuth from "../hooks/UseAuth";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const { user, signOut } = UseAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      Swal.fire("Logged out!", "", "success");
      setShowLogout(false);
    } catch (err) {
      console.error(err);
    }
  };

  const publicLinks = [
    { to: "/", label: "Home" },
    { to: "/all-services", label: "Services" },
    { to: "/menu", label: "Menu" },
    { to: "/blogs", label: "Blog" },
    { to: "/contact-us", label: "Contact" },
  ];

  const authLinks = user
    ? [
        { to: "/dashboard/home", label: "Dashboard" },
      ]
    : [{ to: "/login", label: "Login" }];

  return (
    <header className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow-md z-50">
      <div className="flex items-center justify-between py-4 px-6 md:px-10">
        {/* Logo */}
        <Link
          to="/"
          className="heading-script text-black dark:text-white text-4xl font-bold mr-6"
        >
          Root
        </Link>

        {/* Theme Toggle */}
        <ThemeToggle />

      
       {/* Centered Nav */}
<nav className="hidden md:flex flex-1 justify-center space-x-6">
  {[...publicLinks, ...authLinks].map(({ to, label }) => (
    <NavLink
      key={to}
      to={to}
      className={({ isActive }) =>
        isActive
          ? "text-black dark:text-white font-semibold"
          : "text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
      }
    >
      {label}
    </NavLink>
  ))}
</nav>


        {/* Right side: Auth/User */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="relative">
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => setShowLogout(!showLogout)}
              >
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-9 h-9 rounded-full"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {user.displayName}
                </span>
              </div>

              <AnimatePresence>
                {showLogout && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="absolute right-0 mt-2 bg-white dark:bg-gray-800 shadow-md rounded-md overflow-hidden z-10"
                  >
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Login
            </NavLink>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button className="md:hidden text-black dark:text-white " onClick={() => setOpen((o) => !o)}>
          {open ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <nav
        className={`fixed top-0 left-0 h-full w-3/4 max-w-xs bg-white dark:bg-gray-900 shadow-lg transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden z-50`}
      >
        <div className="flex justify-end p-4">
          <HiOutlineX
            size={24}
            className="cursor-pointer text-gray-800 dark:text-white"
            onClick={() => setOpen(false)}
          />
        </div>

        {user && (
          <div className="px-6 py-4 border-b dark:border-gray-700">
            <div className="flex items-center space-x-3 mb-2">
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-9 h-9 rounded-full"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {user.displayName}
              </span>
            </div>
            <button
              onClick={() => {
                handleLogout();
                setOpen(false);
              }}
              className="block text-left text-red-600 hover:underline"
            >
              Logout
            </button>
          </div>
        )}

        {[...publicLinks, ...authLinks].map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `block px-6 py-4 ${
                isActive
                  ? "text-black dark:text-white font-semibold"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Navbar;
