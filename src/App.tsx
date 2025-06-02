import { BrowserRouter, Route, Routes } from "react-router-dom"
import AgregarProductoPage from "./pages/AgregarProductoPage"
import ActualizarProductoPage from "./pages/ActualizarProductoPage"
import { EleminarProductosPage } from "./pages/EleminarProductosPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/product/create" element={<AgregarProductoPage />} />
        <Route path="/product/edit/:id" element={<ActualizarProductoPage />} />
        <Route path="/product/delete/:id" element={<EleminarProductosPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
