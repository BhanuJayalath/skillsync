"use client";

import React, { useEffect, useState, type ChangeEvent } from "react";
import Image from "next/image";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Search, Briefcase, Loader2 } from "lucide-react";
import JobCard from "./jobcard";

const DEEPSEEK_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const DEEPSEEK_API_KEY = process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY; // Now using the API key from .env.local

export default function Page() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<number>(0);

  const searchJobs = async (topic: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(DEEPSEEK_API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1:free",
          messages: [
            {
              role: "user",
              content: `Please provide a list of five recommended internship opportunities in Sri Lanka someone with ${topic} knowledge. 
Output the result as a JSON array, where each object has the following fields: id, title, duration, category, instructor, link.`,
            },
          ],
        }),
      });

      const data = await response.json();
      const generatedText = data?.choices?.[0]?.message?.content;
      
      if (!generatedText) {
        console.error("No generated text received. Response data:", data);
        setJobs([]);
        return;
      }
      
      let cleanedText = generatedText.trim();

      // Remove markdown code fences if present
      if (cleanedText.startsWith("```json")) {
        cleanedText = cleanedText.replace(/^```json\s*/, "").replace(/\s*```$/, "");
      } else if (cleanedText.startsWith("```")) {
        cleanedText = cleanedText.replace(/^```\w*\s*/, "").replace(/\s*```$/, "");
      }

      let parsedJobs = [];
      try {
        parsedJobs = JSON.parse(cleanedText);
      } catch (err) {
        console.error("Error parsing JSON:", err);
        // Try extracting a JSON array using regex if the output contains extra text
        const jsonMatch = cleanedText.match(/\[([\s\S]*)\]/);
        if (jsonMatch && jsonMatch[0]) {
          try {
            parsedJobs = JSON.parse(jsonMatch[0]);
          } catch (innerErr) {
            console.error("Error parsing JSON from extracted match:", innerErr);
            parsedJobs = [];
          }
        } else {
          parsedJobs = [];
        }
      }
      setJobs(parsedJobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobs([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    searchJobs("HTML");
  }, []);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchJobs(searchTerm);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Hero Section */}
        <div className="py-16 px-4 sm:px-6 lg:px-8 text-black">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
              Recommended Jobs for You
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Expand your knowledge by putting it into practice with these recommended internship opportunities.
            </p>
          </div>
        </div>

        {/* Search Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 w-full">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />

                <Input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
                  className="pl-10 border-gray-200 focus:border-primary focus:ring-primary"
                />
              </div>
              <Button
                onClick={() => searchJobs(searchTerm)}
                className="bg-blue-500 hover:bg-primary/90 text-white"
                disabled={isLoading}
              >
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

        {/* Jobs Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
          <div className="flex items-center mb-8">
            <Briefcase className="text-primary mr-2" size={24} />
            <h2 className="text-2xl font-bold text-gray-800">Available Jobs</h2>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : jobs?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((jobs) => (
                <JobCard key={jobs.id} course={jobs} />
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
