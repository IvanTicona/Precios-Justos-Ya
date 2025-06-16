export type AlertPriority = 'high' | 'low';

export interface Alert {
  id: string;
  productId: string;
  productName: string;
  reportCount: number;
  priority: AlertPriority;
  message: string;
  createdAt: Date;
}