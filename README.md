# Fuentes de datos para investigación en salud

Repositorio de enlaces a fuentes de acceso público en Argentina.

Sitio estático para localizar fuentes según información requerida, población, ámbito geográfico, objetivo y desagregación. Incluye 84 referencias: 81 del inventario y tres fuentes complementarias.

El catálogo permite filtrar por institución, modalidad de acceso y formato. Las fichas distinguen API de datos y metadatos, enlaces a archivos, descargas desde páginas y referencias institucionales. Los ejemplos no comprobados y los formatos pendientes se identifican por recurso.

## Uso

Abrir index.html en un navegador. No requiere instalación ni compilación. Para GitHub Pages, publicar la rama main desde la raíz.

## Documentación

- [Inventario](fuentes.json).
- [Relevamiento de portales](docs/PORTALES_SALUD.md).
- [Registro de búsquedas](docs/BUSQUEDAS.md).
- [Revisión y ampliación](docs/REVISION_DOCUMENTO_20261015.md).

Fecha del relevamiento documental: 15 de octubre de 2026. El catálogo no verifica disponibilidad externa en tiempo real. La selección requiere comprobar cobertura, metodología y condiciones de uso del recurso concreto.

## Mantenimiento

El sitio utiliza HTML, CSS y JavaScript. catalog.js contiene las referencias; engine.js implementa la selección; app.js presenta preguntas, filtros e informes. Las nuevas referencias pueden asignar temas mediante topics y restricciones territoriales mediante geographic_coverage.

Comprobar las reglas con node tests/recommendations.cjs.

Los datos enlazados pertenecen a sus respectivos publicadores y se rigen por sus condiciones de uso.
