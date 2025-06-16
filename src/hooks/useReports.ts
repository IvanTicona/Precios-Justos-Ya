// src/hooks/useReports.ts
import { create } from 'zustand';
import { type Report, fetchReportsAPI, addReportAPI } from '../services/reportService';

interface ReportState {
  reports: Report[];
  fetchReports: () => Promise<void>;
  addReport: (report: Report) => Promise<void>;
}

export const useReports = create<ReportState>((set) => ({
  reports: [],
  fetchReports: async () => {
    const data = await fetchReportsAPI();
    set({ reports: data });
  },
  addReport: async (report) => {
    const newReport = await addReportAPI(report);
    set((state) => ({
      reports: [...state.reports, newReport],
    }));
  },
}));
