import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useProductsStore } from "../store/useProductsStore";
import type { Product } from "../interfaces/productInterface";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

function ProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const { fetchProduct, fetchProductHistory, zones } = useProductsStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [history, setHistory] = useState<Product[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      if (productId) {
        const fetchedProduct = await fetchProduct(productId);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
          const productHistory = await fetchProductHistory(fetchedProduct.name);
          setHistory(productHistory);
        }
      }
    };
    loadProduct();
  }, [productId, fetchProduct, fetchProductHistory]);

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={4}
        mb={4}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={toggleHistory}
        >
          {showHistory ? "Ocultar historial" : "Historial de ediciones"}
        </Button>
      </Box>

      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Grid container spacing={2} sx={{ maxWidth: '800px', width: '100%' }}>
          <Grid size={{ xs: 6, md: 6 }}>
            <Item>
              <img
                src={product.imageUrl || "https://via.placeholder.com/140"}
                alt={product.name}
                style={{ width: '100%', height: 'auto' }}
              />
            </Item>
          </Grid>
          <Grid size={{ xs: 6, md: 6 }}>
            <Item sx={{ textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
              <Typography variant="h5" style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {product.name}
              </Typography>
              <Typography style={{ marginBottom: '0.5rem' }}>
                {product.description}
              </Typography>
              <Typography style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#2e7d32', marginBottom: '0.5rem' }}>
                ${product.price.toFixed(2)}
              </Typography>
              <Typography style={{ marginBottom: '0.5rem' }}>
                Zona: {zones.find((zone) => zone.id === product.zone_id)?.market || "N/A"}
              </Typography>
              <Typography style={{ marginBottom: '0.5rem' }}>
                Disponibilidad: {product.stock > 0 ? "En stock" : "Sin stock"}
              </Typography>
            </Item>
          </Grid>
        </Grid>
      </Box>

      {showHistory && (
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Historial de Ediciones
          </Typography>
          {history.length > 0 ? (
            <Grid container spacing={2}>
              {history.map((histProduct) => (
                <Grid key={histProduct.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Item>
                    <Typography variant="subtitle1">
                      Editado: {new Date().toLocaleDateString()} {/* Adjust if you add a timestamp */}
                    </Typography>
                    <Typography>Precio: ${histProduct.price.toFixed(2)}</Typography>
                    <Typography>Descripción: {histProduct.description}</Typography>
                    <Typography>Stock: {histProduct.stock}</Typography>
                    <Typography>
                      Zona: {zones.find((zone) => zone.id === histProduct.zone_id)?.market || "N/A"}
                    </Typography>
                    <img
                      src={histProduct.imageUrl || "https://via.placeholder.com/140"}
                      alt={histProduct.name}
                      style={{ width: '100%', height: 'auto', marginTop: '1rem' }}
                    />
                  </Item>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography>No hay historial de ediciones para este producto.</Typography>
          )}
        </Box>
      )}
    </Container>
  );
}

export default ProductPage;