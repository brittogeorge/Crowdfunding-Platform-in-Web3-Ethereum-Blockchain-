import React, { useState, useContext } from "react";
import { CrowdFundingContext } from "../Context/CrowdFunding";
import { Logo, Menu } from "../Components";

const NavBar = () => {
  const { currentAccount, connectWallet } = useContext(CrowdFundingContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuList = ["Projects", "Donations", "About Us", "Contact Us"];

  return (
    <nav className="backgroundMain1 bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-2">
          <img
            src="https://cosmos.network/_nuxt/img/b87fb27.png"
            alt="Cosmos Logo"
            className="h-8"
          />
          <span className="text-2xl font-bold uppercase tracking-wide">
            BYCRYPT
          </span>
        </a>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-8">
          {menuList.map((item, index) => (
            <li key={index}>
              <a
                href="https://cosmos.network/ecosystem/tokens/"
                className="hover:text-teal-400 transition-colors duration-200"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* Wallet Connection */}
        <div className="hidden lg:flex items-center space-x-4">
          {currentAccount ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm bg-gray-800 px-3 py-1 rounded">
                {`${currentAccount.slice(0, 6)}...${currentAccount.slice(-4)}`}
              </span>
              <button
                onClick={() => navigator.clipboard.writeText(currentAccount)}
                className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
                title="Copy Wallet Address"
              >
                Copy
              </button>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              className=" background px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
            >
              Connect Wallet
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-gray-100"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-gray-800 text-gray-100">
          <ul className="space-y-4 px-4 py-4">
            {menuList.map((item, index) => (
              <li key={index}>
                <a
                  href="/"
                  className="block hover:text-teal-400 transition-colors duration-200"
                >
                  {item}
                </a>
              </li>
            ))}
            <li>
              {currentAccount ? (
                <div className="flex flex-col items-start">
                  <span className="text-sm bg-gray-700 px-3 py-1 rounded mb-2">
                    {`${currentAccount.slice(0, 6)}...${currentAccount.slice(-4)}`}
                  </span>
                  <button
                    onClick={() => navigator.clipboard.writeText(currentAccount)}
                    className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 w-full"
                    title="Copy Wallet Address"
                  >
                    Copy
                  </button>
                </div>
              ) : (
                <button
                  onClick={connectWallet}
                  className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 w-full"
                >
                  Connect Wallet
                </button>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
