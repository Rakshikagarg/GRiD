import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import GlobalStyles from './globalStyles';
import { Navbar, Footer } from './components';
import Home from './pages/HomePage/Home';
import Services from './pages/Services/Services';
import Products from './pages/Products/Products';
import SignUp from './pages/SignUp/SignUp';
import ScrollToTop from './components/ScrollToTop';
import Login from './pages/Login/login';
import Welcome from './pages/Welcome/welcome';
import PrivateRoute from './components/PrivateRoute';

const AppWrapper: React.FC = () => {
  const location = useLocation();
  const hideLayout = location.pathname === '/welcome';

  return (
    <>
      <GlobalStyles />
      <ScrollToTop />
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/products" element={<Products />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/signup" element={<SignUp show={true} onClose={() => {}} />} />
        <Route path="/login" element={<Login show={true} onClose={() => {} }/>} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <div>Dashboard (Protected)</div>
            </PrivateRoute>
          }
        />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
};

export default App;
