# Precios Justos Ya!

Una aplicación web React + TypeScript para comparación de precios de productos, construida con Vite y utilizando un servidor JSON mock para datos.

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js (versión LTS recomendada)
- npm (incluido con Node.js)
- Git

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/IvanTicona/Precios-Justos-Ya.git
cd Precios-Justos-Ya
```

2. **Instalar dependencias base**
```bash
npm install
```

3. **Instalar dependencias adicionales**
```bash
npm i axios formik yup react-router-dom
npm i @material-ui/core @mui/icons-material @mui/material @emotion/react @emotion/styled
npm i -D json-server
```

### Ejecución

4. **Iniciar servidor JSON** (en una terminal):
```bash
npx json-server ./src/db/db.json
```

5. **Iniciar aplicación** (en otra terminal):
```bash
npm run dev
```

## 🛠️ Stack Tecnológico

### Frontend
- **React 19** - Framework principal
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Material-UI** - Componentes UI

### Gestión de Estado y Formularios
- **Axios** - Cliente HTTP
- **Formik + Yup** - Manejo y validación de formularios

### Backend Mock
- **JSON Server** - API REST simulada

## 📁 Estructura del Proyecto

```
Precios-Justos-Ya/
├── src/
│   ├── db/
│   │   └── db.json          # Base de datos mock
│   └── main.tsx             # Punto de entrada React
├── index.html               # Template HTML
├── package.json             # Dependencias y scripts
├── vite.config.ts          # Configuración Vite
└── eslint.config.js        # Configuración ESLint
```

## 🗄️ Datos Mock

La aplicación utiliza un servidor JSON que proporciona endpoints para:
- **Productos** - Información de productos con precios, categorías y stock
- **Zonas** - Datos de ubicaciones/barrios
- **Usuarios** - Información de usuarios y sus preferencias
- **Alertas** - Notificaciones de cambios de precios

## 📝 Scripts Disponibles

- `npm run dev` - Inicia servidor de desarrollo
- `npm run build` - Construye para producción
- `npm run lint` - Ejecuta linter
- `npm run preview` - Vista previa del build

## 🔧 Configuración de Desarrollo

El proyecto incluye configuración completa para:
- **ESLint** - Linting con reglas para React y TypeScript
- **Vite** - Build tool optimizado para React
- **TypeScript** - Tipado estático completo
