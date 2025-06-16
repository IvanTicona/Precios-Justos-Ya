import { create } from 'zustand';

interface Report {
  id?: number;
  productId: number;
  price: number;
  address: string;
  storeName: string;
  reason: 'unfair_price' | 'shortage';
  reportedAt: string;
}

interface StoreState {
  reports: Report[];
  addReport: (report: Report) => void;
  setReports: (reports: Report[]) => void;
  mostReportedStores: { storeName: string; reportCount: number }[];
  highestRatedStores: { storeName: string; averageRating: number }[];
}

export const useStore = create<StoreState>((set, get) => ({
  reports: [],
  addReport: (report) =>
    set((state) => {
      const newReports = [...state.reports, report];
      const storeCounts = newReports.reduce((acc, r) => {
        acc[r.storeName] = (acc[r.storeName] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const mostReported = Object.entries(storeCounts)
        .map(([storeName, reportCount]) => ({ storeName, reportCount }))
        .sort((a, b) => b.reportCount - a.reportCount)
        .slice(0, 5);

      const highestRated = Object.keys(storeCounts).map((storeName) => ({
        storeName,
        averageRating: newReports
          .filter((r) => r.storeName === storeName && r.reason === 'unfair_price')
          .reduce((acc, r) => acc + (r.price > 30 ? 2 : 4), 0) /
          (storeCounts[storeName] || 1),
      })).sort((a, b) => b.averageRating - a.averageRating)
        .slice(0, 5);

      return { reports: newReports, mostReportedStores: mostReported, highestRatedStores: highestRated };
    }),
  setReports: (reports) =>
    set((state) => {
      const storeCounts = reports.reduce((acc, r) => {
        acc[r.storeName] = (acc[r.storeName] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const mostReported = Object.entries(storeCounts)
        .map(([storeName, reportCount]) => ({ storeName, reportCount }))
        .sort((a, b) => b.reportCount - a.reportCount)
        .slice(0, 5);

      const highestRated = Object.keys(storeCounts).map((storeName) => ({
        storeName,
        averageRating: reports
          .filter((r) => r.storeName === storeName && r.reason === 'unfair_price')
          .reduce((acc, r) => acc + (r.price > 30 ? 2 : 4), 0) /
          (storeCounts[storeName] || 1),
      })).sort((a, b) => b.averageRating - a.averageRating)
        .slice(0, 5);

      return { reports, mostReportedStores: mostReported, highestRatedStores: highestRated };
    }),
  mostReportedStores: [],
  highestRatedStores: [],
}));
