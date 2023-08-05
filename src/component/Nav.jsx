import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import Logo from "../logos/logo-no-background.png";
import { useNavigate } from "react-router-dom";

const Nav = ({ seed, setSeed }) => {
  const navigate = useNavigate();
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setUserToken(token);
  }, [seed]);

  const logout = () => {
    localStorage.removeItem("token");
    setUserToken(null);
    setSeed((seed) => !seed);
    navigate("/");
    navigate(0);
  };
  return (
    <nav className="flex flex-row shadow-md shadow-gray-400 bg-gray-50 w-full h-20 items-center sticky top-0 dark:border-gray-600">
      <div className="basis-3/12">
        <Link to="/">
          <img src={Logo} alt="Logo" className="h-16 m-1 ml-3" />
        </Link>
      </div>
      <div className="basis-6/12 flex items-center">
        <Link style={{ textDecoration: 'none' }} to={"/videos/search"}>
          <button  className="text-black text-start hover:bg-gray-200 font-extralight py-1 pl-2 rounded-md w-72 mr-12 border border-black flex items-center justify-between">
            <div>
              Search...
            </div>
            <div className="mr-4">
              <AiOutlineSearch  />
            </div>
          </button>
        </Link>
      </div>
      <div className="basis-3/12 flex">
        <div className="w-2/6 flex ">
          <Link
            style={{ textDecoration: "none" }}
            to="/videos/new"
            className="flex justify-items-center items-center">
            <div className="text-black border-2 border-black w-12 h-10 rounded-md cursor-pointer mr-4 hover:bg-red-200 hover:border-red-700 transition duration-150 ease-out hover:ease-in">
              <AiOutlinePlus className="m-auto h-8" size={28} />
            </div>
          </Link>
        </div>
        <div className="w-4/6 flex items-center justify-end pr-8">
          <Link style={{ textDecoration: "none" }} to={"/profile"}>
            {" "}
            <div className="text-black border-2 border-black w-16 h-10 rounded-md flex items-center cursor-pointer hover:bg-red-200 hover:border-red-700 transition duration-150 ease-out hover:ease-in mr-4">
              <FaUser className="m-auto h-6" size={28} />
            </div>
          </Link>
          <div
            className="border-2 border-black w-16 h-10 rounded-md flex items-center cursor-pointer hover:bg-red-200 hover:border-red-700 transition duration-150 ease-out hover:ease-in"
            onClick={logout}>
            <AiOutlineLogout className="m-auto h-6" size={28} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
