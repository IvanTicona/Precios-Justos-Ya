import { useEffect } from 'react';
import { useReports } from '../hooks/useReports';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

const ReportsList = () => {
  const { reports, fetchReports } = useReports();

  const getWeeklySummary = () => {
    const totalReports = reports.length;
    const unfairPriceReports = reports.filter(r => r.reason === 'unfair_price').length;
    const shortageReports = reports.filter(r => r.reason === 'shortage').length;
    return { totalReports, unfairPriceReports, shortageReports };
  };

  const getStoreRanking = () => {
    const storeCounts: Record<string, number> = {};
    reports.forEach(report => {
      storeCounts[report.storeName] = (storeCounts[report.storeName] || 0) + 1;
    });

    return Object.entries(storeCounts)
      .map(([storeName, count]) => ({ storeName, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); 
  };

  const summary = getWeeklySummary();
  const ranking = getStoreRanking();

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <Box sx={{ maxWidth: '900px', mx: 'auto', my: 4 }}>
      <Typography variant="h4" gutterBottom>
        Lista de Reportes
      </Typography>

      {reports.length === 0 ? (
        <Typography variant="body1">No hay reportes disponibles.</Typography>
      ) : (
        <Grid container spacing={2}>
          {reports.map(report => (
            <Grid item xs={12} sm={6} md={4} key={report.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{report.storeName}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Dirección: {report.address}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Precio: Bs {report.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Motivo: {report.reason === 'unfair_price' ? 'Precio Injusto' : 'Escasez'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" gutterBottom>
        Resumen Semanal
      </Typography>
      <Typography>Total de reportes: {summary.totalReports}</Typography>
      <Typography>Reportes por precio injusto: {summary.unfairPriceReports}</Typography>
      <Typography>Reportes por escasez: {summary.shortageReports}</Typography>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" gutterBottom>
        Ranking de Comercios
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Comercio</TableCell>
            <TableCell>Nº de Reportes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ranking.map((store, index) => (
            <TableRow key={index}>
              <TableCell>{store.storeName}</TableCell>
              <TableCell>{store.count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default ReportsList;