import { useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";

import { Link } from "react-router-dom";

function Header({ user, handleLogout }) {
  const [show, setShow] = useState(false);
  const userId = user?.uid;

  return (
    <nav
      className="fixed top-0  flex flex-1 justify-between w-full items-center px-2 sm:px-12 font-semibold py-4 uppercase 
    tracking-wide backdrop-blur-sm bg-[#e8e8e8]/60 shadow-md z-10"
    >
      <div className=" sm:hidden w-full">
        <button className=" text-3xl pb-1" onClick={() => setShow(!show)}>
          <BiMenuAltRight />
        </button>
        {show && (
          <ul className="flex flex-col gap-2 cursor-pointer absolute left-0 w-full backdrop-blur-md bg-white/90">
            <Link to="/">
              <li className="px-4 py-3 ease duration-200 hover:bg-yellow-400 hover:px-6">
                Home
              </li>
            </Link>
            <Link to="/create">
              <li className="px-4 py-3 ease duration-200 hover:bg-yellow-400 hover:px-6">
                Create
              </li>
            </Link>
            <Link to="/about">
              <li className="px-4 py-3 ease duration-200 hover:bg-yellow-400 hover:px-6">
                About
              </li>
            </Link>
          </ul>
        )}
      </div>
      <ul className="hidden sm:flex gap-8 cursor-pointer ">
        <Link to="/">
          <li className="hover:underline">Home</li>
        </Link>
        <Link to="/create">
          <li className="hover:underline">Create</li>
        </Link>
        <Link to="/about">
          <li className="hover:underline">About</li>
        </Link>
      </ul>
      <div>
        {userId ? (
          <div className="flex gap-6 w-72 items-center justify-end flex-wrap">
            <div className="flex items-center gap-2">
              <img
                src="../../public/imgs/profile-pic.png"
                alt="profile-user"
                className="w-12 h-12 rounded-full border-2 border-yellow-900 bg-stone-100"
              />
              <p className=" text-base sm:text-lg">{user?.displayName}</p>
            </div>
            <Link to="/auth">
              <button
                className="hover:underline uppercase text-purple-700"
                onClick={handleLogout}
              >
                Logout
              </button>
            </Link>
          </div>
        ) : (
          <Link to="/auth">
            <button className="hover:underline uppercase text-purple-700">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Header;
