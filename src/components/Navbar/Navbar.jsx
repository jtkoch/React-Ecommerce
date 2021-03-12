import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import ecommerce from "../../images/ecommerce.png";

const Navbar = ({ totalItems }) => {
  const [active, setActive] = useState(false);

  const location = useLocation();

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <>
      <nav className="fixed w-full flex items-center flex-wrap bg-gray-400 h-auto p-3">
        <Link to="/">
          <img
            src={ecommerce}
            alt=""
            className="fill-current text-white h-8 w-8 mr-2"
          />
        </Link>
        <button
          className=" inline-flex p-3 rounded lg:hidden text-white ml-auto focus:outline-none"
          onClick={handleClick}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <div
          className={`${
            active ? "" : "hidden"
          }   w-full lg:inline-flex lg:flex-grow lg:w-auto`}
        >        
          <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start flex flex-col lg:h-auto">
            <Link to="/" className="lg:inline-flex lg:w-auto w-full px-3 py-4 rounded text-white font-bold items-center justify-center">
                Home
            </Link>
            { location.pathname === '/' && (
            <Link to="/cart">
              <span className="mr-5 relative inline-block" >
                <button className="focus:outline-none">
                  <FontAwesomeIcon className=" mx-4 my-4 text-white fill-current hover:text-black" icon={faShoppingCart}></FontAwesomeIcon>
                  <span className="absolute top-3 right-3 inline-flex items-center justify-center px-1 py-1 text-xs font-semibold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{totalItems}</span>
                </button>
              </span>
            </Link> )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
