import { Autocomplete, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from "@mui/material";
import type { Product } from "../interfaces/productInterface";
import type { Zone } from "../interfaces/zoneInterface";

interface ProductComparisonProps {
  productNames: string[];
  selectedProductName: string | null;
  setSelectedProductName: (name: string | null) => void;
  comparisonProducts: Product[];
  setComparisonProducts: (products: Product[]) => void;
  fetchProductsByName: (name: string) => Promise<Product[]>;
  zones: Zone[];
}

function ProductComparison({
  productNames,
  selectedProductName,
  setSelectedProductName,
  comparisonProducts,
  setComparisonProducts,
  fetchProductsByName,
  zones,
}: ProductComparisonProps) {
  const handleProductSelect = async (productName: string | null) => {
    setSelectedProductName(productName);
    if (productName) {
      const products = await fetchProductsByName(productName);
      setComparisonProducts(products);
    } else {
      setComparisonProducts([]);
    }
  };

  return (
    <Box sx={{ marginTop: 2 }}>
      <Autocomplete
        disablePortal
        options={productNames}
        value={selectedProductName}
        onChange={(event, newValue) => handleProductSelect(newValue)}
        sx={{ width: 300, marginBottom: 2 }}
        renderInput={(params) => <TextField {...params} label="Seleccionar producto" />}
      />
      {comparisonProducts.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="product comparison table">
            <TableHead>
              <TableRow>
                <TableCell>Mercado</TableCell>
                <TableCell align="right">Precio</TableCell>
                <TableCell align="right">Stock</TableCell>
                <TableCell align="right">Descripción</TableCell>
                <TableCell align="right">Imagen</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {comparisonProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    {zones.find((zone) => zone.id === product.zone_id)?.market || "N/A"}
                  </TableCell>
                  <TableCell align="right">${product.price.toFixed(2)}</TableCell>
                  <TableCell align="right">{product.stock}</TableCell>
                  <TableCell align="right">{product.description}</TableCell>
                  <TableCell align="right">
                    <img
                      src={product.imageUrl || ""}
                      alt={product.name}
                      style={{ width: 50, height: 50, objectFit: "contain" }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>Seleccione un producto para comparar.</Typography>
      )}
    </Box>
  );
}

export default ProductComparison;