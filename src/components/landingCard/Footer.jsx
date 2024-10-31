import { useState } from "react";
import { Mail, MapPin } from "lucide-react";
import SkooldioLogo from "../../img/skooldio.png";
import WebDevLogo from "../../img/webdev.png";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribeError, setSubscribeError] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubscribe = (event) => {
    event.preventDefault();

    if (!email) {
      setSubscribeError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setSubscribeError("Please enter a valid email address");
      return;
    }

    setSubscribeError("");
    console.log("Subscribing email:", email);
    setEmail("");
  };

  const featuredProducts = [
    { name: "Men", link: "#" },
    { name: "Ladies", link: "#" },
    { name: "Shoes", link: "#" },
    { name: "Accessories", link: "#" },
  ];

  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Featured Products */}
        <div>
          <h6 className="font-bold mb-6 text-2xl">Featured Products</h6>
          <ul className="space-y-3">
            {featuredProducts.map((product, index) => (
              <li key={index}>
                <a
                  href={product.link}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {product.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h6 className="text-2xl mb-6 font-bold">Register with us</h6>
          <p className="mb-6 text-gray-300">
            Sign up for our newsletter and get 20% off your first purchase!
          </p>
          <button
            className=" bg-white
            text-black 
            px-6 
            py-2 
            rounded-md 
            transition-colors 
            duration-300 
            font-medium 
            uppercase 
            text-sm 
            tracking-wider 
            shadow-md 
            hover:shadow-lg 
            active:scale-95 
            focus:outline-none 
            focus:ring-2 
             "
          >
            Sign Up Now
          </button>
        </div>

        {/* Customer Service */}
        <div>
          <h6 className="font-bold mb-6 text-2xl">Customer Service</h6>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-[#DEF81C] flex-shrink-0 mt-1" />
              <p className="text-gray-300">
                MBK Tower 20th Floor, 444, Phaya Thai Rd, Wang Mai, Pathum Wan,
                Bangkok 10330
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-[#DEF81C]" />
              <a
                href="mailto:jane.doe@realmail.com"
                className="text-gray-300 hover:text-white transition-colors"
              >
                jane.doe@realmail.com
              </a>
            </div>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full py-3 px-4 rounded bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#DEF81C]"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setSubscribeError("");
                  }}
                />
                {subscribeError && (
                  <p className="text-red-500 text-sm mt-2">{subscribeError}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-[#DEF81C] text-black py-3 rounded hover:bg-[#DEF81C] transition-colors font-bold"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="container mx-auto px-4 mt-8 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-400 mb-4 md:mb-0">
          Copyright © 2024 All rights reserved for all contents.
        </p>
        <div className="flex items-center space-x-4">
          <p className="text-sm text-gray-400">Powered By</p>
          <div className="flex items-center space-x-4">
            <img
              className="h-6 w-auto"
              src={SkooldioLogo}
              alt="Skooldio Logo"
            />
            <div className="h-6 border-l border-gray-600"></div>
            <img className="h-6 w-auto" src={WebDevLogo} alt="Web Dev Logo" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
