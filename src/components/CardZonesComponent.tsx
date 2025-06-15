import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import type { Market } from "../interfaces/marketInterface";
import { useAuthStore } from "../store/authStore";

interface MarketCardProps {
  market: Market;
  onDelete: () => void;
  onUpdate: () => void;
  onPrimaryAction?: () => void;
}

export default function CardZoneComponent({
  market,
  onDelete,
  onUpdate,
  onPrimaryAction,
}: MarketCardProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const role = useAuthStore((s) => s.user?.role);

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: 2,
        border: "1px solid #e0e0e0",
        boxShadow: "none",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box position="relative">
        <CardMedia
          component="img"
          height="160"
          image={market.imgUrl || "https://picsum.photos/345/160"}
          alt={market.name}
          sx={{ objectFit: "cover" }}
        />

        {role === "alcaldía" && (
          <>
            <IconButton
              onClick={handleMenuOpen}
              size="small"
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                backgroundColor: "rgba(255,255,255,0.7)",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" },
              }}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdate();
                  handleMenuClose();
                }}
              >
                <ListItemIcon>
                  <EditIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Editar zona" />
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                  handleMenuClose();
                }}
                sx={{ color: "error.main" }}
              >
                <ListItemIcon sx={{ color: "error.main" }}>
                  <DeleteIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Eliminar zona" />
              </MenuItem>
            </Menu>
          </>
        )}
      </Box>

      <CardContent>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          {market.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {market.description}
        </Typography>

        {/* primary action */}
        <Box mt={1} display="flex" justifyContent="flex-start">
          <Button
            variant="contained"
            size="small"
            onClick={onPrimaryAction}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: "bold",
              px: 3,
            }}
          >
            Ver productos
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
