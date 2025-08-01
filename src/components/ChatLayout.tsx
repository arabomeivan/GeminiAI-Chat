import React, { useState, useEffect, useRef } from "react";
import { fetchGeminiResponse } from "../../utils/geminiApi";
import { nanoid } from "nanoid";

interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "ai" | "system";
}

const ChatLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: nanoid(),
      content: input,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const aiReply = await fetchGeminiResponse(input);

      // Simulated streaming enhancement (can be replaced with chunked stream)
      const chunks = aiReply.split(" ");
      let streamedContent = "";

      for (const word of chunks) {
        await new Promise((res) => setTimeout(res, 50));
        streamedContent += word + " ";

        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.sender === "ai" && last?.content !== "Loading...") {
            // Update last streamed message
            return [
              ...prev.slice(0, -1),
              { ...last, content: streamedContent },
            ];
          }
          return [
            ...prev,
            { id: nanoid(), content: streamedContent, sender: "ai" },
          ];
        });
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: nanoid(),
          content: "❌ Failed to get response. Try again later.",
          sender: "system",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setInput("");
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <button
          onClick={toggleSidebar}
          className="w-full bg-gray-700 p-2 text-left"
        >
          {sidebarOpen ? "Collapse" : "Expand"}
        </button>
        <div className="h-full overflow-y-auto p-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-2 rounded p-2 ${
                msg.sender === "system"
                  ? "bg-red-500 text-white"
                  : "bg-gray-700"
              }`}
            >
              {msg.content}
            </div>
          ))}
        </div>
      </aside>

      {/* Main Chat Area */}
      <div className="relative flex flex-1 flex-col bg-white">
        <div className="flex-grow space-y-4 overflow-y-auto p-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`rounded p-3 shadow-sm ${
                msg.sender === "user"
                  ? "bg-blue-100 text-right"
                  : msg.sender === "ai"
                    ? "bg-gray-100"
                    : "bg-red-100 italic"
              }`}
            >
              {msg.content}
            </div>
          ))}
          <div ref={messageEndRef} />
        </div>

        {/* Chat Input */}
        <div className="fixed right-0 bottom-0 left-0 z-10 border-t bg-white p-4">
          <div className="flex items-end gap-2">
            <textarea
              rows={2}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow resize-none rounded border p-2 focus:outline-none"
              placeholder="Type your message..."
            />
            <button
              onClick={handleSend}
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Thinking..." : "Send"}
            </button>
            <button
              onClick={handleNewChat}
              className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
            >
              New Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
