import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, Heart, ShoppingCart, User } from "lucide-react";

import Logo from "../../img/Storefront_2.png";

const navigation = [
  { name: "Men", href: "#Men" },
  { name: "Women", href: "#Women" },
  { name: "Kids", href: "#Kids" },
  { name: "Shoes", href: "#Shoes" },
  { name: "Accessories", href: "#Accessories" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-[#222222] fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img className="h-8 w-auto" src={Logo} alt="Company Logo" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-gray-300 hover:text-[#DEF81C] px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              className="text-gray-300 hover:text-[#DEF81C] p-2 rounded-full transition-colors"
              aria-label="Search"
            >
              <Search className="h-6 w-6" />
            </button>
            <button
              className="text-gray-300 hover:text-[#DEF81C] p-2 rounded-full transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="h-6 w-6" />
            </button>
            <button
              className="text-gray-300 hover:text-[#DEF81C] p-2 rounded-full transition-colors"
              aria-label="Profile"
            >
              <User className="h-6 w-6" />
            </button>
            <Link
              to="/carts"
              className="text-gray-300 hover:text-[#DEF81C] p-2 rounded-fulltransition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-[#DEF81C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#333333]">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={toggleMenu}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Icons */}
          <div className="border-t border-gray-700 pt-4 pb-3">
            <div className="flex items-center justify-center space-x-6 px-5">
              <button
                className="text-gray-300 hover:text-white p-2 rounded-full hover:bg-gray-700 transition-colors"
                aria-label="Search"
              >
                <Search className="h-6 w-6" />
              </button>
              <button
                className="text-gray-300 hover:text-white p-2 rounded-full hover:bg-gray-700 transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="h-6 w-6" />
              </button>
              <button
                className="text-gray-300 hover:text-white p-2 rounded-full hover:bg-gray-700 transition-colors"
                aria-label="Profile"
              >
                <User className="h-6 w-6" />
              </button>
              <Link
                to="/carts"
                className="text-gray-300 hover:text-white p-2 rounded-full hover:bg-gray-700 transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
