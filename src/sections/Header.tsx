"use client";
import { useEffect, useRef } from "react";
import { useState } from "react";
import Image from "next/image";
import NavLogo from "@/assets/LogoSenandika.svg";

type NavLink = {
  label: string;
  href: string;
};

const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuHeight, setMenuHeight] = useState("0px");

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuRef.current) {
      setMenuHeight(isOpen ? `${menuRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen]);

  const handleScroll = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      const yOffset = -80;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
          ${
            isScrolled
              ? "backdrop-blur-lg bg-background shadow-md"
              : "bg-transparent"
          }
        `}
      >
      <div className="px-[8%] lg:px-[16%] py-8 flex items-center justify-between">
        <div className="shrink-0">
          <div className="text-3xl font-bold gap-2 flex items-center cursor-pointer">
            <Image src={NavLogo} alt="Logo" width={40} height={40} />
            <span className="text-(--prime-color)">Senandika</span>
          </div>
        </div>
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleScroll(link.href)}
              className="nav-links text-(--text-color) hover:text-(--prime-hover) p-2 rounded-2xl transition font-semibold cursor-pointer text-lg"
            >
              {link.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-(--text-color)"
        >
          {isOpen ? (
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
      <div ref={menuRef} 
        style={{ maxHeight: menuHeight }} 
        className="md:hidden overflow-hidden transition-max-height duration-500 ease-in-out bg-background">
          <nav className="flex px-[8%] py-5 flex-col space-y-4 bg-background backdrop-blur-lg">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleScroll(link.href)}
                className="nav-links text-(--text-color) hover:text-(--prime-hover) p-2 rounded-2xl transition font-semibold cursor-pointer text-left"
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>
    </nav>
  );
}
