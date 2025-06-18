import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasShadow, setHasShadow] = useState(false);

  // Adds shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setHasShadow(true);
      } else {
        setHasShadow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`flex justify-center px-4 bg-white fixed top-0 right-0 left-0 z-50 transition-shadow duration-300 ${
        hasShadow ? "shadow-md" : ""
      }`}
    >
      <div className="w-full max-w-7xl">
        <nav className="flex justify-between py-4 items-center">
          {/* Logo */}
          <div className="logo">
            <NavLink to="/">
              <img src="/lotus.png" alt="Logo" className="w-16 rounded-full" />
            </NavLink>
          </div>

          {/* Desktop NavLinks */}
          <div className="Nav-Link md:flex hidden gap-10 items-center font-semibold leading-9">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/blogs">Blogs</NavLink>
            <NavLink to="/therapist">Therapist</NavLink>
            <NavLink to="/quiz">Quiz</NavLink>
            <NavLink to="/aboutus">About</NavLink>
            <NavLink to="/signup1">
              <button className="bg-button1 px-6 py-1 rounded-md transition-transform duration-300 transform hover:scale-110">
                Get Started
              </button>
            </NavLink>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-3xl z-50 relative cursor-pointer"
            >
              {menuOpen ? "╳" : "☰"}
            </button>
          </div>
        </nav>
      </div>

      {/* Fullscreen Mobile Menu */}
      {menuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-white z-40 flex flex-col items-center justify-center gap-8 text-xl font-semibold">
          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/blogs" onClick={() => setMenuOpen(false)}>
            Blogs
          </NavLink>
          <NavLink to="/therapist" onClick={() => setMenuOpen(false)}>
            Therapist
          </NavLink>
          <NavLink to="/quiz" onClick={() => setMenuOpen(false)}>
            Quiz
          </NavLink>
          <NavLink to="/aboutus" onClick={() => setMenuOpen(false)}>
            About
          </NavLink>
          <NavLink to="/signup1" onClick={() => setMenuOpen(false)}>
            <button className="bg-button1 px-6 py-2 rounded-md">
              Get Started
            </button>
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default NavBar;
