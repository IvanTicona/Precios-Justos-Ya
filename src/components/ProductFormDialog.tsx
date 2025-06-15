import { AppBar, Box, Button, Dialog, Grid, IconButton, TextField, Toolbar, Typography, Autocomplete } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { type FormikProps } from "formik";
import type { Zone } from "../interfaces/zoneInterface";
import type { Product } from "../interfaces/productInterface";
import Transition from "./Transition";
import type { RefObject } from "react";

interface ProductFormDialogProps {
  openDialog: boolean;
  closeDialogHandler: () => void;
  formik: FormikProps<Product>;
  imagePreview: string | null;
  setImagePreview: (url: string | null) => void;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageClick: () => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
  zones: Zone[];
  isEditing: boolean;
}

function ProductFormDialog({
  openDialog,
  closeDialogHandler,
  formik,
  imagePreview,
  handleImageUpload,
  handleImageClick,
  fileInputRef,
  zones,
  isEditing,
}: ProductFormDialogProps) {
  return (
    <Dialog
      fullScreen
      open={openDialog}
      onClose={closeDialogHandler}
      slots={{ transition: Transition }}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={closeDialogHandler}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {isEditing ? "Editar Producto" : "Crear Producto"}
          </Typography>
          <Button
            autoFocus
            color="inherit"
            disabled={formik.isSubmitting}
            onClick={() => formik.handleSubmit()}
          >
            Guardar
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          bgcolor: "background.default",
          p: 2,
        }}
      >
        <Grid container spacing={2} sx={{ maxWidth: 800 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                p: 2,
              }}
            >
              <TextField
                label="Nombre"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                fullWidth
              />
              <TextField
                label="Descripción"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
                multiline
                rows={4}
                fullWidth
              />
              <TextField
                label="Precio"
                name="price"
                type="number"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
                fullWidth
              />
              <Autocomplete
                disablePortal
                options={zones}
                getOptionLabel={(option) => option.market}
                value={zones.find((zone) => zone.id === formik.values.zone_id) || null}
                onChange={(event, newValue) => {
                  formik.setFieldValue("zone_id", newValue ? newValue.id : "");
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Mercado"
                    name="zone_id"
                    error={formik.touched.zone_id && Boolean(formik.errors.zone_id)}
                    helperText={formik.touched.zone_id && formik.errors.zone_id}
                  />
                )}
                fullWidth
              />
              <TextField
                label="Stock"
                name="stock"
                type="number"
                value={formik.values.stock}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.stock && Boolean(formik.errors.stock)}
                helperText={formik.touched.stock && formik.errors.stock}
                fullWidth
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 200,
                border: "2px dashed grey",
                borderRadius: 2,
                bgcolor: "grey.100",
                cursor: "pointer",
              }}
              onClick={handleImageClick}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
                />
              ) : (
                <Typography variant="body1" color="text.secondary">
                  Inserte imagen aquí
                </Typography>
              )}
            </Box>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
}

export default ProductFormDialog;