import { BookOpen, MessageSquare, Shield, Users } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function page() {
  interface CardItem {
    id: number;
    title: string;
    description: string;
    icon: React.ElementType;
  }
  interface sectionData {
    id: number;
    title: string;
    description: string;
  }

  const cardData: CardItem[] = [
    {
      id: 1,
      title: "Academic Issues",
      description:
        "Report problems with courses, grading, or academic services",
      icon: BookOpen,
    },
    {
      id: 2,
      title: "Campus Safety",
      description:
        "Report safety concerns, security issues, or emergency situations",
      icon: Shield,
    },
    {
      id: 3,
      title: "Student Services",
      description:
        "Issues with dining, housing, transportation, or other services",
      icon: Users,
    },
    {
      id: 4,
      title: "General Feedback",
      description:
        "Share suggestions for improvements or general campus feedback",
      icon: MessageSquare,
    },
  ];

  const sectionData: sectionData[] = [
    {
      id: 1,
      title: "Submit Your Complaint",
      description:
        "Fill out our simple form with details about your issue or suggestion.",
    },
    {
      id: 2,
      title: "Track Progress",
      description:
        "Monitor the status of your complaint through our dashboard.",
    },
    {
      id: 3,
      title: "See Results",
      description:
        "Get updates and see how your feedback helps improve campus life.",
    },
  ];

  return (
    <div className="bg-blue-100 py-12">
      {/* Header Text Section */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mt-9 mb-5">
          <h1 className="text-4xl text-black font-bold">Your Voice Matters</h1>
        </div>
        <div className="text-center mb-4">
          <p className="text-xl text-gray-600">
            Help improve our campus by reporting issues, suggesting
            improvements, and making
          </p>
          <p className="text-xl text-gray-600">
            your college experience better for everyone.
          </p>
          <div className="flex justify-center gap-4 mt-6 flex-wrap flex-col md:flex-row ">
            <Link
              href="/submitComplaint"
              className="bg-blue-700 px-6 py-2 text-white rounded-sm hover:bg-blue-600"
            >
              Submit Complaint
            </Link>
            <Link
              href="/dashboard"
              className="bg-gray-100 px-6 py-2 border rounded-sm hover:bg-gray-200"
            >
              View Dashboard
            </Link>
          </div>
        </div>

        {/* Complaint Type Cards */}
        <div className="py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cardData.map((data: CardItem, index: number) => {
              const Icon = data.icon;
              return (
                <div
                  key={index}
                  className="rounded-xl overflow-hidden shadow-md transition-transform transform hover:-translate-y-1 hover:shadow-xl bg-white border p-6"
                >
                  <div className="flex justify-center">
                    <Icon
                      className={` h-10 w-10  mb-4 ${
                        index === 0
                          ? "text-blue-600"
                          : index === 1
                          ? "text-green-600"
                          : index === 2
                          ? "text-purple-600"
                          : "text-rose-500"
                      }`}
                    />
                  </div>
                  <h2 className="text-lg font-semibold text-center mb-4">
                    {data.title}
                  </h2>
                  <p className="text-gray-600 text-sm text-center">
                    {data.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        {/* How It Works Section */}
        <div className="bg-white px-8 py-16 rounded-2xl shadow-md">
          <h1 className="text-3xl font-bold text-center mb-14">How It Works</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center max-w-6xl mx-auto">
            {sectionData.map((data, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold mb-6 ${
                    index === 0
                      ? "bg-blue-100 text-blue-600"
                      : index === 1
                      ? "bg-green-100 text-green-600"
                      : "bg-purple-100 text-purple-600"
                  }`}
                >
                  {data.id}
                </div>
                <h2 className="text-lg font-semibold mb-2">{data.title}</h2>
                <p className="text-gray-600 text-sm">{data.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
