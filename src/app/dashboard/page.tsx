"use client";

import { AlertCircle, Funnel, MessageSquare, Plus, Search } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  fetchDashboard,
  getCategories,
  getComplaints,
} from "../register/action";

export default function page() {
  interface cardType {
    id: number;
    title: string;
    amount: number;
    icon: React.ElementType;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [statusFilter, setStatusFilter] = useState<any>("all");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [categoryFilter, setCategoryFilter] = useState<any>("all");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [search, setSearch] = useState<string>("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [categories, setCategories] = useState<any[]>([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [totalComplaints, setTotalComplaints] = useState<any[]>([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [cardData, setCardData] = useState<cardType[]>([
    {
      id: 1,
      title: "Total Complaints",
      amount: 0,
      icon: MessageSquare,
    },
    {
      id: 2,
      title: "Pending",
      amount: 0,
      icon: AlertCircle,
    },
    {
      id: 3,
      title: "In Progress",
      amount: 0,
      icon: AlertCircle,
    },
    {
      id: 4,
      title: "Resolved",
      amount: 0,
      icon: AlertCircle,
    },
  ]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    (async () => {
      const data = await fetchDashboard();
      const newData = [...cardData];
      newData[0].amount = data?.total;
      newData[1].amount = data?.pending;
      newData[2].amount = data?.progress;
      newData[3].amount = data?.resolved;
      setCardData(newData);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    (async () => {
      try {
        const data = await getComplaints();
        setTotalComplaints(data as any);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch complaints:", error);
      }
    })();
  }, []);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    (async () => {
      const data = await getCategories();
      setCategories(data as any);
    })();
  }, []);

  const filterData = (totalComplaints || []).filter((complaint: any) => {
    const matchesSearch = complaint.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || complaint.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" ||
      complaint.category_id === Number(categoryFilter);
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="bg-blue-100 py-12 ">
      <div className="max-w-7xl mx-auto px-4">
        <div className=" md:flex-row flex-col flex flex-wrap ">
          <div>
            <h1 className="text-2xl text-black font-bold">
              Complaints Dashboard
            </h1>
            <p className="text-xl text-gray-600">
              Track and manage all submitted complaints
            </p>
          </div>
          <Link href="/submitComplaint" className="md:ml-[55%] mt-5 md:mt-2">
            <div className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-4 py-2 rounded-md transition duration-200 w-fit ">
              <Plus size={16} />
              <span>New Complaint</span>
            </div>
          </Link>
        </div>

        {/*  create a card section  */}
        <div className="py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 ">
            {cardData.map((data: cardType, index: number) => {
              const Icon = data.icon;
              return (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-xl p-6 flex justify-between items-center hover:shadow-lg transition-all"
                >
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800">
                      {data.title}
                    </h3>
                    <p className={`text-2xl font-bold mt-2 `}>{data.amount}</p>
                  </div>

                  <Icon
                    className={` text-sm ${
                      index === 0
                        ? "text-red-400"
                        : index === 1
                        ? "text-yellow-200"
                        : index === 2
                        ? "text-blue-500"
                        : "text-green-400"
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/*  create a filter section  */}
        <div className="bg-white p-6 rounded-xl shadow-md w-full">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            {/* Filter title */}
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
              <Funnel className="text-blue-500" />
              <h1 className="text-2xl">Filters</h1>
            </div>

            {/* Search bar */}
          </div>

          {/* Select Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-4 border rounded-md px-5 py-2 w-full md:w-auto">
              <Search className="text-gray-400 " />
              <input
                type="text"
                name="search"
                className="w-full focus:outline-none"
                placeholder="Search complaint here .."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {/* Status Dropdown */}
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All status</option>
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVE">Resolved</option>
            </select>

            {/* Category Dropdown */}
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/*  filter complaint  and complaint section  */}
        {filterData.length > 0 ? (
          <div className="overflow-x-auto border flex flex-col  text-center bg-white p-10 rounded-xl shadow-sm mt-6">
            <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 font-medium text-gray-700">
                    Sr No.
                  </th>
                  <th className="px-4 py-2 font-medium text-gray-700">Title</th>
                  <th className="px-4 py-2 font-medium text-gray-700">
                    Status
                  </th>
                  <th className="px-4 py-2 font-medium text-gray-700">
                    Category
                  </th>
                  <th className="px-4 py-2 font-medium text-gray-700">
                    Priority
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filterData.map((complaint: any, index: number) => (
                  <tr key={complaint.id}>
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{complaint.title}</td>
                    <td className="px-4 py-2">{complaint.status}</td>
                    <td className="px-4 py-2">{complaint.category_name}</td>
                    <td className="px-4 py-2">{complaint.priority}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 mt-4">No complaints found.</p>
        )}
      </div>
    </div>
  );
}
