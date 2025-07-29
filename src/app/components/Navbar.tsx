"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageSquareText, Menu, X } from "lucide-react";
import { LoginPage } from "./Login";
import { useAuthUser } from "../context/Context";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { setUser, user } = useAuthUser();

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logout Successfully");
    setUser(null);
  };

  return (
    <div>
      <nav className="w-full bg-white shadow-md  border-b p-6 ">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="text-lg font-semibold flex gap-1.5 items-center"
          >
            <MessageSquareText className="text-3xl mt-1 text-blue-400" />
            Complaint-app
          </Link>
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 items-center">
            <Link href="/" className="hover:bg-blue-100 px-3 py-2 rounded-xl">
              Home
            </Link>
            <Link
              href="/about"
              className="hover:bg-blue-100 px-3 py-2 rounded-xl"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="hover:bg-blue-100 px-3 py-2 rounded-xl"
            >
              Contact
            </Link>
          </div>

          {/* login model  */}
          {user ? (
            <Button
              type="button"
              onClick={handleLogout}
              className="cursor-pointer"
            >
              Logout
            </Button>
          ) : (
            <div>
              <LoginPage />
            </div>
          )}

          {/* Mobile Hamburger Icon */}
          <button
            type="button"
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="md:hidden  mt-4 px-6 space-y-3">
            <Link href="/" className="block hover:bg-blue-100">
              Home
            </Link>
            <Link href="/about" className="block hover:bg-blue-100">
              About
            </Link>
            <Link href="/contact" className="block hover:bg-blue-100">
              Contact
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}
