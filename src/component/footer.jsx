import React from 'react'



function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Us */}
          <div>
            <h2 className="text-white font-bold text-lg mb-4">About Us</h2>
            <p className="text-sm">
              We are an online store providing the best quality products at
              affordable prices. Your satisfaction is our priority!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-white font-bold text-lg mb-4">Quick Links</h2>
            <ul>
              <li className="mb-2">
                <a href="/" className="hover:text-white">
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a href="/about" className="hover:text-white">
                  About
                </a>
              </li>
              <li className="mb-2">
                <a href="/products" className="hover:text-white">
                  Products
                </a>
              </li>
              <li className="mb-2">
                <a href="/contact" className="hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h2 className="text-white font-bold text-lg mb-4">
              Customer Service
            </h2>
            <ul>
              <li className="mb-2">
                <a href="/faq" className="hover:text-white">
                  FAQ
                </a>
              </li>
              <li className="mb-2">
                <a href="/returns" className="hover:text-white">
                  Returns
                </a>
              </li>
              <li className="mb-2">
                <a href="/shipping" className="hover:text-white">
                  Shipping Info
                </a>
              </li>
              <li className="mb-2">
                <a href="/support" className="hover:text-white">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Subscribe */}
          <div>
            <h2 className="text-white font-bold text-lg mb-4">Subscribe</h2>
            <p className="text-sm mb-4">
              Sign up for our newsletter to receive updates on new arrivals and
              special offers.
            </p>
            <form>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 text-black bg-gray-300 rounded-md mb-4"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} E-Commerce Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

