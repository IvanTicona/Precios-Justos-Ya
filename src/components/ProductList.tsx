import { Grid, Typography } from "@mui/material";
import ProductCard from "./ProductCard";
import type { Product } from "../interfaces/productInterface";
import type { Zone } from "../interfaces/zoneInterface";

interface ProductListProps {
  isAlcaldia: boolean;
  filteredProducts: Product[];
  zones: Zone[];
  handleOpenMenu: (event: React.MouseEvent<HTMLElement>, productId: string) => void;
  goToProduct: (productId: string) => void;
}

function ProductList({ filteredProducts, zones,isAlcaldia, handleOpenMenu, goToProduct }: ProductListProps) {
  return (
    <Grid container spacing={2} sx={{ marginTop: 2 }}>
      {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            zoneName={zones.find((zone) => zone.id === product.zone_id)?.market || "N/A"}
            handleOpenMenu={handleOpenMenu}
            goToProduct={goToProduct} 
            isAlcaldia={isAlcaldia}       />
        ))
      ) : (
        <Typography>No se encontraron productos.</Typography>
      )}
    </Grid>
  );
}

export default ProductList;