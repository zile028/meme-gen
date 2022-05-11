import { Routes, Route } from "react-router-dom";
import Meme from "../Meme/Meme";
import MemeGenerated from "../MemeGenerated/MemeGenerated";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Meme />} />
      <Route path="/generated" element={<MemeGenerated />} />
    </Routes>
  );
}

export default App;
