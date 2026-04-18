import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Banner from "./components/Banner";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ReportLostItem from "./pages/ReportLostItem";
import ReportFoundItem from "./pages/ReportFoundItem";
import SearchItems from "./pages/SearchItems";
import Services from "./pages/services";
import "./App.css";

function App() {
  return (
    <div className="app-wrapper">
      <Navbar />

      <div className="app-content">
        <Routes>
          <Route path="/" element={<Banner />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/report-lost" element={<ReportLostItem />} />
          <Route path="/report-found" element={<ReportFoundItem />} />
          <Route path="/search" element={<SearchItems />} />
          <Route path="/services" element={<Services />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;