import { v4 as uuid } from 'uuid';
import { useCallback } from 'react';
import { useAlertStore } from '../store/useAlertStore';
import type { Alert, AlertPriority } from '../interfaces/alert';
import type { Product } from '../interfaces/productInterface';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export function useAlerts() {
  const { alerts, addAlert, removeAlert, clearAlerts } = useAlertStore();

  const createAlert = useCallback((
    productId: string,
    productName: string,
    reportCount: number,
    priority: AlertPriority,
    message?: string
  ) => {
    const alert: Alert = {
      id: uuid(),
      productId,
      productName,
      reportCount,
      priority,
      message: message ?? `Producto "${productName}" tiene ${reportCount} reportes negativos.`,
      createdAt: new Date(),
    };
    addAlert(alert);
  }, [addAlert]);

  const checkNegativeReports = useCallback((products: Product[]) => {
    products.forEach(p => {
      if (!p.reportCount) return;
      if (p.reportCount >= 3) {
        const priority: AlertPriority = p.reportCount >= 5 ? 'high' : 'low';
        createAlert(p.id, p.name, p.reportCount, priority);
      }
    });
  }, [createAlert]);

  const fetchAlerts = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/alerts`);
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data: Alert[] = await res.json();
      clearAlerts();
      data.forEach(a => {
        addAlert({
          ...a,
          createdAt: new Date(a.createdAt),
        });
      });
    } catch (err) {
      console.error('fetchAlerts error:', err);
    }
  }, [addAlert, clearAlerts]);

  const reloadAlerts = fetchAlerts;

  return {
    alerts,
    createAlert,
    removeAlert,
    clearAlerts,
    checkNegativeReports,
    fetchAlerts,
    reloadAlerts,
  };
}
