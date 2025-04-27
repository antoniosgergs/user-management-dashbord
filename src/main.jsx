import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import {QueryClientProvider} from "@tanstack/react-query";
import App from './App.jsx'
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Login from "./screens/login/Login.jsx";
import './index.css'
import UserForm from "./screens/dashboard/UserForm.jsx";
import {queryClient} from "./api/client.js";
import Users from "./screens/dashboard/Users.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
          <Router>
              <Routes>
                  <Route element={<ProtectedRoute/>}>
                      <Route path="dashboard" element={<App />} >
                          <Route index element={<Users/>} />
                          <Route path="new" element={<UserForm />} />
                      </Route>
                  </Route>

                  <Route index element={<Navigate replace to="/dashboard" />} />
                  <Route path="login" element={<Login />} />
              </Routes>
          </Router>
          <ToastContainer />
      </QueryClientProvider>
  </StrictMode>,
)
