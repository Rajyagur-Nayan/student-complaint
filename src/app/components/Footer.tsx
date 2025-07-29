import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 md:p-10 mt-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex gap-4 mt-4 md:mt-0 mb-2">
          <a href="/about" className="hover:underline">
            About
          </a>
          <a href="/contact" className="hover:underline">
            Contact
          </a>
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a>
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Campus Connect. Making your voice
          heard.
        </p>
      </div>
    </footer>
  );
}
