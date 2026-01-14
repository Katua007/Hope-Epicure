import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/" element={<h1 className="p-8 text-center">Customer Storefront Coming Soon...</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
