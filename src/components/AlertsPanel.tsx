import React from 'react';
import {
  Box, Typography, List, ListItem, ListItemText,
  IconButton, Divider, Chip
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAlerts } from '../hooks/useAlerts';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const AlertsPanel: React.FC = () => {
  const { alerts, removeAlert, clearAlerts } = useAlerts();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  console.log('AlertsPanel user:', user?.role);

  if (user?.role !== 'alcaldía') {
  return <Typography>No tienes acceso a las alertas.</Typography>;
  }

  if (alerts.length === 0) {
    return <Typography>No hay alertas activas.</Typography>;
  }

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Alertas Activas</Typography>
        <Chip
          label="Borrar Todas"
          color="default"
          onClick={clearAlerts}
        />
      </Box>
      <List>
        {alerts.map(a => {
          console.log('Alert:', a);
          return (
          <React.Fragment key={a.id}>
            <ListItem
              secondaryAction={
                <IconButton edge="end" onClick={() => removeAlert(a.productId)}>
                  <CloseIcon />
                </IconButton>
              }
            >
              <ListItemText
                onClick={() => navigate(`/app/products/${a.productId}`)}
                primary={
                  <>
                    {a.productName}{' '}
                    <Chip
                      label={a.priority === 'high' ? 'Alta' : 'Baja'}
                      size="small"
                      color={a.priority === 'high' ? 'error' : 'warning'}
                    />
                  </>
                }
                secondary={`${a.message} • ${a.createdAt.toLocaleString()}`}
              />
            </ListItem>
            <Divider component="li" />
          </React.Fragment>
        )})}
      </List>
    </Box>
  );
};

export default AlertsPanel;
