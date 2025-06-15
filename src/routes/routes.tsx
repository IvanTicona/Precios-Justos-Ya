import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ProductsPage from "../pages/productsPage";
import { Layout } from "../layout/Layout";
import ProductPage from "../pages/productPage";
import LoginPage from "../pages/LoginPage";
import { useUser } from "../contexts/UserContext";
import { MapaPage } from "../pages/MapaPage";

// const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const { isAuthenticated } = useUser();
//   return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
// };

// const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const { isAuthenticated } = useUser();
//   return isAuthenticated ? <Navigate to="/app/products" replace /> : <>{children}</>;
// };

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
//            <PublicRoute>
              <LoginPage />
  //          </PublicRoute>
          }
        />
        <Route
          path="/app"
          element={
            //<ProtectedRoute>
              <Layout />
           // </ProtectedRoute>
          }
        >
          <Route path="map" element={<MapaPage/>}/>
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:productId" element={<ProductPage />} />
        </Route>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/app/products" replace />} />
      </Routes>
    </BrowserRouter>
  );
};