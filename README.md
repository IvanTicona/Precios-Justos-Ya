# Precios Justos Ya!

## Clonar el repositorio
``` bash
git clone https://github.com/IvanTicona/Precios-Justos-Ya.git
cd Precios-Justos-Ya
```

> [!IMPORTANT]
> Ejecutar en la raíz del proyecto.

## Instalar dependencias
``` bash
npm install
npm i axios formik yup react-router-dom
npm i @heroui/react framer-motion
npm i -D json-server tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

## Configurar el archivo `tailwind.config.js`
``` javascript
import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()]
}
```

## Configurar el archivo `index.css`
``` css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Ejecutar el servidor JSON
``` bash
npx json-server ./src/db/db.json
```

## Ejecutar la aplicación
``` bash
npm run dev
```