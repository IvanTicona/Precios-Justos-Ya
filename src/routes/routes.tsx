import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../layout/Layout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProtectedRoutes from "../guards/ProtectedRoutes";
import DashboardUser from "../pages/DashboardUser";
import ActualizarProductoPage from "../pages/ActualizarProductoPage";
import AgregarProductoPage from "../pages/AgregarProductoPage";
import { EleminarProductosPage } from "../pages/EleminarProductosPage";
import MapPage from "../pages/MapPage";

export const AppRoutes = () => {
  const rol = localStorage.getItem("rol");
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/app"
          element={
            <ProtectedRoutes>
              <Layout />
            </ProtectedRoutes>
          }
        >
          {rol === "admin" ? (
            <>
              <Route path="product/create" element={<AgregarProductoPage />} />
              <Route
                path="product/edit/:id"
                element={<ActualizarProductoPage />}
              />
              <Route
                path="product/delete/:id"
                element={<EleminarProductosPage />}
              />
            </>
          ) : (
            <Route path="dashboard" element={<DashboardUser />} />
          )}
          <Route path="map" element={<MapPage />}/>
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
};
