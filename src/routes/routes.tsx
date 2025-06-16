import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ProductsPage from "../pages/productsPage";
import { Layout } from "../layout/Layout";
import ProductPage from "../pages/productPage";
import LoginPage from "../pages/LoginPage";
import ProtectedRoutes from "../guards/ProtectedRoutes";
import ReportsList from "../pages/ReportsList";
import AlertsPanel from "../components/AlertsPanel";
import { MapaPage } from "../pages/MapaPage";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/app"
          element={
            <ProtectedRoutes>
              <Layout />
            </ProtectedRoutes>
          }
        >
          <Route path="map" element={<MapaPage />}/>
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:productId" element={<ProductPage />} />
          <Route path="reports" element={<ReportsList />} />
          <Route path="alerts" element={<AlertsPanel />} />
        </Route>
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
