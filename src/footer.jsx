// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Featured Product Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">Featured Product</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Men
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Ladies
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Shoes
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Accessories
              </a>
            </li>
          </ul>
        </div>

        {/* Register Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">Register with us</h3>
          <p>Sign up now and get 20% off your first purchase!</p>
          <button className="bg-white text-gray-900 font-bold py-2 px-4 mt-4 rounded hover:bg-gray-200">
            Sign up now
          </button>
        </div>

        {/* Customer Services Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">Customer Services</h3>
          <p>
            MK Tower 5th floor, 44, Phraya Thai Rd, Wang Mai, Pathum Wan,
            Bangkok 10330
          </p>
          <p>
            Email:{" "}
            <a href="mailto:demo@gmail.com" className="hover:underline">
              demo@gmail.com
            </a>
          </p>
          <form className="mt-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 w-full rounded text-gray-900 mb-2"
            />
            <button className="bg-yellow-500 text-gray-900 font-bold py-2 px-4 w-full rounded hover:bg-yellow-600">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="text-center text-sm mt-8">
        <p>Copyright © 2024. All rights reserved by our website.</p>
      </div>
    </footer>
  );
};

export default Footer;
