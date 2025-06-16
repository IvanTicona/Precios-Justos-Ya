import {
  Box,
  CssBaseline,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Sidebar from "./SideBar";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";
import AlertsSnackbar from "../components/AlertsSnackbar";
import { useAlerts } from "../hooks/useAlerts";
import { useAuthStore } from "../store/authStore";

export const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { user } = useAuthStore();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { fetchAlerts } = useAlerts();

  useEffect(() => {
    console.log("Layout user:", user);
    fetchAlerts();
  }, [fetchAlerts]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        isMobile={isMobile}
      />
      <Box sx={{ flexGrow: 1 }}>
        <Navbar onMenuClick={handleDrawerToggle} />
        {(user?.role === "alcaldía") && (
          <AlertsSnackbar />
        )}
        <Box
          component="main"
          sx={{ p: 3, backgroundColor: "#F9FAFB", minHeight: "100vh" }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
