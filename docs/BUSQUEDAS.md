# Registro de búsqueda y límites

Fecha: 2026-10-15, contexto horario America/Argentina/Buenos_Aires. Método: buscador web, apertura de páginas públicas y seguimiento de enlaces. Se priorizaron fuentes primarias oficiales y repositorios de sus autores. No se usó una API exhaustiva de búsqueda de GitHub; la indexación puede omitir repositorios recientes o poco visibles. No se registran totales de resultados porque no equivalen al universo real.

## Consultas ejecutadas

```text
github argentina datos abiertos awesome datasets investigación
Argentina repositorio datos investigación RDA datos primarios SND repositorios
github "argentina" "datasets" "awesome" datos
github argentina datos ardata R eph datosgobar pyArgentina
github "Argentina" "data" "datasets" curados normalizados
github "ropensci" "eph"
github "datasets-argentina"
DACyTAr datos CONICET repositorio datos investigación
site.indec.gob.ar bases de datos microdatos EPH censo 2022
site.argentina.gob.ar salud deis datos estadísticas vitales
site.bcra.gob.ar APIs estadísticas monetarias
site.ign.gob.ar datos abiertos geográficos descarga
site.argentina.gob.ar educación datos abiertos anuario estadístico
site.smn.gob.ar descarga datos meteorológicos
site.argentina.gob.ar energía datos abiertos
site.datos.jus.gob.ar datos abiertos justicia
site.argentina.gob.ar normativa ley 25326 datos personales texto
site.argentina.gob.ar normativa ley 26899 repositorios digitales texto
site.argentina.gob.ar datos abiertos agricultura estimaciones agrícolas
site.argentina.gob.ar elecciones datos abiertos resultados electorales
site.idera.gob.ar catálogo geoservicios
site.datosabiertos.ambiente.gob.ar
site.datosabiertos.enacom.gob.ar
site.argentina.gob.ar transporte datos abiertos
site.github.com Argentina hub datos investigación parquet duckdb
site.github.com "awesome-argentina" datos
site.github.com "datasets-argentina" datos
site.github.com "argendataR"
```

## Criterios de selección

Incluir antecedentes con datos argentinos, código de acceso/procesamiento o agregación de datos científicos. Incluir fuentes oficiales con contenido relevante para al menos una familia temática. Diferenciar biblioteca, catálogo, archivo de datos, servicio y depósito científico. Excluir de la evidencia final publicaciones de redes sociales, resultados sin vínculo primario verificable y datasets internacionales sin cobertura argentina pertinente. Resultados de redes sociales se usaron solo para descubrir nombres y luego visitar sus repositorios.

## Documentos abiertos y decisiones

- Chile Hub: README y enlaces de licencias, procedencia y redistribución; usar como referencia de diseño, sin certificar ejecución.
- Argendata: repositorio de datos, organización y ArgendataR; antecedente transversal prioritario.
- eph y pyeph: herramientas sectoriales; revisar compatibilidad antes de reutilizar.
- Argly: API y conectores como antecedente; no tomar sus datos como autoridad primaria automática.
- PetroDB: documentación de tablas argentinas y repositorio; antecedente sectorial Parquet/DuckDB.
- Datos Argentina: organización y paquete de apertura; referencias para metadatos y herramientas.
- Fuentes oficiales sectoriales, científicas y normativas: enlaces individualizados en el informe.
- FAIR y DataCite: referencias para diseño propuesto; no se declara certificación ni depósito realizado.

## Accesos incompletos

La herramienta devolvió error interno al abrir directamente https://dacytar.mincyt.gob.ar/, https://data.buenosaires.gob.ar/ y https://datos.santafe.gov.ar/. Tampoco pudo abrir las rutas generales /datos-abiertos/georef y /datos-abiertos/series-de-tiempo de Argentina.gob.ar; se usaron referencias oficiales específicas de documentación. Estos resultados no prueban indisponibilidad pública del servicio. PBA y Mendoza devolvieron portadas con texto limitado; no se enumeraron sus recursos.

## Trabajo técnico aún no realizado

No hay capturas binarias de originales, hashes de datasets, recuentos de filas, pruebas de endpoints ni auditoría completa de licencias. No se fijaron SHAs de los repositorios ajenos. Las referencias a ramas main/master son mutables. Antes de reutilizar código, fijar commit, registrar licencia de esa revisión y ensayar sus pruebas. Antes de publicar un dataset, completar recurso exacto, original verificable, licencia y perfil de calidad.

## Cómo actualizar la búsqueda

1. Repetir consultas iniciales y agregar sinónimos por disciplina, institución y jurisdicción.
2. Complementar con búsqueda de repositorios en GitHub, nombres alternativos y sitios institucionales.
3. Registrar consultas nuevas, fecha, candidatos, razones de inclusión/exclusión y evidencia primaria.
4. Recorrer las 24 jurisdicciones y familias temáticas con una matriz de cobertura.
5. Comprobar las limitaciones de acceso en un segundo canal autorizado y registrar resultado sin eliminar el anterior.
6. Publicar una nueva edición del relevamiento con diferencias, sin presentar una ausencia de resultados como prueba absoluta de inexistencia.

## Ampliación sanitaria y multiescala — 2026-10-15

A pedido del usuario se sustituyó el foco general por salud, con demografía y economía complementarias. Se amplió a niveles nacional, provincial, municipal, académico y civil. El inventario conserva niveles de evidencia: recurso anunciado, visualización/informe, catálogo y referencia institucional. No hay pruebas técnicas de descarga ni certificación de permisos.

Consultas adicionales ejecutadas (texto de búsqueda):

