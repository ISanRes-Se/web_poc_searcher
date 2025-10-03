export const translations = {
  es: {
    header: {
      title: 'Buscador Inteligente de Trámites para la Ciudadanía',
    },
    main: {
      heading: 'Busca en Egoitza Araba',
      subheading: 'Descubre información en todo el contenido indexado de la Diputación Foral de Álava',
    },
    searchBar: {
      placeholder: 'Buscar procedimientos, trámites...',
      button: 'Buscar',
    },
    assistant: {
      title: 'Asistente de trámites',
      description: 'Consulta dudas y encuentra trámites con ayuda de IA generativa.',
      button: 'Conversar con el Agente',
      widgetPlaceholder: 'Escribe tu consulta',
    },
    searchResults: {
      resultsCount: 'Aproximadamente {count} resultados para',
      summaryTitle: 'Resumen Generado por IA',
      errorTitle: 'Error de Búsqueda',
      errorCheckList: 'Asegúrate de tener:',
      errorItem1: 'Configurada la variable de entorno VITE_GCLOUD_ACCESS_TOKEN',
      errorItem2: 'Credenciales válidas de Google Cloud',
      errorItem3: 'Configuración CORS adecuada (para producción)',
      noResults: 'No se encontraron resultados',
      noResultsMessage: 'Prueba con diferentes palabras clave o verifica la ortografía.',
      openInNewTab: 'Abrir en nueva pestaña',
    },
  },
  eu: {
    header: {
      title: 'Herritarrentzako Izapide Bilatzaile Adimentsua',
    },
    main: {
      heading: 'Bilatu Egoitza Araba-n',
      subheading: 'Aurkitu informazioa Arabako Foru Aldundiaren indexatutako eduki guztietan',
    },
    searchBar: {
      placeholder: 'Bilatu prozedurak, izapideak...',
      button: 'Bilatu',
    },
    assistant: {
      title: 'Izapide laguntzailea',
      description: 'Kontsultatu zalantzak eta aurkitu izapideak IA sortzailearen laguntzaz.',
      button: 'Agentea ekin',
      widgetPlaceholder: 'Idatzi zure kontsulta',
    },
    searchResults: {
      resultsCount: 'Gutxi gorabehera {count} emaitza',
      summaryTitle: 'IAk Sortutako Laburpena',
      errorTitle: 'Bilaketa Errorea',
      errorCheckList: 'Ziurtatu hauek duzula:',
      errorItem1: 'VITE_GCLOUD_ACCESS_TOKEN ingurune aldagaia konfiguratuta',
      errorItem2: 'Google Cloud kredentzial baliagarriak',
      errorItem3: 'CORS konfigurazio egokia (produkziorako)',
      noResults: 'Ez da emaitzarik aurkitu',
      noResultsMessage: 'Saiatu hitz gako desberdinak erabiliz edo ortografia egiaztatuz.',
      openInNewTab: 'Ireki leiho berrian',
    },
  },
  en: {
    header: {
      title: 'Intelligent Citizen Procedures Search Engine',
    },
    main: {
      heading: 'Search in Egoitza Araba',
      subheading: 'Discover information in all indexed content from the Provincial Council of Álava',
    },
    searchBar: {
      placeholder: 'Search procedures, formalities...',
      button: 'Search',
    },
    assistant: {
      title: 'Procedures Assistant',
      description: 'Ask questions and find procedures with the help of generative AI.',
      button: 'Chat with the Agent',
      widgetPlaceholder: 'Write your query',
    },
    searchResults: {
      resultsCount: 'Approximately {count} results for',
      summaryTitle: 'AI-Generated Summary',
      errorTitle: 'Search Error',
      errorCheckList: 'Make sure you have:',
      errorItem1: 'Configured the VITE_GCLOUD_ACCESS_TOKEN environment variable',
      errorItem2: 'Valid Google Cloud credentials',
      errorItem3: 'Proper CORS configuration (for production)',
      noResults: 'No results found',
      noResultsMessage: 'Try different keywords or check your spelling.',
      openInNewTab: 'Open in new tab',
    },
  },
};

export type Language = keyof typeof translations;

export const getTranslation = (lang: Language) => translations[lang] || translations.es;
