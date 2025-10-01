# Buscador Egoitza Araba

Una interfaz de búsqueda hermosa y lista para producción que se integra con la API de Google Cloud Discovery Engine para la Diputación Foral de Álava.

## Características

- 🔍 **Búsqueda Potente**: Capacidades de búsqueda avanzadas usando Google Cloud Discovery Engine
- 🎨 **Interfaz Hermosa**: Diseño moderno y responsivo con animaciones suaves
- ⚡ **Rendimiento Rápido**: Aplicación React optimizada con TypeScript
- 🔗 **Resultados Clicables**: Enlaces directos a los resultados de búsqueda
- 📱 **Compatible con Móviles**: Diseño responsivo que funciona en todos los dispositivos
- 🛡️ **Manejo de Errores**: Manejo integral de errores y estados de carga

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

2. **Configurar Autenticación**
   
   Obtén tu token de acceso de Google Cloud:
   ```bash
   gcloud auth print-access-token
   ```

3. **Establecer Variables de Entorno**
   
   Crea un archivo `.env.local` en el directorio raíz:
   ```env
   VITE_GCLOUD_ACCESS_TOKEN=your_access_token_here
   ```

4. **Iniciar Servidor de Desarrollo**
   ```bash
   npm run dev
   ```

5. **Abrir en el Navegador**
   
   Navega a `http://localhost:5173`

## Uso

1. **Ingresar Consulta de Búsqueda**: Escribe tu término de búsqueda en la barra de búsqueda
2. **Hacer Clic en Buscar**: Presiona el botón de búsqueda o presiona Enter
3. **Ver Resultados**: Navega por los resultados de búsqueda
4. **Hacer Clic en Enlaces**: Haz clic en cualquier resultado para abrirlo en una nueva pestaña

## Configuración de API

La aplicación está configurada para usar el siguiente endpoint de Google Cloud Discovery Engine:
- **ID del Proyecto**: `324217435708`
- **Ubicación**: `eu`
- **Motor**: `buscador-egoitza_1751623726684`

## Consideraciones de Producción

Para el despliegue en producción, considera:

1. **Proxy Backend**: Crear un servicio backend para manejar llamadas API y autenticación
2. **Configuración CORS**: Configurar ajustes CORS apropiados en Google Cloud
3. **Gestión de Tokens**: Implementar mecanismos seguros de renovación de tokens
4. **Variables de Entorno**: Usar gestión segura de variables de entorno
5. **Limitación de Velocidad**: Implementar limitación de velocidad para prevenir abuso

## Tecnologías Utilizadas

- **React 18** with TypeScript
- **Vite** para desarrollo y construcción rápidos
- **Tailwind CSS** para estilos
- **Lucide React** para iconos
- **Google Cloud Discovery Engine API**

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

## Solución de Problemas

### Problemas Comunes

1. **Token de Acceso Expirado**
   - Ejecuta `gcloud auth print-access-token` para obtener un nuevo token
   - Actualiza tu archivo `.env.local`

2. **Errores CORS**
   - Esto es esperado en desarrollo
   - Usa un proxy backend para producción

3. **Permisos de API**
   - Asegúrate de que tu usuario de Google Cloud tenga permisos de Discovery Engine
   - Verifica que la API esté habilitada en tu proyecto

### Obtener Ayuda

Si encuentras problemas:
1. Revisa la consola del navegador para mensajes de error
2. Verifica tus credenciales de Google Cloud
3. Asegúrate de que la API de Discovery Engine esté habilitada
4. Verifica que tu token de acceso sea válido

## Licencia

Este proyecto está licenciado bajo la Licencia MIT.