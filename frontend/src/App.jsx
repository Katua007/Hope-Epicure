import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './src/pages/Landing';
import Home from './src/pages/Home';
import AdminDashboard from './src/pages/AdminDashboard';
import { AuthProvider } from './src/context/AuthContext';
import AuthPage from './src/pages/AuthPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/products" element={<Home />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
export default App;
