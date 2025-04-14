import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import App from './App.jsx'
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Login from "./screens/login/Login.jsx";
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Router>
          <Routes>
              <Route element={<ProtectedRoute/>}>
                  <Route path="dashboard" element={<App />} />
              </Route>

              <Route path="login" element={<Login />} />
          </Routes>
      </Router>

  </StrictMode>,
)
