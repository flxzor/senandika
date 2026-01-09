"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import NavLogo from "@/assets/LogoSenandika.svg";

const menus = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
];

const NavBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-senandika">
      <div className="h-[12vh] flex items-center justify-between w-[90%] xl:w-[80%] mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image src={NavLogo} alt="Logo" width={40} height={40} />
          <span className="text-2xl font-bold text-senandika-bold">
            Senandika
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-10">
          {menus.map((menu) => (
            <Link
              key={menu.href}
              href={menu.href}
              className="
                text-senandika
                font-semibold
                transition-all
                duration-200
                hover:text-pink-900
                hover:underline
                underline-offset-4
                hover:scale-105
              "
            >
              {menu.name}
            </Link>
          ))}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-senandika"
        >
          {open ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden absolute top-[12vh] left-0 w-full bg-senandika shadow-md">
          <div className="flex flex-col gap-4 p-6">
            {menus.map((menu) => (
              <Link
                key={menu.href}
                href={menu.href}
                onClick={() => setOpen(false)}
                className="
                  text-senandika
                  font-semibold
                  transition-colors
                  duration-200
                  hover:text-senandika-bold
                "
              >
                {menu.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
