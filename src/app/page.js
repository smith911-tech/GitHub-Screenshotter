"use client";

import { useState } from "react";
import GitHubCalendar from "react-github-calendar";
import { toPng } from "html-to-image";

export default function Home() {
  const [username, setUsername] = useState("");
  const [searchedUsername, setSearchedUsername] = useState("");
  const [selectedGradient, setSelectedGradient] = useState("blue-purple");

  const gradients = {
    "blue-purple": "from-blue-500 to-purple-600",
    "green-teal": "from-green-400 to-teal-500", 
    "orange-red": "from-orange-500 to-red-600",
    "pink-rose": "from-pink-500 to-rose-500",
    "indigo-violet": "from-indigo-500 to-violet-600",
    "cyan-blue": "from-cyan-400 to-blue-500",
    "amber-orange": "from-amber-400 to-orange-500"
  };

  const hoverGradients = {
    "blue-purple": "hover:from-blue-600 hover:to-purple-700",
    "green-teal": "hover:from-green-500 hover:to-teal-600",
    "orange-red": "hover:from-orange-600 hover:to-red-700",
    "pink-rose": "hover:from-pink-600 hover:to-rose-600",
    "indigo-violet": "hover:from-indigo-600 hover:to-violet-700",
    "cyan-blue": "hover:from-cyan-500 hover:to-blue-600",
    "amber-orange": "hover:from-amber-500 hover:to-orange-600"
  };

  const downloadCalendar = async () => {
    const element = document.getElementById("github-calendar");
    if (element) {
      const dataUrl = await toPng(element);
      const link = document.createElement("a");
      link.download = `${searchedUsername}-github-contributions.png`;
      link.href = dataUrl;
      link.click();
    }
  };

  const handleSearch = () => {
    setSearchedUsername(username);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4">
      <h1
        className={`text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r ${gradients[selectedGradient]} text-center`}
      >
        Github contribution screenshot
      </h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full max-w-md">
        <input
          type="text"
          placeholder="Enter GitHub username"
          className="p-3 w-full sm:w-72 text-gray-800 rounded-xl bg-white/90 backdrop-blur-sm border border-gray-200 focus:ring-2 focus:ring-blue-400 outline-none"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className={`px-6 py-3 bg-gradient-to-r ${gradients[selectedGradient]} ${hoverGradients[selectedGradient]} rounded-xl font-medium shadow-xl transition-all duration-300 transform hover:scale-[1.02] w-full sm:w-auto`}
        >
          Search
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {Object.keys(gradients).map((gradientName) => (
          <button
            key={gradientName}
            onClick={() => setSelectedGradient(gradientName)}
            className={`w-10 h-10 rounded-full bg-gradient-to-r ${
              gradients[gradientName]
            } ${selectedGradient === gradientName ? "ring-2 ring-white" : ""}`}
          />
        ))}
      </div>

      {searchedUsername && (
        <div className="space-y-6 w-full max-w-max overflow-x-auto">
          <div
            className={`min-h-[400px] md:h-[700px] flex flex-col md:flex-row items-center justify-center bg-gradient-to-r ${gradients[selectedGradient]} p-4 md:px-10 shadow-black shadow-2xl`}
          >
            <div
              className="p-4 md:p-10 rounded-2xl bg-gradient-to-br from-gray-800/90 to-gray-900/90 shadow-[0_0_60px_rgba(59,130,246,0.2)] backdrop-blur-lg border border-gray-700/50 h-fit w-full overflow-x-auto"
              style={{
                boxShadow: `
                  0 0 100px rgba(59, 130, 246, 0.25), 
                  0 0 50px rgba(147, 51, 234, 0.25),
                  0 0 150px rgba(255, 255, 255, 0.05) inset`,
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <GitHubCalendar
                username={searchedUsername}
                fontSize={12}
                blockSize={8}
                blockMargin={4}
                style={{ maxWidth: "100%" }}
                className="w-full"
              />
            </div>
          </div>

          <button
            onClick={downloadCalendar}
            className={`w-full py-3 bg-gradient-to-r ${gradients[selectedGradient]} ${hoverGradients[selectedGradient]} rounded-xl font-medium shadow-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl`}
          >
            Download as Image
          </button>
        </div>
      )}

      {searchedUsername && (
        <div className="fixed w-[800px] -left-[1000px]">
          <div
            className={`min-h-[400px] md:h-[700px] flex flex-col md:flex-row items-center justify-center bg-gradient-to-r ${gradients[selectedGradient]} p-4 md:px-10 shadow-black shadow-2xl`}
            id="github-calendar"
          >
            <div
              className="p-4 md:p-10 rounded-2xl bg-gradient-to-br from-gray-800/90 to-gray-900/90 shadow-[0_0_60px_rgba(59,130,246,0.2)] backdrop-blur-lg border border-gray-700/50 h-fit"
              style={{
                boxShadow: `
                  0 0 100px rgba(59, 130, 246, 0.25), 
                  0 0 50px rgba(147, 51, 234, 0.25),
                  0 0 150px rgba(255, 255, 255, 0.05) inset`,
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <GitHubCalendar
                username={searchedUsername}
                fontSize={12}
                blockSize={8}
                blockMargin={4}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
