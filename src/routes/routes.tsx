import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../layout/Layout";
import ProtectedRoutes from "../guards/ProtectedRoutes";
import ActualizarProductoPage from "../Pages/ActualizarProductoPage";
import AgregarProductoPage from "../Pages/AgregarProductoPage";
import DashboardUser from "../Pages/DashboardUser";
import { EleminarProductosPage } from "../Pages/EleminarProductosPage";
import LoginPage from "../Pages/LoginPage";
import MapPage from "../Pages/MapPage";
import RegisterPage from "../Pages/RegisterPage";
import { ProductsPage } from "../Pages/ProductsPage";
import { ProductDetailPage } from "../Pages/ProductDetailPage";

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
              <Route path="productos" element={<ProductsPage/>}/>
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
          <Route path="productos" element={<ProductsPage/>}/>
          <Route path="products/:id" element={<ProductDetailPage/>}/>
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
};
