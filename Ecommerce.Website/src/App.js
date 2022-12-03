import { BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Routes path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
