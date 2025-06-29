import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { Info } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useUser } from "../contexts/UserContext";
import { useAuthStore } from "../store/authStore";

const drawerWidth = 240;

interface SidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  isMobile: boolean;
}

const Sidebar = ({
  mobileOpen,
  handleDrawerToggle,
  isMobile,
}: SidebarProps) => {
  const location = useLocation();
  const { logout } = useUser();
  const { user } = useAuthStore();

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List >
        <ListItem disablePadding >
          <ListItemButton
            component={Link}
            to="/app/products"
            selected={location.pathname === "/app/products"}
          >
            <ListItemIcon>
              <BusinessCenterIcon />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItemButton>
        </ListItem>

        {user && user.role === "alcaldía" && (
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/app/alerts"
              selected={location.pathname === "/app/alerts"}
            >
              <ListItemIcon>
                <NotificationsActiveIcon />
              </ListItemIcon>
              <ListItemText primary="Alertas" />
            </ListItemButton>
          </ListItem>
        )}

        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/login"
            onClick={logout}
            selected={location.pathname === "/login"}
          >
            <ListItemIcon>
              <Info />
            </ListItemIcon>
            <ListItemText primary="Cerrar Sesión" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
  return (
    <>
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      )}

      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;
