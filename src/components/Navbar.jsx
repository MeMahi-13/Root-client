import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { Link, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import UseAuth from '../hooks/UseAuth';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const { user, signOut } = UseAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      Swal.fire('Logged out!', '', 'success');
      setShowLogout(false);
    } catch (err) {
      console.error(err);
    }
  };

  const publicLinks = [{ to: '/contact-us', label: 'Contact' }];
  const authLinks = user ? [{ to: '/dashboard/home', label: 'Dashboard' }] : [{ to: '/login', label: 'Login' }];

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="flex items-center justify-between py-4 px-6 md:px-10">
        <Link to="/" className="heading-script text-black text-5xl font-bold">Root</Link>

        {/* Desktop Content */}
        <nav className="hidden md:flex items-center space-x-6 relative">
          {user && (
            <div className="relative mr-4">
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => setShowLogout(!showLogout)}
              >
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-9 h-9 rounded-full"
                />
                <span className="text-sm text-gray-700">{user.displayName}</span>
              </div>

              <AnimatePresence>
                {showLogout && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="absolute right-0 mt-2 bg-white shadow-md rounded-md overflow-hidden z-10"
                  >
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 text-left w-full"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {[...authLinks, ...publicLinks].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                isActive ? 'text-black font-semibold' : 'text-gray-700 hover:text-blue-500'
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <button className="md:hidden" onClick={() => setOpen((o) => !o)}>
          {open ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <nav
        className={`
          fixed top-0 left-0 h-full bg-white w-3/4 max-w-xs shadow-lg
          transform ${open ? 'translate-x-0' : '-translate-x-full'}
          transition-transform duration-300 ease-in-out
          md:hidden z-50
        `}
      >
        <div className="flex justify-end p-4">
          <HiOutlineX size={24} className="cursor-pointer" onClick={() => setOpen(false)} />
        </div>

        {user && (
          <div className="px-6 py-4 border-b">
            <div className="flex items-center space-x-3 mb-2">
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-9 h-9 rounded-full"
              />
              <span className="text-sm font-medium">{user.displayName}</span>
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
              `block px-6 py-4 ${isActive ? 'text-black font-semibold' : 'text-gray-700 hover:bg-gray-100'}`
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
