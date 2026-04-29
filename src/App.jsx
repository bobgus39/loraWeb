import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DownloadsPage from "./pages/DownloadsPage";
import OrderForm from "./pages/OrderForm";
import Navbar from "./components/Navbar";
import AdminPage from "./pages/AdminPage";

export default function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/downloads" element={<DownloadsPage />} />
        <Route path="/order" element={<OrderForm />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}