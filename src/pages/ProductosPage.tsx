// src/pages/ProductosPage.tsx
import { Outlet, useNavigate } from "react-router-dom";

export default function ProductosPage() {
  const navigate = useNavigate();

  return (
    <div className="relative">
      <h1 className="text-xl font-bold mb-6">Lista de Productos</h1>
      <Outlet />
    </div>
  );
}
