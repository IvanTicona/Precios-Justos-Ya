// src/pages/MapaPage.tsx
import {
  Autocomplete,
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import { useMemo, useState } from "react";

import CardZoneComponent from "../components/CardZonesComponent";
import { useMarkets } from "../hooks/useMarkets";
import { CustomDialogs } from "../components/DialogComponent";
import MarketsMap from "../components/MapaComponent";

export function MapaPage() {

  const {
    markets,
    deleteMarketById,
    editMarketHandler,
    openDialogHandler,
    closeDialogHandler,
    openDialog,
    editingMarket,
    formik,
  } = useMarkets();

  const [filter, setFilter] = useState<"" | "zona" | "barrio" | "otro">("");

  const typeOptions = useMemo(
    () => Array.from(new Set(markets.map((m) => m.tipo))),
    [markets]
  );

  const filtered = useMemo(
    () => (filter ? markets.filter((m) => m.tipo === filter) : markets),
    [markets, filter]
  );

  return (
    <Container>
      <CustomDialogs
        title={editingMarket ? "Editar Zona / Barrio" : "Agregar Zona / Barrio"}
        open={openDialog}
        onClose={closeDialogHandler}
        onSubmit={formik.handleSubmit}
      >
        <TextField
          fullWidth
          margin="normal"
          id="name"
          name="name"
          label="Nombre"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth
          multiline
          minRows={3}
          margin="normal"
          id="description"
          name="description"
          label="Descripción"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />
        <TextField
          select
          fullWidth
          margin="normal"
          id="tipo"
          name="tipo"
          label="Tipo"
          value={formik.values.tipo}
          onChange={formik.handleChange}
          error={formik.touched.tipo && Boolean(formik.errors.tipo)}
          helperText={formik.touched.tipo && formik.errors.tipo}
        >
          <MenuItem value="zona">Zona</MenuItem>
          <MenuItem value="barrio">Barrio</MenuItem>
          <MenuItem value="otro">Otro</MenuItem>
        </TextField>
        <TextField
          fullWidth
          margin="normal"
          id="latitude"
          name="latitude"
          label="Latitud"
          type="number"
          value={formik.values.latitude}
          onChange={formik.handleChange}
          error={formik.touched.latitude && Boolean(formik.errors.latitude)}
          helperText={formik.touched.latitude && formik.errors.latitude}
        />
        <TextField
          fullWidth
          margin="normal"
          id="longitude"
          name="longitude"
          label="Longitud"
          type="number"
          value={formik.values.longitude}
          onChange={formik.handleChange}
          error={formik.touched.longitude && Boolean(formik.errors.longitude)}
          helperText={formik.touched.longitude && formik.errors.longitude}
        />
        <TextField
          fullWidth
          margin="normal"
          id="imgUrl"
          name="imgUrl"
          label="URL de la imagen (opcional)"
          value={formik.values.imgUrl}
          onChange={formik.handleChange}
          error={formik.touched.imgUrl && Boolean(formik.errors.imgUrl)}
          helperText={formik.touched.imgUrl && formik.errors.imgUrl}
        />
      </CustomDialogs>

      <Box sx={{ mb: 2, display: "flex", gap: 2, alignItems: "center" }}>
        <h2 style={{ margin: 0 }}>Zonas</h2>

        <Button variant="contained" onClick={openDialogHandler}>
          Agregar Zona
        </Button>

        <Autocomplete
          disablePortal
          options={typeOptions}
          value={filter}
          onChange={(_, value) =>
            setFilter((value as "" | "zona" | "barrio" | "otro") ?? "")
          }
          sx={{ width: 220 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Filtrar por tipo"
              /* 👇 cancela la entrada de texto */
              inputProps={{ ...params.inputProps, readOnly: true }}
            />
          )}
          isOptionEqualToValue={(o, v) => o === v}
          clearOnEscape
        />
      </Box>
      <Grid container spacing={2}>
        {filtered.length ? (
          filtered.slice(0, 8).map((m) => (
            <Grid key={m.id} item xs={12} sm={6} md={4} lg={3}>
              <CardZoneComponent
                market={m}
                onDelete={() => deleteMarketById(m.id)}
                onUpdate={() => editMarketHandler(m)}
                onPrimaryAction={() => {
                  /* Navegación a vista productos */
                }}
              />
            </Grid>
          ))
        ) : (
          <p>No hay zonas que coincidan.</p>
        )}
      </Grid>

      {/* ─────────── Mapa sincronizado ─────────── */}
      <Box sx={{ mt: 2 }}>
        <MarketsMap markets={filtered} />
      </Box>
    </Container>
  );
}
