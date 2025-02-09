import React from "react";

const Contact = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-10">
      <h2 className="text-3xl font-bold text-blue-600 mb-4">Contact Us</h2>
      <p className="text-gray-600 text-center mb-6">Have any questions? Feel free to reach out!</p>

      {/* Smaller Form */}
      <form className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <div>
          <label className="block text-gray-700 font-medium">Your Name</label>
          <input type="text" className="w-full border p-2 rounded-md" placeholder="Enter your name" />
        </div>

        <div className="mt-3">
          <label className="block text-gray-700 font-medium">Email Address</label>
          <input type="email" className="w-full border p-2 rounded-md" placeholder="Enter your email" />
        </div>

        <div className="mt-3">
          <label className="block text-gray-700 font-medium">Message</label>
          <textarea className="w-full border p-2 rounded-md" rows="3" placeholder="Write your message..."></textarea>
        </div>

        <button className="w-full bg-blue-600 text-white py-2 mt-4 rounded-md hover:bg-blue-700">
          Send Message
        </button>
      </form>

      {/* Contact Info */}
      <div className="text-center mt-6">
        <p className="text-gray-600">📞 Call us: +1 234 567 890</p>
        <p className="text-gray-600">📍 Address: 123 E-commerce St, NY, USA</p>
      </div>
    </div>
  );
};

export default Contact;
