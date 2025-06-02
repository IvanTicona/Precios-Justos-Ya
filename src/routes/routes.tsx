import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../layout/Layout";
import DashboardPage from "../pages/DashboardPage";
import DashboardUser from "../pages/DashboardUser";
import ProductosPage from "../pages/ProductosPage";
import ModalComponent from "../components/ModalComponent";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/app" element={<Layout />}>
          <Route path="dashboard" element={<DashboardUser />} />
          <Route path="productos" element={<ProductosPage />} />
          <Route
            path="agregar"
            element={
              <ModalComponent
                title="Agregar Producto"
                formType="agregar"
                isOpenDefault={true}
              />
            }
          />
          <Route
            path="editar/:id"
            element={
              <ModalComponent
                title="Editar Producto"
                formType="editar"
                isOpenDefault={true}
              />
            }
          />
          <Route
            path="eliminar/:id"
            element={
              <ModalComponent
                title="Eliminar Producto"
                formType="eliminar"
                isOpenDefault={true}
              />
            }
          />
        </Route>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>    
      </Routes>
    </BrowserRouter>
  );
};
