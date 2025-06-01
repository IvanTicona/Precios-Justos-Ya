import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ProductPage } from "./pages/ProductPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/products/:productId"
          element={<ProductPage />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
