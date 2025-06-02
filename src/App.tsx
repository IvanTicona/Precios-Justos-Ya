import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Layout } from "./layout/Layout"
import DashboardUser from "./pages/DashboardUser";
import ProductosPage from "./pages/ProductosPage";
import ActualizarProductoPage from "./pages/ActualizarProductoPage";
import AgregarProductoPage from "./pages/AgregarProductoPage";
import { EleminarProductosPage } from "./pages/EleminarProductosPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { ProductsPage } from "./pages/ProductPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/app" element={<Layout />}>
          <Route path="dashboard" element={<DashboardUser />} />
          <Route path="productoss" element={<ProductosPage />} />
          <Route path="productos" element={<ProductsPage />}/>
          <Route path="productos/:id" element={<ProductDetailPage />} />
        </Route>

        <Route path="/product/create" element={<AgregarProductoPage />} />
        <Route path="/product/edit/:id" element={<ActualizarProductoPage />} />
        <Route path="/product/delete/:id" element={<EleminarProductosPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      
      </Routes>
    </BrowserRouter>
  )
}

export default App;