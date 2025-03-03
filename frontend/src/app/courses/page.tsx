"use client";

import React, { useEffect, useState, type ChangeEvent } from "react";
import Image from "next/image";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Search, BookOpen, Loader2 } from "lucide-react";
import CourseCard from "./coursecard";

const DEEPSEEK_API_URL = "https://openrouter.ai/api/v1/chat/completions";

export default function Page() {
  const [courses, setCourses] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<number>(0);

  const searchCourses = async (topic: string) => {
    try {
      // Log the API Key to ensure it's being read properly
      console.log("API Key:", process.env.OPENROUTER_API_KEY);

      setIsLoading(true);
      const response = await fetch(DEEPSEEK_API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1:free",
          messages: [
            {
              role: "user",
              content: `Please output only a JSON array of exactly 10 online course objects for learning ${topic}, with no additional commentary. Each object must include exactly the following fields: id, title, duration, category, instructor, link.`,
            },
          ],
        }),
      });

      if (response.status === 401) {
        console.error("Unauthorized: Check your API key in the .env.local file.");
        setCourses([]);
        return;
      }

      const data = await response.json();
      console.log("Full API response:", data);
      const generatedText = data?.choices?.[0]?.message?.content;
      let cleanedText = generatedText ? generatedText.trim() : "";

      // Remove markdown code fences if present
      if (cleanedText.startsWith("```json")) {
        cleanedText = cleanedText.replace(/^```json\s*/, "").replace(/\s*```$/, "");
      } else if (cleanedText.startsWith("```")) {
        cleanedText = cleanedText.replace(/^```\w*\s*/, "").replace(/\s*```$/, "");
      }

      console.log("Cleaned text from DeepSeek:", cleanedText);

      // If cleanedText is empty, log a warning and exit early.
      if (!cleanedText) {
        console.warn("No content returned from DeepSeek.");
        setCourses([]);
        return;
      }

      let parsedCourses = [];
      try {
        parsedCourses = JSON.parse(cleanedText);
      } catch (err) {
        console.error("Error parsing JSON:", err, "Cleaned text:", cleanedText);
        // Fallback: extract substring between the first '[' and last ']'
        const start = cleanedText.indexOf("[");
        const end = cleanedText.lastIndexOf("]");
        if (start !== -1 && end !== -1 && end > start) {
          const jsonArrayText = cleanedText.substring(start, end + 1);
          console.log("Extracted JSON array:", jsonArrayText);
          try {
            parsedCourses = JSON.parse(jsonArrayText);
          } catch (innerErr) {
            console.error("Error parsing extracted JSON:", innerErr);
            parsedCourses = [];
          }
        } else {
          parsedCourses = [];
        }
      }
      setCourses(parsedCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setCourses([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    searchCourses("HTML");
  }, []);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchCourses(searchTerm);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-4 hidden md:block">
        <div className="mb-8 flex items-center justify-center">
          <Image src="/logo.png" alt="Logo" width={150} height={50} className="object-contain" />
        </div>
        <nav>
          <ul className="space-y-4">
            <li
              className={`flex items-center gap-2 cursor-pointer ${activeTab === 0 ? "text-blue-600 font-semibold" : ""}`}
              onClick={() => setActiveTab(0)}
            >
              <Image src="/user/homeIcon.svg" alt="homeIcon" width={40} height={40} />
              <span>Home</span>
            </li>
            <li
              className={`flex items-center gap-2 cursor-pointer ${activeTab === 1 ? "text-blue-600 font-semibold" : ""}`}
              onClick={() => setActiveTab(1)}
            >
              <Image src="/user/overviewIcon.svg" alt="OverviewIcon" width={40} height={40} />
              <span>Overview</span>
            </li>
            <li
              className={`flex items-center gap-2 cursor-pointer ${activeTab === 2 ? "text-blue-600 font-semibold" : ""}`}
              onClick={() => setActiveTab(2)}
            >
              <Image src="/user/progressIcon.svg" alt="progressIcon" width={40} height={40} />
              <span>Progress</span>
            </li>
            <li
              className={`flex items-center gap-2 cursor-pointer ${activeTab === 3 ? "text-blue-600 font-semibold" : ""}`}
              onClick={() => setActiveTab(3)}
            >
              <Image src="/user/courseIcon.svg" alt="courseIcon" width={40} height={40} />
              <span>Courses</span>
            </li>
            <li
              className={`flex items-center gap-2 cursor-pointer ${activeTab === 4 ? "text-blue-600 font-semibold" : ""}`}
              onClick={() => setActiveTab(4)}
            >
              <Image src="/user/cvIcon.svg" alt="cvIcon" width={30} height={30} />
              <span>Resume</span>
            </li>
            <li
              className={`flex items-center gap-2 cursor-pointer ${activeTab === 5 ? "text-blue-600 font-semibold" : ""}`}
              onClick={() => setActiveTab(5)}
            >
              <Image src="/user/settingsIcon.svg" alt="settingsIcon" width={30} height={30} />
              <span>Settings</span>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Hero Section */}
        <div className="bg-primary py-16 px-4 sm:px-6 lg:px-8 text-blue-800">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
              Discover Your Next Course
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Expand your knowledge with our extensive library of high-quality courses
            </p>
          </div>
        </div>

        {/* Search Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 w-full">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
                  className="pl-10 border-gray-200 focus:border-primary focus:ring-primary"
                />
              </div>
              <Button onClick={() => searchCourses(searchTerm)} className="bg-primary hover:bg-primary/90 text-black" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  "Search"
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Courses Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
          <div className="flex items-center mb-8">
            <BookOpen className="text-primary mr-2" size={24} />
            <h2 className="text-2xl font-bold text-gray-800">Available Courses</h2>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : courses?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-lg">
              <p className="text-lg text-gray-600">
                No courses found. Try a different search term.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
