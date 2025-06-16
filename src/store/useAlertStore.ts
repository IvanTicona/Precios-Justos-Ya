import { create } from 'zustand';
import type { Alert } from '../interfaces/alert';

interface AlertState {
  alerts: Alert[];
  addAlert: (alert: Alert) => void;
  removeAlert: (id: string) => void;
  clearAlerts: () => void;
}

export const useAlertStore = create<AlertState>((set, get) => ({
  alerts: [],
  addAlert: (alert) => {
    const exists = get().alerts.find(a => a.productId === alert.productId);
    if (!exists) {
      set(state => ({ alerts: [...state.alerts, alert] }));
    }
  },
  removeAlert: (id) =>
    set(state => ({ alerts: state.alerts.filter(a => a.id !== id) })),
  clearAlerts: () => set({ alerts: [] }),
}));
