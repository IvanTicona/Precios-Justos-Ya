export interface LocationItem {
  id: string;
  name: string;
  coords: [number, number];
  source?: string;
};

export const locations: LocationItem[] = [
  {
    id: 'mercado-rodriguez',
    name: 'Mercado Rodríguez (San Pedro)',
    coords: [-16.5003341,-68.1394305],
  },
  {
    id: 'mercado-camacho',
    name: 'Mercado Camacho',
    coords: [-16.5006915,-68.1311919],
  },
  {
    id: 'mercado-lanza',
    name: 'Mercado Lanza',
    coords: [-16.4950176,-68.1374067],
  },
  {
    id: 'mercado-yungas',
    name: 'Mercado Yungas',
    coords: [-16.497143,-68.1293081],
  },
  {
    id: 'mercado-villa-fatima',
    name: 'Mercado Villa Fátima',
    coords: [-16.480184, -68.121099],
  },
  {
    id: 'mercado-uruguay',
    name: 'Mercado Uruguay',
    coords: [-16.4975674,-68.1438921],
  },
  {
    id: 'calle-antonio-gallardo',
    name: 'Calle Antonio Gallardo',
    coords: [-16.5012932,-68.1453075],
  },
  {
    id: 'calle-leon-de-la-barra',
    name: 'Calle León de la Barra',
    coords: [-16.4987561,-68.1423108],
  },
  {
    id: 'calle-benancio-burgoa',
    name: 'Calle Benancio Burgoa',
    coords: [-16.5026135,-68.1409326],
  },
  {
    id: 'mercado-el-tejar',
    name: 'Mercado El Tejar',
    coords: [-16.4960168,-68.1551476],
  },
  {
    id: 'mercado-achumani',
    name: 'Mercado Achumani',
    coords: [-16.5308442,-68.0733913],
  },
  {
    id: 'mercado-sopocachi',
    name: 'Mercado Sopocachi',
    coords: [-16.5094741,-68.1296867],
  },
  {
    id: 'mercado-irpavi',
    name: 'Mercado Irpavi',
    coords: [-16.5246204,-68.0872736],
  },
  {
    id: 'mercado-los-pinos',
    name: 'Mercado Los Pinos',
    coords: [-16.5412272,-68.0725419],
  },
  {
    id: 'mercado-miraflores',
    name: 'Mercado Miraflores',
    coords: [-16.5014398,-68.1217666],
  },
  {
    id: 'mercado-ciudad-satélite',
    name: 'Mercado Ciudad Satélite',
    coords: [-16.5248198,-68.1507144],
  },
  {
    id: 'mercado-obrajes',
    name: 'Mercado Obrajes',
    coords: [-16.5299029,-68.1024157],
  },
  {
    id: 'mercado-alto-seguencoma',
    name: 'Mercado Alto Seguencoma',
    coords: [-16.5340152,-68.1042403],
  },
  {
    id: 'mercado-el-carmen',
    name: 'Mercado El Carmen',
    coords: [-16.5146527,-68.1263616],
  },
  {
    id: 'mercado-strongest',
    name: 'Mercado Strongest',
    coords: [-16.5155925,-68.1399941],
  },
  {
    id: 'mercado-hinojosa',
    name: 'Mercado Hinojosa',
    coords: [-16.5033822,-68.144492],
  },
  {
    id: 'garita-de-lima',
    name: 'Garita de Lima',
    coords: [-16.495697, -68.145606],
  }
];