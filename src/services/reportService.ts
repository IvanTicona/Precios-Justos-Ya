import jsonServerInstance from '../api/jsonInstance';

export interface Report {
  id?: number;
  price: number;
  address: string;
  storeName: string;
  reason: 'unfair_price' | 'shortage';
  rating?: number;
}

export const fetchReportsAPI = async (): Promise<Report[]> => {
    try{
    const response = await jsonServerInstance.get('/reports');
    return response.data;
    } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
};

export const addReportAPI = async (report: Report): Promise<Report> => {
    try{
    const response = await jsonServerInstance.post('/reports', report);
    return response.data;
    } catch (error) {
    console.error("Error creating report:", error);
    throw error;
  }
};
