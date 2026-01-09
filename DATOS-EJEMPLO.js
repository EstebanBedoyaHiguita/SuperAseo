/**
 * EJEMPLOS DE DATOS PARA SUPERASEO
 * Copiar y pegar en MongoDB si no aparecen automáticamente
 */

// Productos de ejemplo (formato JSON)
[
  {
    "nombre": "Desinfectante Multiusos",
    "descripcion": "Desinfectante potente para limpiar y desinfectar múltiples superficies del hogar. Elimina 99.9% de bacterias y virus. Aroma fresco a limón. Perfecto para pisos, mesas, baños y cocina. No deja residuos y es seguro para uso en hogares con niños y mascotas.",
    "categoria": "Desinfectantes",
    "variaciones": [
      {
        "tamaño": "500ml",
        "valor": 8500,
        "imagen": "desinfectante-500ml.jpg"
      },
      {
        "tamaño": "1000ml",
        "valor": 14500,
        "imagen": "desinfectante-1000ml.jpg"
      }
    ]
  },
  {
    "nombre": "Limpiador de Pisos",
    "descripcion": "Limpiador especializado para pisos de cerámica y mármol. Deja un brillo impecable sin dejar residuos. Fórmula concentrada que rinde más. Aroma agradable. Fácil de aplicar. Protege y cuida tus pisos manteniéndolos siempre relucientes.",
    "categoria": "Limpiadores",
    "variaciones": [
      {
        "tamaño": "750ml",
        "valor": 9500,
        "imagen": "piso-750ml.jpg"
      },
      {
        "tamaño": "1500ml",
        "valor": 16000,
        "imagen": "piso-1500ml.jpg"
      }
    ]
  },
  {
    "nombre": "Jabón Líquido para Manos",
    "descripcion": "Jabón líquido suave y espumoso para lavar manos. Dermatológicamente probado, humecta la piel. Disponible en varios aromas. Ideal para baños y cocinas. Elimina gérmenes sin resecar la piel. Apto para toda la familia.",
    "categoria": "Jabones",
    "variaciones": [
      {
        "tamaño": "250ml",
        "valor": 4500,
        "imagen": "jabon-250ml.jpg"
      },
      {
        "tamaño": "500ml",
        "valor": 7500,
        "imagen": "jabon-500ml.jpg"
      }
    ]
  },
  {
    "nombre": "Limpiavidrios",
    "descripcion": "Limpiavidrios sin manchas que deja cristales y espejos impecables. Seca rápidamente y no deja residuos. Fórmula anti-empañante. Ideal para ventanas, espejos y surfaces de vidrio. Resultado profesional en casa.",
    "categoria": "Limpiadores",
    "variaciones": [
      {
        "tamaño": "500ml",
        "valor": 7000,
        "imagen": "vidrios-500ml.jpg"
      },
      {
        "tamaño": "1000ml",
        "valor": 12000,
        "imagen": "vidrios-1000ml.jpg"
      }
    ]
  },
  {
    "nombre": "Cloro Desinfectante",
    "descripcion": "Cloro concentrado para desinfectar superficies y blanquear. Ideal para pisos, baños y lavandería. Acción rápida contra hongos y bacterias. Potente formula que elimina manchas rebeldes. Uso versátil en el hogar.",
    "categoria": "Desinfectantes",
    "variaciones": [
      {
        "tamaño": "1000ml",
        "valor": 6500,
        "imagen": "cloro-1000ml.jpg"
      },
      {
        "tamaño": "2000ml",
        "valor": 11000,
        "imagen": "cloro-2000ml.jpg"
      }
    ]
  },
  {
    "nombre": "Detergente Líquido",
    "descripcion": "Detergente líquido concentrado para lavadora. Elimina manchas difíciles. Aroma duradero. Dosificación eficiente. Cuida tus prendas mientras las deja impecablemente limpias. Apto para agua fría y caliente.",
    "categoria": "Detergentes",
    "variaciones": [
      {
        "tamaño": "1000ml",
        "valor": 10000,
        "imagen": "detergente-1000ml.jpg"
      },
      {
        "tamaño": "2000ml",
        "valor": 18000,
        "imagen": "detergente-2000ml.jpg"
      }
    ]
  },
  {
    "nombre": "Removedor de Manchas",
    "descripcion": "Removedor potente para manchas rebeldes en ropa y tapicería. Acción rápida y efectiva. Seguro para colores. Ideal para usar antes del lavado. Resultados visibles en minutos.",
    "categoria": "Limpiadores",
    "variaciones": [
      {
        "tamaño": "300ml",
        "valor": 8000,
        "imagen": "manchas-300ml.jpg"
      },
      {
        "tamaño": "600ml",
        "valor": 14000,
        "imagen": "manchas-600ml.jpg"
      }
    ]
  },
  {
    "nombre": "Suavizante de Ropa",
    "descripcion": "Suavizante concentrado con aroma floral duradero. Suaviza y perfuma la ropa. Compatible con todas las fibras. Deja prendas sedosas y aromáticas. Rinde muchas cargas.",
    "categoria": "Detergentes",
    "variaciones": [
      {
        "tamaño": "800ml",
        "valor": 9000,
        "imagen": "suavizante-800ml.jpg"
      },
      {
        "tamaño": "1600ml",
        "valor": 16000,
        "imagen": "suavizante-1600ml.jpg"
      }
    ]
  },
  {
    "nombre": "Desengrasante Potente",
    "descripcion": "Desengrasante concentrado para cocina y superficies. Elimina grasa acumulada. Fórmula ecológica. Seguro para todas las superficies. Aroma cítrico refrescante. Efectivo y económico.",
    "categoria": "Limpiadores",
    "variaciones": [
      {
        "tamaño": "500ml",
        "valor": 7500,
        "imagen": "desengrasante-500ml.jpg"
      },
      {
        "tamaño": "1000ml",
        "valor": 13000,
        "imagen": "desengrasante-1000ml.jpg"
      }
    ]
  },
  {
    "nombre": "Ambientador Spray",
    "descripcion": "Ambientador en spray con aromas naturales. Elimina olores desagradables. Acción instantánea. Disponible en múltiples aromas. Ideal para todas las habitaciones. Fresco y duradero.",
    "categoria": "Otros",
    "variaciones": [
      {
        "tamaño": "200ml",
        "valor": 5500,
        "imagen": "ambientador-200ml.jpg"
      },
      {
        "tamaño": "400ml",
        "valor": 9500,
        "imagen": "ambientador-400ml.jpg"
      }
    ]
  }
]

// NOTAS IMPORTANTES:
// - Estos datos se cargan automáticamente en MongoDB la primera vez que ejecutas npm start
// - Si necesitas resetear los datos:
//   1. Elimina todos los documentos de la colección "productos"
//   2. Ejecuta npm start de nuevo
//   3. Los datos se recrearán automáticamente

// - Para agregar imágenes:
//   1. Coloca los archivos en: /public/assets/images/
//   2. En el admin, ingresa el nombre exacto del archivo
//   3. Ej: desinfectante-500ml.jpg

// - Formatos de imagen soportados: jpg, jpeg, png, gif, webp
// - Tamaño recomendado: 400x400px (mínimo) a 800x800px (máximo)
// - Peso máximo: 2MB por imagen
