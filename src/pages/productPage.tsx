import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useProductsStore } from "../store/useProductsStore";
import type { Product } from "../interfaces/productInterface";
import * as Yup from "yup";
import { useReports } from "../hooks/useReports";
import { useAlerts } from "../hooks/useAlerts";
import jsonServerInstance from "../api/jsonInstance";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const reportSchema = Yup.object().shape({
  price: Yup.number()
    .required("El precio es obligatorio")
    .positive("El precio debe ser mayor a 0")
    .typeError("El precio debe ser un número"),
  address: Yup.string()
    .required("La dirección es obligatoria")
    .min(5, "La dirección debe tener al menos 5 caracteres"),
  storeName: Yup.string()
    .required("El nombre de la tienda es obligatorio")
    .min(3, "El nombre de la tienda debe tener al menos 3 caracteres"),
  reason: Yup.string()
    .required("El motivo es obligatorio")
    .oneOf(["unfair_price", "shortage"], "Motivo inválido"),
});

function ProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const { fetchProduct, fetchProductHistory, zones } = useProductsStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [history, setHistory] = useState<Product[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState(false);
  const navigate = useNavigate();
  const { addReport } = useReports();
  const { createAlert } = useAlerts();

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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleReports = () => {
    navigate("/app/reports");
  };

  return (
    <>
      <Container maxWidth="lg">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={4}
          mb={4}
        >
          <Button variant="contained" color="primary" onClick={toggleHistory}>
            {showHistory ? "Ocultar historial" : "Historial de ediciones"}
          </Button>
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid container spacing={2} sx={{ maxWidth: "800px", width: "100%" }}>
            <Grid size={{ xs: 6, md: 6 }}>
              <Item>
                <img
                  src={product.imageUrl || "https://via.placeholder.com/140"}
                  alt={product.name}
                  style={{ width: "100%", height: "auto" }}
                />
              </Item>
            </Grid>
            <Grid size={{ xs: 6, md: 6 }}>
              <Item
                sx={{
                  textAlign: "left",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <Typography
                  variant="h5"
                  style={{ fontWeight: "bold", marginBottom: "0.5rem" }}
                >
                  {product.name}
                </Typography>
                <Typography style={{ marginBottom: "0.5rem" }}>
                  {product.description}
                </Typography>
                <Typography
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    color: "#2e7d32",
                    marginBottom: "0.5rem",
                  }}
                >
                  Bs {product.price.toFixed(2)}
                </Typography>
                <Typography style={{ marginBottom: "0.5rem" }}>
                  Zona:{" "}
                  {zones.find((zone) => zone.id === product.zone_id)?.market ||
                    "N/A"}
                </Typography>
                <Typography style={{ marginBottom: "0.5rem" }}>
                  Disponibilidad: {product.stock > 0 ? "En stock" : "Sin stock"}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOpen}
                >
                  Reportar
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleReports}
                >
                  Ver Reportes
                </Button>
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
                        Editado: {new Date().toLocaleDateString()}
                      </Typography>
                      <Typography>
                        Precio: ${histProduct.price.toFixed(2)}
                      </Typography>
                      <Typography>
                        Descripción: {histProduct.description}
                      </Typography>
                      <Typography>Stock: {histProduct.stock}</Typography>
                      <Typography>
                        Zona:{" "}
                        {zones.find((zone) => zone.id === histProduct.zone_id)
                          ?.market || "N/A"}
                      </Typography>
                      <img
                        src={
                          histProduct.imageUrl ||
                          "https://via.placeholder.com/140"
                        }
                        alt={histProduct.name}
                        style={{
                          width: "100%",
                          height: "auto",
                          marginTop: "1rem",
                        }}
                      />
                    </Item>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography>
                No hay historial de ediciones para este producto.
              </Typography>
            )}
          </Box>
        )}
      </Container>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Reportar Producto</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              price: "",
              address: "",
              storeName: "",
              reason: "unfair_price",
            }}
            validationSchema={reportSchema}
            onSubmit={async (values, { resetForm }) => {
              await addReport({
                price: Number(values.price),
                address: values.address,
                storeName: values.storeName,
                reason: values.reason as "unfair_price" | "shortage",
              });

              const refreshed = await fetchProduct(product.id);
              const count = refreshed?.reportCount ?? 0;

              try {
                await jsonServerInstance.post("/alerts", {
                  productId: product.id,
                  productName: product.name,
                  reportCount: count,
                  priority: "low",
                  onmessage: `Nuevo reporte en "${product.name}". Total: ${count} reportes.`,
                  createdAt: new Date().toISOString(),
                });
              } catch (err) {
                console.error("Error guardando alerta en API:", err);
              }

              createAlert(
                product.id,
                product.name,
                count,
                count >= 5 ? "high" : "low",
                `Nuevo reporte en "${product.name}". Total: ${count} reportes.`
              );

              resetForm();
              handleClose();
              navigate("/app/reports");
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <Field
                  as={TextField}
                  name="price"
                  label="Precio"
                  type="number"
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  placeholder="Ej: 25"
                  error={touched.price && !!errors.price}
                  helperText={touched.price && errors.price}
                />
                <Field
                  as={TextField}
                  name="address"
                  label="Dirección"
                  type="text"
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  placeholder="Ej: Calle Falsa 123, Ciudad"
                  error={touched.address && !!errors.address}
                  helperText={touched.address && errors.address}
                />
                <Field
                  as={TextField}
                  name="storeName"
                  label="Nombre de la Tienda"
                  type="text"
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  placeholder="Ej: Tienda Rodríguez"
                  error={touched.storeName && !!errors.storeName}
                  helperText={touched.storeName && errors.storeName}
                />
                <Field
                  as={TextField}
                  name="reason"
                  label="Motivo"
                  select
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  SelectProps={{ native: true }}
                  error={touched.reason && !!errors.reason}
                  helperText={touched.reason && errors.reason}
                >
                  <option value="unfair_price">Precio Injusto</option>
                  <option value="shortage">Escasez</option>
                </Field>
                <DialogActions>
                  <Button onClick={handleClose}>Cancelar</Button>
                  <Button type="submit" variant="contained" color="primary">
                    Enviar Reporte
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ProductPage;
