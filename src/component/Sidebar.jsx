import React, { useState } from "react";
import { AiFillHome, AiOutlineFlag } from "react-icons/ai";
import { IoGameControllerSharp } from "react-icons/io5";
import { GiDiamondTrophy, GiEclipse, GiChickenOven } from "react-icons/gi";
import { CgMusicNote } from "react-icons/cg";
import { MdLocalFireDepartment } from "react-icons/md";
import {VscListFilter} from 'react-icons/vsc'
import controlImg from "../assets/control.png"
import { Link } from "react-router-dom";
import { BsFillPeopleFill } from 'react-icons/bs'


const Sidebar = () => {
  const menus = [
    { name: "Home", link: "/", icon: AiFillHome },
    { name: "History", link: "/videos/history", icon: AiOutlineFlag,  gap : true  },
    { name: "Followed", link: "/videos/followed", icon: BsFillPeopleFill },
    { name: "Trending", link: "/videos/trending", icon: MdLocalFireDepartment },
    { name: "Music", link: "/videos/category/music", icon: CgMusicNote, margin: true },
    { name: "Sports", link: "/videos/category/sports", icon: GiDiamondTrophy },
    { name: "Fashion", link: "/videos/category/fashion", icon: GiEclipse },
    { name: "Cooking", link: "/videos/category/cooking", icon: GiChickenOven, margin: true },
    { name: "Gaming", link: "/videos/category/gaming", icon: IoGameControllerSharp },
    { name: "Miscellaneous", link: "/videos/category/miscellaneous", icon: VscListFilter },
  ];
  
  const [open, setOpen] = useState(true);
  return (
    <div
        className={`shadow-md shadow-black ${
          open ? "w-60" : "w-28 "
        }  h-full  pt-8 relative duration-300`}
      >
        <img
          src={controlImg}
          className={`absolute cursor-pointer -right-3 top-80 w-7 border-dark-purple hover:bg-black
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
          alt="control-img"
        />
        <ul className= {`pt-6 ${open ? 'mr-8': 'mr-6'}`}>
          {menus.map((Menu, index) => (
            <Link key={index} to={Menu.link} style={{ textDecoration: 'none' }}>
              <li
                className={`flex text-black rounded-md p-2 cursor-pointer hover:bg-red-200 items-center ${!open? 'justify-center': ''} mx-auto gap-x-4 transition duration-200 ease-out hover:ease-in
                ${Menu.gap ? "mt-9" : "mt-2"} ${
                  index === 0 && "bg-light-white"
                } `}
              >
                {React.createElement(Menu?.icon, { size: "20" })}
                <span className={`${!open && "hidden"} origin-left duration-200`}>
                  {Menu.name}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
  );
};

export default Sidebar;
