import { Box, Button, Autocomplete, TextField, BottomNavigation, BottomNavigationAction } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import type { Zone } from "../interfaces/zoneInterface";
import { useUser } from "../contexts/UserContext";

interface ProductHeaderProps {
  openDialogHandler: () => void;
  value: number;
  setValue: (value: number) => void;
  zones: Zone[];
  selectedZone: Zone | null;
  setSelectedZone: (zone: Zone | null) => void;
}

function ProductHeader({
  openDialogHandler,
  value,
  setValue,
  zones,
  selectedZone,
  setSelectedZone,
}: ProductHeaderProps) {
  const { user } = useUser();
  const isAlcaldia = user?.role === 'alcaldía';

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mt={4}
      mb={4}
    >
      {!isAlcaldia && (
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={openDialogHandler}
        >
          Agregar producto
        </Button>
      )}

      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        sx={{ width: 500 }}
      >
        <BottomNavigationAction label="Todos los productos" icon={<CalendarViewMonthIcon />} />
        <BottomNavigationAction label="Comparar productos por zonas" icon={<TravelExploreIcon />} />
      </BottomNavigation>

      {value === 0 && (
        <Autocomplete
          disablePortal
          options={zones}
          getOptionLabel={(option) => option.market}
          value={selectedZone}
          onChange={(event, newValue) => setSelectedZone(newValue)}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Filtrar por mercado" />}
        />
      )}
    </Box>
  );
}

export default ProductHeader;