/* Reglas editoriales de orientación. No certifican acceso, licencia o comparabilidad. */
(function (root) {
  'use strict';
  const topics = {
    vital: {label:'Defunciones, causas de muerte y nacimientos', ids:['N02','J02','J05','J09','J10','J11','J12','J15','J16','J23','J24','O07']},
    risk: {label:'Factores de riesgo y estado nutricional', ids:['N05','N06','N07','O01','O02']},
    vaccine: {label:'Dosis y coberturas de vacunación', ids:['N08','N09','N15','N10']},
    surveillance: {label:'Enfermedades notificadas y registros específicos', ids:['N10','N11','N12','N13','M02','J18','J23','J16']},
    services: {label:'Establecimientos, prestaciones y recursos sanitarios', ids:['N03','N14','N15','N17','J01','J02','J04','J05','J06','J13','J14','J15','J16','J17','J21','M01','M03','M04','M06']},
    access: {label:'Cobertura de salud y financiación', ids:['N05','N15','N16','N17','J01','J07','J10','J12','J19','M03','O05']},
    medicine: {label:'Medicamentos: precios, cobertura y utilización', ids:['N15','O03']},
    research: {label:'Datos de estudios clínicos y biomédicos', ids:['N18','N19','N20','U01','U02','U03','U04','U05','U06','O04']}
  };
  const provinces=['CABA','Buenos Aires','Catamarca','Chaco','Chubut','Córdoba','Corrientes','Entre Ríos','Formosa','Jujuy','La Pampa','La Rioja','Mendoza','Misiones','Neuquén','Río Negro','Salta','San Juan','San Luis','Santa Cruz','Santa Fe','Santiago del Estero','Tierra del Fuego','Tucumán'];
  const cities={M01:'Santa Fe',M02:'Santa Fe',M03:'Córdoba',M04:'Buenos Aires',M05:'Mendoza',M06:'Buenos Aires',M07:'Santa Fe',M08:'Chubut'};
  const microIds=['N05','N06','N07','U03','U04'];
  const populationLimited={N23:'child',N05:'adult',N07:'school',N15:'older',N06:'all',U03:'adult',U04:'experimental'};
  // Clasifica la publicación localizada, no la calidad ni la validación del dato.
  const stateLabels={D:'Ficha de datos',V:'Informe o visualizador',C:'Catálogo',I:'Referencia institucional'};
  function sourceProvince(source) {
    if(source.id.startsWith('J')) return provinces[Number(source.id.slice(1))-1];
    return source.geographic_coverage || cities[source.id] || null;
  }
  function recommend(answers,catalog) {
    if(!topics[answers.topic]) throw new Error('Tema inválido');
    if(!['all','child','school','adult','older','experimental'].includes(answers.population)) throw new Error('Población inválida');
    if(!['national','province','municipal'].includes(answers.scale)) throw new Error('Escala inválida');
    if(answers.scale!=='national'&&!provinces.includes(answers.province)) throw new Error('Provincia requerida');
    const candidates=[];
    for(const source of catalog){
      if(!topics[answers.topic].ids.includes(source.id) && !source.topics?.includes(answers.topic)) continue;
      const local=sourceProvince(source);
      if(local && (answers.scale==='national'||local!==answers.province)) continue;
      let score=source.priority==='P0'?30:15;
      if(local)score+=25;
      if(source.evidence_status==='D')score+=15;
      let reason=local?`Fuente de ${local} relacionada con ${topics[answers.topic].label.toLowerCase()}.`:`Fuente nacional o especializada relacionada con ${topics[answers.topic].label.toLowerCase()}.`;
      const caveats=[];
      let alternative=source.reference_only || ['C','I'].includes(source.evidence_status);
      if(source.reference_only)caveats.push('Referencia documental: no se confirmó una base estructurada reutilizable.');
      if(source.id==='O07'){alternative=true;caveats.push('Compilación derivada de DEIS; ambos recursos no constituyen evidencia independiente.');}
      const limited=populationLimited[source.id];
      if(limited&&limited!=='all'&&answers.population!==limited&&answers.population!=='all'){
        alternative=true;caveats.push(`Su universo específico (${limited==='child'?'población pediátrica':limited==='school'?'población escolar':limited==='older'?'afiliados PAMI; no toda la población mayor':limited==='adult'?'población adulta; verificar edades elegibles':'experimentación animal'}) no coincide con la población elegida.`);
      }
      if(source.id==='U04'&&answers.population!=='experimental') {alternative=true;caveats.push('Datos experimentales en animales: no permiten estimar indicadores de población humana.');}
      if(answers.population==='experimental'&&!source.id.startsWith('U')){alternative=true;caveats.push('Esta fuente no acredita un conjunto de datos de experimentación.');}
      if(answers.data==='micro'&&!microIds.includes(source.id)){alternative=true;caveats.push('No se confirmó acceso a registros individuales en esta fuente.');}
      if(answers.data==='micro'&&microIds.includes(source.id))caveats.push('Base individual anunciada: confirmar acceso, variables, anonimización y condiciones por archivo.');
      if(answers.scale==='municipal'&&!source.id.startsWith('M'))caveats.push('El detalle municipal no está confirmado; verificar geografía antes de seleccionar el recurso.');
      if(answers.scale==='province'&&!local)caveats.push('Confirmar desagregación y representatividad para la jurisdicción elegida.');
      if(source.id==='N15')caveats.push('El universo es PAMI; no representa automáticamente a toda la población.');
      if(source.id==='N12')caveats.push('Registro hospitalario: no equivale a incidencia poblacional nacional.');
      if(['O02','O03'].includes(source.id))caveats.push('Puede contener resultados modelados: distinguir estimaciones de observaciones.');
      if(['N05','N06','N07'].includes(source.id))caveats.push('Conservar diseño muestral, ponderadores y universo de la edición seleccionada.');
      candidates.push({...source,score,reason,caveats,alternative});
    }
    candidates.sort((a,b)=>b.score-a.score||a.id.localeCompare(b.id));
    const primary=candidates.filter(s=>!s.alternative);
    const alternatives=candidates.filter(s=>s.alternative);
    const support=catalog.filter(s=>s.source_type==='support'&&
      (s.id==='S01'||(s.id==='S02'&&['rate','map','association'].includes(answers.analysis))||(s.id==='S03'&&answers.analysis==='association')));
    const requirements=[{title:'Identificación del recurso',text:'La selección definitiva requiere especificar período, universo, diccionario, licencia y versión, y registrar la fecha de extracción.'}];
    const byAnalysis={
      count:{title:'Unidad de observación',text:'Los recuentos de personas, eventos, consultas, egresos y establecimientos requieren definiciones diferenciadas y control de duplicados y cobertura.'},
      rate:{title:'Población de referencia y denominadores',text:'Numerador y denominador deben corresponder a la misma población, edades, territorio y período. La estandarización requiere documentar el método y la población estándar.'},
      trend:{title:'Comparabilidad temporal',text:'Deben documentarse cambios de definición, padrón, cuestionario y notificación, así como revisiones retrospectivas de las series.'},
      association:{title:'Vinculación y diseño analítico',text:'La vinculación requiere compatibilidad de unidades, períodos y territorios. Las encuestas independientes no permiten vinculación individual directa; una asociación territorial no demuestra causalidad individual.'},
      map:{title:'Referencia geográfica',text:'Deben comprobarse códigos, límites vigentes, escala, coordenadas y sistema de referencia espacial, y cuantificarse los registros sin localización.'}
    };
    if(byAnalysis[answers.analysis])requirements.push(byAnalysis[answers.analysis]);
    if(answers.data==='micro')requirements.push({title:'Acceso y protección de datos',text:'La utilización de registros individuales requiere comprobar la modalidad de acceso, las condiciones de tratamiento y los requisitos éticos e institucionales aplicables.'});
    const warnings=[];
    if(answers.scale==='municipal')warnings.push('La cobertura municipal del catálogo es exploratoria. Las fuentes identificadas en la provincia pueden no incluir el municipio de interés.');
    if(!primary.length)warnings.push('No hay una fuente principal confirmada documentalmente para esta combinación. Las alternativas orientan la búsqueda; no garantizan datos adecuados.');
    return {primary,alternatives,support,requirements,warnings};
  }
  root.HealthGuide={topics,provinces,stateLabels,sourceProvince,recommend};
})(globalThis);
