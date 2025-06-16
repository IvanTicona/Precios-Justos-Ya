import { useState } from 'react';
import {
  IconButton, Badge, Menu, MenuItem, Typography, Divider
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useAlerts } from '../hooks/useAlerts';
import { useAuthStore } from '../store/authStore';

const NotificationsMenu: React.FC = () => {
  const { alerts, removeAlert } = useAlerts();
  const { user } = useAuthStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  if (!user || !['alcaldía', 'admin'].includes(user.role)) return null;

  const high = alerts.filter(a => a.priority === 'high');
  const low = alerts.filter(a => a.priority === 'low');
  const count = high.length;

  return (
    <>
      <IconButton color="inherit" onClick={e => setAnchorEl(e.currentTarget)}>
        <Badge badgeContent={count} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {high.length > 0 && (
          <>
            <Typography sx={{ ml: 1 }}>Alta Prioridad</Typography>
            {high.map(a => (
              <MenuItem key={a.id} onClick={() => removeAlert(a.id)}>
                {a.productName} ({a.reportCount})
              </MenuItem>
            ))}
            <Divider />
          </>
        )}
        {low.length > 0 && (
          <>
            <Typography sx={{ ml: 1 }}>Baja Prioridad</Typography>
            {low.map(a => (
              <MenuItem key={a.id} onClick={() => removeAlert(a.id)}>
                {a.productName} ({a.reportCount})
              </MenuItem>
            ))}
          </>
        )}
        {alerts.length === 0 && (
          <MenuItem disabled>No hay notificaciones</MenuItem>
        )}
      </Menu>
    </>
  );
};

export default NotificationsMenu;
