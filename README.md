# Buscador trámites ciudadanía

## Instrucciones de Configuración

### Prerrequisitos

1. **Proyecto de Google Cloud** con la API de Discovery Engine habilitada
2. **Node.js** (v16 or higher)
3. **Google Cloud CLI** instalado y configurado

### Configuración de Desarrollo Local

1. **Clonar e Instalar Dependencias**
   ```bash
   npm install
   ```
2. **Iniciar Servidor de Desarrollo**
   ```bash
   npm run dev
   ```

3. **Abrir en el Navegador**
   
   Navega a `http://localhost:5173`

## Configuración de API

La aplicación está configurada para usar el siguiente endpoint de Google Cloud Discovery Engine:
- **ID del Proyecto**: `324217435708`
- **Ubicación**: `eu`
- **Motor**: `buscador-egoitza_1751623726684`

## Estructura de Archivos

```
src/
├── components/          # Componentes React
│   ├── Header.tsx      # Cabecera de la aplicación
│   ├── SearchBar.tsx   # Componente de entrada de búsqueda
│   └── SearchResults.tsx # Visualización de resultados
├── services/           # Servicios API
│   └── searchService.ts # Integración API de Google Cloud
├── types/              # Definiciones de tipos TypeScript
│   └── search.ts       # Tipos relacionados con búsqueda
├── App.tsx             # Componente principal de la aplicación
└── main.tsx            # Punto de entrada de la aplicación
```

## Licencia

Este proyecto está licenciado bajo la Licencia MIT.
