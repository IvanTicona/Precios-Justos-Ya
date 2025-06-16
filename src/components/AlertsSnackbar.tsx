import React, { useEffect, useState } from 'react';
import { Snackbar, Alert as MuiAlert } from '@mui/material';
import { useAlertStore } from '../store/useAlertStore';

const AlertsSnackbar: React.FC = () => {
  const alerts = useAlertStore(state => state.alerts);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(alerts[0]);

  useEffect(() => {
    if (alerts.length > 0) {
      setCurrent(alerts[alerts.length - 1]);
      setOpen(true);
    }
  }, [alerts]);

  if (!current) return null;

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={() => setOpen(false)}
    >
      <MuiAlert
        onClose={() => setOpen(false)}
        severity={current.priority === 'high' ? 'error' : 'warning'}
        elevation={6}
        variant="filled"
      >
        {current.message}
      </MuiAlert>
    </Snackbar>
  );
};

export default AlertsSnackbar;
