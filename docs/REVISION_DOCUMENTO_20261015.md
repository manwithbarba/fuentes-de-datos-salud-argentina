# Ampliación del catálogo y evaluación de fuentes

Fecha: 15 de octubre de 2026. Catálogo del sitio: 84 referencias (16 incorporaciones). El inventario JSON contiene 81 referencias; el sitio agrega tres fuentes complementarias de población, geografía y contexto.

## Estrategia

Se extrajeron instituciones y recursos del documento suministrado, se compararon con el inventario previo y se buscaron publicaciones institucionales para los faltantes. Se registró el tipo de publicación localizada y se separó de la comprobación técnica del archivo. No se tomaron como hechos los recuentos de recursos, las API o las licencias generales mencionadas sin evidencia por recurso. La búsqueda municipal y académica es dirigida y exploratoria, no un censo.

## Incorporaciones

N21 ANMAT; N22 ReNIS; N23 ROHA; N24 Sistema Nacional de Datos Genómicos; M09 Vicente López; M10 Luján; M11 Luján de Cuyo; U07 Poblaciones; U08 Trovare; U09 ISALUD; O08 Bunge y Born; O09 CIIPS; O10 CIPPEC; O11 Soberanía Sanitaria; O12 OPS; O13 BVS. Las URL institucionales y las comprobaciones pendientes se registran en fuentes.json y site/catalog.js.

## Precisiones respecto del documento

- ReNIS describe investigaciones: no acredita acceso a datos de participantes.
- ROHA es un registro hospitalario pediátrico; sus informes no acreditan apertura de registros individuales ni incidencia poblacional.
- SISA y la existencia de SNVS o NOMIVAC no implican acceso público a sus bases individuales. No se incorporaron como microdatos abiertos.
- Poblaciones y el índice de Bunge y Born comparten antecedentes; no deben contarse como evidencia independiente. La publicación consultada refiere a información de 2010–2018.
- Trovare se conserva como referencia institucional: su mención en documentación del Hospital Italiano no equivale a confirmar conjuntos descargables. ISALUD y BVS son vías documentales.
- CIPPEC y Soberanía Sanitaria se incorporaron como informes; no se confirmó una base estructurada asociada.
- Argendata permanece como fuente complementaria: sus contenidos demográficos no acreditan un catálogo sanitario integral.
- No se atribuyen API, licencias ni formatos a todos los portales por pertenecer a una plataforma. El catálogo de Vicente López anuncia exportaciones y ODbL; no se ejecutaron descargas ni se comprobó una API sin credenciales.
- CKAN package_show, Dataverse Search y OAI-PMH permiten consultar metadatos. La disponibilidad de datos requiere comprobar recursos y permisos individualmente.

## Ajuste de interfaz

Se retiraron la solapa de evaluación, el formulario y los botones asociados a solicitud del usuario. Se conservan las fuentes incorporadas y la documentación metodológica del relevamiento.

## Referencias metodológicas

- Guía nacional de metadatos: https://datosgobar.github.io/paquete-apertura-datos/guia_metadatos/
- CKAN API: https://docs.ckan.org/en/latest/api/
- Dataverse Search API: https://guides.dataverse.org/en/latest/api/search.html
- OAI-PMH: https://www.openarchives.org/OAI/openarchivesprotocol.html

## Validación

Se ejecutaron los recorridos automatizados de selección y restricciones territoriales, poblacionales y de desagregación. Se agregaron casos para los municipios nuevos y referencias documentales. Esta validación corresponde al funcionamiento de la página, no a la calidad de los datos de terceros.

## Modalidades de acceso

Se agregaron métodos de acceso por referencia, permitiendo más de uno por fuente: API, archivo directo, descarga desde página, consulta web, catálogo o modalidad por confirmar. Los formatos y URL se registran separadamente. Se incorporaron filtros por modalidad y formato, detalles de consulta y estos campos al informe exportado.

Evidencia institucional: https://www.argentina.gob.ar/salud/transparencia/datosabiertos (JSON/XLSX del catálogo; consulta agotó el tiempo de respuesta); https://www.argentina.gob.ar/salud/deis/datos/defunciones (CSV agrupados por año); https://datos.entrerios.gov.ar/acerca/ckan (API de metadatos, ejemplos del portal nacional; plantilla provincial no ejecutada); https://www.argentina.gob.ar/georef/ejemplos-de-uso y https://www.argentina.gob.ar/georef/descarga-de-la-base-completa (consultas y archivos completos). Se preserva el estado desconocido para modalidades y formatos no documentados.
