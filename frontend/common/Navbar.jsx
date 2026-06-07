"use client";

import React from "react";
import Link from "next/link";
import { IoPersonCircleSharp, IoSearch } from "react-icons/io5";
import { MdSportsCricket } from "react-icons/md";
import { TiHome } from "react-icons/ti";
import { LuPopcorn } from "react-icons/lu";
import { FaTv } from "react-icons/fa6";
import { TbCategoryFilled } from "react-icons/tb";

const Navbar = () => {
  const menuItems = [
    { icon: <TiHome />, label: "Home", href: "/" },
    { icon: <IoSearch />, label: "Search", href: "/search" },
    { icon: <FaTv />, label: "TV", href: "/shows" },
    { icon: <LuPopcorn />, label: "Movies", href: "/movies" },
    { icon: <MdSportsCricket />, label: "Sports", href: "/sports" },
    { icon: <TbCategoryFilled />, label: "Categories", href: "/categories" },
    { icon: <IoPersonCircleSharp />, label: "My Space", href: "/myspace" },
  ];

  return (
    <aside className="fixed left-0 top-0 z-50 h-screen w-20 hover:w-60 bg-black text-white transition-all duration-300 group">
      <div className="flex h-full flex-col justify-center">
        <ul className="space-y-3">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="flex items-center gap-4 px-6 py-3 hover:bg-zinc-800 transition-colors"
              >
                <span className="text-3xl">{item.icon}</span>

                <span className="opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Navbar;