import { useEffect, useState } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const elaborateText = async () => {
    if (!input.trim()) return;

    setLoading(true);
    try {
      const response = await fetch("https://text-elaborator-backend.onrender.com/elaborate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await response.json();
      setOutput(data.result);
    } catch (error) {
      console.error("Error:", error);
      setOutput("Failed to fetch elaboration.");
    } finally {
      setLoading(false);
    }
  };

useEffect(()=>{
    if (loading){
    setOutput('Please wait it will take some time to Elaborate...')
  }
},[loading])

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 ">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md space-y-4 my-5">
        <h1 className="text-2xl font-semibold text-center">Text Elaborator</h1>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={elaborateText}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors duration-200"
        >
          {loading ? "Elaborating..." : "Elaborate"}
        </button>
        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg min-h-[100px]">
          <p className="text-gray-700 whitespace-pre-wrap">{output}</p>
        </div>
      </div>
    </div>
  );
}
