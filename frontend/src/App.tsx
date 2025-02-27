import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signin from "./components/Signin";
import { Toaster } from "sonner";
function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/dashboard" element={<h1>Dashboard</h1>}></Route>
          <Route path="/signup" element={<h1>Signup</h1>}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/send" element={<h1>Send</h1>}></Route>
        </Routes>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;
