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
        GitHub Screenshotter
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
                colorScheme="light"
                className="w-full"
              />
            </div>
          </div>

          <button
            onClick={downloadCalendar}
            className={`w-full py-3 bg-gradient-to-r ${gradients[selectedGradient]} ${hoverGradients[selectedGradient]} rounded-xl font-medium shadow-xl transition-all duration-300 transform  hover:shadow-2xl`}
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
                colorScheme="light"
              />
              <div className="mt-4 text-sm text-gray-300 text-center">
                Screenshot by github-screenshotter.vercel.app
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 text-center text-sm text-gray-400">
        Built by{" "}
        <a
          href="https://x.com/TheRealJoseph01"
          target="_blank"
          rel="noopener noreferrer"
          className={`text-transparent bg-clip-text bg-gradient-to-r ${gradients[selectedGradient]} hover:underline`}
        >
          @TheRealJoseph01
        </a>
      </div>

      <div className="mt-4 text-center">
        <a
          href="https://github.com/smith911-tech/GitHub-Screenshotter"
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${gradients[selectedGradient]} ${hoverGradients[selectedGradient]} rounded-xl font-medium shadow-xl transition-all duration-300 transform hover:scale-[1.02]`}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
          Star on GitHub
        </a>
      </div>
    </div>
  );
}
