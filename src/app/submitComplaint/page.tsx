"use client"; // Only for App Router

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthUser } from "../context/Context";
import { complaint, getCategories } from "../register/action";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

export interface ComplaintFormData {
  userId: string;
  title: string;
  category: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  description: string;
}

type Category = {
  id: number;
  name: string;
};

export default function SubmitComplaint() {
  const { user } = useAuthUser();
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<ComplaintFormData>({
    userId: user?.id || "",
    title: "",
    category: "",
    priority: "MEDIUM",
    description: "",
  });

  useEffect(() => {
    if (user) setFormData((prv) => ({ ...prv, userId: user.id }));
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.category) {
      toast.error("Please fill all the required fields");
      return;
    }
    complaint(formData);
    toast.success("Complaint Submitted ");
  };

  useEffect(() => {
    (async () => {
      const data = await getCategories();
      setCategories(data as any);
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-8">
        <Link href="/" className="text-blue-600 text-sm mb-4 inline-block">
          ← Back to Home
        </Link>
        <h1 className="text-2xl font-bold text-center mb-2">
          Submit a Complaint
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Help us improve campus life by sharing your concerns and suggestions
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Complaint Title */}
          <div>
            <label className="block font-medium mb-1">Complaint Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              placeholder="Brief description of your issue"
              required
            />
          </div>

          {/* Category & Priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block font-medium mb-1">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
                required
              >
                <option value="" disabled>
                  categories
                </option>
                {categories.map((item) => {
                  return (
                    <option key={item.id} value={item.id.toString()}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label htmlFor="priority" className="block font-medium mb-1">
                Priority Level
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
          </div>
          {/* Description */}
          <div>
            <label className="block font-medium mb-1">
              Detailed Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              className="w-full border rounded-md px-3 py-2"
              placeholder="Please provide a detailed description of your complaint..."
              required
            />
          </div>
          {/* Submit Button */}
          <Button className="w-full bg-blue-600 text-white py-2 px-10 cursor-pointer rounded-md hover:bg-blue-700 transition">
            Submit Complaint
          </Button>
        </form>
      </div>
    </div>
  );
}
