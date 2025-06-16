import { Card, CardMedia, CardContent, CardActions, Button, Typography, Stack, IconButton, Grid, Box } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import type { Product } from "../interfaces/productInterface";

interface ProductCardProps {
  product: Product;
  zoneName: string;
  isAlcaldia: boolean;
  handleOpenMenu: (event: React.MouseEvent<HTMLElement>, productId: string) => void;
  goToProduct: (productId: string) => void;
}

function ProductCard({ product, zoneName, isAlcaldia, handleOpenMenu, goToProduct }: ProductCardProps) {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
      <Card sx={{ maxWidth: 345 }}>
        <Box position="relative">
        {isAlcaldia && (

          <IconButton
            onClick={(event) => handleOpenMenu(event, product.id)}
            size="small"
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor: "rgba(255,255,255,0.7)",
              zIndex: 1,
            }}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
          )}

          <CardMedia
            sx={{ height: 140 }}
            image={product.imageUrl || "https://picsum.photos/200/300"}
            title={product.name}
          />
          <CardContent>
            <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                ${product.price.toFixed(2)}
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {product.description}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Mercado: {zoneName}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => goToProduct(product.id)}>
              Ver detalles
            </Button>
          </CardActions>
        </Box>
      </Card>
    </Grid>
  );
}

export default ProductCard;