```text
site.argentina.gob.ar salud datos abiertos SISA REFES recursos establecimientos
site.argentina.gob.ar salud bancos recursos investigación salud datos abiertos DEIS
site.datos.gob.ar salud vacunas epidemiologia
Argentina repositorio github datos salud DEIS investigación
site.argentina.gob.ar salud banco encuestas ENFR ENNyS EMSE bases datos
site.argentina.gob.ar salud boletin epidemiologico nacional datos
site.datos.salud.gob.ar dataset coberturas vacunacion
site.argentina.gob.ar incucai datos abiertos inc anmat datos
site.argentina.gob.ar "ENNyS" "base"
site.argentina.gob.ar "EMSE" "datos"
site.argentina.gob.ar "cáncer" "SIVER" datos
site.argentina.gob.ar "salud" "egresos hospitalarios" datos
site.datos.salud.gob.ar "Encuesta Nacional" "Nutrición"
site.datos.salud.gob.ar "Factores de Riesgo"
site.argentina.gob.ar "superintendencia" "datos abiertos" salud
site.argentina.gob.ar "ANMAT" "datos abiertos"
datos abiertos salud provincias argentina Córdoba Santa Fe Mendoza Entre Ríos Neuquén
datos abiertos salud municipal Rosario Bahia Blanca Buenos Aires hospitales
universidad argentina repositorio datos investigación salud datos abiertos
fundación argentina datos abiertos salud indicadores FIC FUNCEI IECS
salud datos abiertos Catamarca Chaco Chubut Corrientes Formosa
salud datos abiertos Jujuy La Pampa La Rioja Misiones
salud datos abiertos Neuquén Río Negro Salta San Juan San Luis
salud datos abiertos Santa Cruz Santiago del Estero Tierra del Fuego Tucumán
site.santafe.gov.ar datos abiertos salud
site.cba.gov.ar datos abiertos salud estadísticas
site.entrerios.gov.ar datos abiertos salud
site.buenosaires.gob.ar datos abiertos salud hospitales
site.edu.ar "datos" "salud" "repositorio de datos"
site.edu.ar "dataverse" "salud"
site.ficargentina.org "datos" tablero
site.huesped.org.ar "datos" informes epidemiológicos
UNLP repositorio datos investigación salud SEDICI datos primarios
Universidad Nacional Rosario repositorio datos académicos salud RDA
Universidad Nacional Córdoba repositorio datos investigación salud
UBA repositorio datos investigación salud
site.catamarca.gob.ar salud estadísticas datos abiertos
site.corrientes.gob.ar salud estadísticas datos abiertos
site.formosa.gob.ar salud estadísticas datos abiertos
site.lapampa.gob.ar salud estadísticas datos abiertos
Catamarca estadística salud anuario sitio oficial
La Rioja datos abiertos salud estadística sitio oficial
San Juan datos abiertos salud estadística sitio oficial
San Luis datos abiertos salud estadística sitio oficial
site.estadistica.tierradelfuego.gob.ar salud
site.santacruz.gob.ar salud estadísticas datos
site.sde.gob.ar estadística salud
site.rionegro.gov.ar salud estadísticas
site.estadistica.jujuy.gob.ar salud
site.larioja.gob.ar estadística salud
site.estadistica.catamarca.gob.ar salud
site.msalsgo.gob.ar estadística salud
site.unc.edu.ar "repositorio" "datos" salud
site.uba.ar "repositorio" "datos" salud
site.datosabiertos.unl.edu.ar salud
municipal datos abiertos salud Mar del Plata La Plata Santa Fe Godoy Cruz
site.datos.santafe.gov.ar/dataset "Efectores de salud"
site.iecs.org.ar datos tabaco carga enfermedad
site.cedes.org salud datos observatorio
site.datos.pami.org.ar
"Catamarca" "salud" "anuario" "estadistica"
"Santiago del Estero" "salud" "estadística" datos sitio oficial
"Jujuy" "salud" "dipec"
"Tucumán" "estadísticas vitales" sitio oficial
site.datos.unlp.edu.ar "salud"
site.dataverse.unr.edu.ar "Chagas"
site.mardelplata.gob.ar datos abiertos salud
site.santafeciudad.gov.ar datos abiertos salud
```

Se siguieron páginas concretas de FIC, UNLP, UNR, Rosario, Mendoza, Neuquén, Córdoba municipal, Godoy Cruz, La Rioja y Salud PBA, entre otras referencias. La ficha de egresos PBA no pudo abrirse directamente por la herramienta. Tampoco abrieron dos DOI de UNR ni el publicador de Catamarca indicado por un catálogo bibliográfico oficial. Los DOI y descripciones se encontraron en el catálogo de UNR; no se verificaron archivos.

La portada de datos.salud.gob.ar falló en una apertura, pero una ruta indexada con parámetro devolvió contenido y se localizaron fichas individuales. La portada de CABA y Santa Fe había fallado antes; búsquedas específicas recuperaron fichas/catálogos. Por eso no se etiquetan esos portales como caídos.

Las búsquedas generales devolvieron homónimos de La Rioja española, San Luis Potosí y San Juan fuera de Argentina. Fueron excluidos. Los resultados sobre universidades colombianas y otras instituciones extranjeras también se excluyeron. Publicaciones académicas sin archivo de datos se clasifican como referencia, no dataset.

### Cobertura de esta edición

65 registros de fuentes/recursos: 20 nacionales o especializados, 24 jurisdiccionales, 8 municipales, 6 académicos y 7 civiles/de investigación. No son 65 portales independientes ni datasets validados. Solo 6 registros académicos no representan todo el sistema universitario. Tampoco la selección municipal ni civil es exhaustiva. El registro incluye pistas débiles explícitas para no convertir ausencia de confirmación en afirmación de inexistencia.
