import { Box, Grid } from "@mui/material";
import { useMarketStore } from "../store/useMarketStore";
import CardZoneComponent from "../components/CardZonesComponent";
import MarketsMap from "../components/MapaComponent";

export function MapaPage() {
  const markets = useMarketStore((s) => s.markets);

  return (
    <Box>
      <h2>Zonas</h2>
      <Grid
        container
        spacing={1}
        sx={{
          marginTop: 2,
        }}
      >
        {markets.slice(0, 5).map((market) => (
          <Grid key={market.id} size={{ xs: 12, sm: 6, md: 5, lg: 2 }}>
            <CardZoneComponent market={market} />
          </Grid>
        ))}
        <Box>
        <h2>Mapa</h2>
        <Box sx={{ p: 2 }}>{/* <MarketsMap height="75vh" /> */}</Box>
        </Box>
      </Grid>
    </Box>
  );
}
