import React, { useState } from "react";

interface ChatMessage {
  id: number;
  content: string;
  sender: "user" | "ai";
}

const ChatLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>("");

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage: ChatMessage = {
      id: messages.length + 1,
      content: input,
      sender: "user",
    };
    setMessages([...messages, newMessage]);
    setInput("");
    // Later: trigger Gemini response logic here
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white transition-all duration-300 ${sidebarOpen ? "w-64" : "w-20"}`}
      >
        <button
          onClick={toggleSidebar}
          className="w-full bg-gray-700 p-2 text-left"
        >
          {sidebarOpen ? "Collapse" : "Expand"}
        </button>
        <div className="h-full overflow-y-auto p-4">
          {messages.map((msg) => (
            <div key={msg.id} className="mb-2 rounded bg-gray-700 p-2">
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
              className={`rounded p-3 shadow-sm ${msg.sender === "user" ? "bg-blue-100" : "bg-gray-100"}`}
            >
              {msg.content}
            </div>
          ))}
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
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
