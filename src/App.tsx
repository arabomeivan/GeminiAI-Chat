import { Routes, Route } from "react-router-dom";
import ChatLayout from "./components/ChatLayout";
import About from "./components/About"; // Optional route

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ChatLayout />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

export default App;
