import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import type { Market } from '../interfaces/marketInterface';


interface MarketCard {
  market: Market;         
}

export default function CardZoneComponent({market}: MarketCard) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://picsum.photos/200/300"
          alt={market.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {market.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {market.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Products
        </Button>
        <Button size="small" color="primary">
          Borrar Zona
        </Button>
        <Button size="small" color="primary">
          Editar Zona
        </Button>
      </CardActions>
    </Card>
  );
}
