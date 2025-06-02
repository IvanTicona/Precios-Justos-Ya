import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Layout } from "./layout/Layout"
import DashboardUser from "./Pages/DashboardUser";
import ProductosPage from "./Pages/ProductosPage";
import ActualizarProductoPage from "./Pages/ActualizarProductoPage";
import AgregarProductoPage from "./Pages/AgregarProductoPage";
import { EleminarProductosPage } from "./Pages/EleminarProductosPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import { ProductsPage } from "./Pages/ProductPage";
import { ProductDetailPage } from "./Pages/ProductDetailPage";

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