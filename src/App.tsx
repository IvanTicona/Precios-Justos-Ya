import { BrowserRouter, Route, Routes } from "react-router-dom"
import AgregarProductoPage from "./pages/AgregarProductoPage"
import ActualizarProductoPage from "./pages/ActualizarProductoPage"
import { EleminarProductosPage } from "./pages/EleminarProductosPage"
import { Layout } from "./layout/Layout"
import DashboardUser from "./pages/DashboardUser"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import ProductPage from "./pages/ProductPage"
import ProductosPage from "./pages/ProductosPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/app" element={<Layout />}>
          <Route path="dashboard" element={<DashboardUser />} />
          <Route path="productos" element={<ProductosPage />} />
          <Route
            path="productos/:id"
            element={
              <ProductPage />
            }
          />
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