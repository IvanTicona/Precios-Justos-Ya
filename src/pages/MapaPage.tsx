import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  TextField,
  Autocomplete,
} from '@mui/material';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CardZoneComponent from '../components/CardZonesComponent';
import { useMarkets } from '../hooks/useMarkets';
import { CustomDialogs } from '../components/DialogComponent';
import MarketsMap from '../components/MapaComponent';
import { useAuthStore } from '../store/authStore';

export function MapaPage() {
  const navigate = useNavigate();
  const role = useAuthStore((s) => s.user?.role); // "alcaldía" | "cliente"

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

  /* filtro por tipo */
  const [filter, setFilter] = useState<'' | 'zona' | 'barrio' | 'otro'>('');
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
      {/* Dialog solo para alcaldía */}
      {role === 'alcaldía' && (
        <CustomDialogs
          title={editingMarket ? 'Editar Zona / Barrio' : 'Agregar Zona / Barrio'}
          open={openDialog}
          onClose={closeDialogHandler}
          onSubmit={formik.handleSubmit}
        >
          {/* --- formulario sin cambios --- */}
          {/* ... códigos de TextField tal cual los tenías ... */}
          <TextField
            select
            fullWidth
            margin="normal"
            id="tipo"
            name="tipo"
            label="Tipo"
            value={formik.values.tipo}
            onChange={formik.handleChange}
          >
            <MenuItem value="zona">Zona</MenuItem>
            <MenuItem value="barrio">Barrio</MenuItem>
            <MenuItem value="otro">Otro</MenuItem>
          </TextField>
        </CustomDialogs>
      )}

      {/* Encabezado + filtros */}
      <Box sx={{ mb: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>Zonas</h2>

        {role === 'alcaldía' && (
          <Button variant="contained" onClick={openDialogHandler}>
            Agregar Zona
          </Button>
        )}

        <Autocomplete
          disablePortal
          options={typeOptions}
          value={filter}
          onChange={(_, val) => setFilter((val as any) ?? '')}
          sx={{ width: 220 }}
          renderInput={(params) => (
            <TextField {...params} label="Filtrar por tipo" />
          )}
          inputProps={{ readOnly: true }}
          clearOnEscape
        />
      </Box>

      <Grid container spacing={2}>
        {filtered.length ? (
          filtered.slice(0, 8).map((m) => (
            <Grid key={m.id} item xs={12} sm={6} md={4} lg={3}>
              <CardZoneComponent
                market={m}
                onDelete={
                  role === 'alcaldía' ? () => deleteMarketById(m.id) : () => {}
                }
                onUpdate={
                  role === 'alcaldía' ? () => editMarketHandler(m) : () => {}
                }
                onPrimaryAction={() =>
                  navigate('/app/products', { state: { zoneId: m.id } })
                }
              />
            </Grid>
          ))
        ) : (
          <p>No hay zonas que coincidan.</p>
        )}
      </Grid>

      {/* Mapa */}
      <Box sx={{ mt: 2 }}>
        <MarketsMap markets={filtered} />
      </Box>
    </Container>
  );
}
