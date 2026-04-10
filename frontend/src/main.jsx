import './index.css'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import Cadastro from './pages/cadastro.jsx';
import Login from './pages/Login.jsx';
import { createBrowserRouter, RouterProvider } from "react-router";


const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/cadastro", element: <Cadastro /> },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)