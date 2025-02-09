import React from "react";

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">About Us</h2>
      <p className="text-gray-600 text-center mb-8">
        Welcome to our eCommerce store! We provide high-quality products with top-notch customer service.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800">🛍️ Our Mission</h3>
          <p className="text-gray-600 mt-2">
            We aim to provide the best shopping experience with high-quality products and fast delivery.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800">🚀 Why Choose Us?</h3>
          <ul className="text-gray-600 mt-2 space-y-2">
            <li>✅ 24/7 Customer Support</li>
            <li>✅ Secure Payments</li>
            <li>✅ Fast & Reliable Shipping</li>
            <li>✅ 100% Quality Assurance</li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-8">
        <h3 className="text-xl font-semibold text-gray-800">Connect With Us</h3>
        <p className="text-gray-600">Follow us on social media for the latest updates and deals.</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="#" className="text-blue-600 text-2xl"><i className="fab fa-facebook"></i></a>
          <a href="#" className="text-blue-400 text-2xl"><i className="fab fa-twitter"></i></a>
          <a href="#" className="text-pink-500 text-2xl"><i className="fab fa-instagram"></i></a>
        </div>
      </div>
    </div>
  );
};

export default About;
