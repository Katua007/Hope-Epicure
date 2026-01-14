import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import { AuthProvider } from './context/AuthContext';
import AuthPage from './pages/AuthPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
export default App;
