(function(){
  'use strict';
  const guide=HealthGuide,catalog=HEALTH_CATALOG.sources;
  const labels={population:{all:'Población general',child:'Niñez y primera infancia',school:'Adolescentes y población escolar',adult:'Personas adultas',older:'Personas mayores',experimental:'Modelos experimentales'},scale:{national:'Nacional',province:'Provincial o CABA',municipal:'Municipal o local'},analysis:{count:'Descripción de frecuencias',rate:'Tasas o prevalencias',trend:'Tendencias temporales',association:'Desigualdades y asociaciones',map:'Distribución territorial'},data:{aggregate:'Datos agregados',micro:'Registros individuales o microdatos',any:'Sin especificar'}};
  let step=0,answers={},lastResult=null;
  const $=id=>document.getElementById(id);
  const esc=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const questions=[
    {key:'topic',short:'Información requerida',title:'¿Qué información necesita?',description:'',options:Object.entries(guide.topics).map(([value,t])=>[value,t.label,''])},
    {key:'population',short:'Población',title:'¿Cuál es la población de referencia?',description:'Considere el universo de estudio, no únicamente la disponibilidad de datos.',options:Object.entries(labels.population).map(([value,label])=>[value,label,value==='experimental'?'Animales de experimentación, estudios in vitro y modelos preclínicos.':''])},
    {key:'scale',short:'Ámbito geográfico',title:'¿Cuál es el ámbito geográfico de interés?',description:'',options:Object.entries(labels.scale).map(([value,label])=>[value,label,value==='municipal'?'La búsqueda local se organiza por provincia.':''])},
    {key:'analysis',short:'Objetivo',title:'¿Con qué objetivo?',description:'',options:Object.entries(labels.analysis).map(([value,label])=>[value,label,({count:'Recuentos de personas, eventos o servicios.',rate:'Estimación de indicadores poblacionales.',trend:'Comparación entre períodos.',association:'Relaciones entre condiciones sociales y resultados sanitarios.',map:'Localización y comparación de áreas.'})[value]])},
    {key:'data',short:'Desagregación',title:'¿Con qué nivel de desagregación?',description:'',options:Object.entries(labels.data).map(([value,label])=>[value,label,value==='micro'?'Observaciones individuales; pueden estar sujetas a acceso controlado.':value==='aggregate'?'Tabulados, recuentos e indicadores.':''])}
  ];
  function showView(view){
    for(const name of ['guide','catalog','method']){$(`${name}-view`).hidden=name!==view;$(`${name}-tab`).classList.toggle('active',name===view);$(`${name}-tab`).setAttribute('aria-current',name===view?'page':'false');}
    if(view==='catalog')renderCatalog();
  }
  function renderQuestion(focus=false){
    const q=questions[step];
    $('guide-view').classList.remove('results-active');
    $('wizard').hidden=false;$('results').hidden=true;
    $('steps').innerHTML=questions.map((item,i)=>`<li class="${i===step?'current':i<step?'done':''}" ${i===step?'aria-current="step"':''}><span class="step-number">${i<step?'✓':i+1}</span><span class="step-name">${esc(item.short)}</span></li>`).join('');
    $('step-label').textContent=`PASO ${step+1} DE ${questions.length}`;$('progress-bar').style.width=`${(step+1)/questions.length*100}%`;
    $('question-content').innerHTML=`<fieldset><legend><h2 id="question-title" tabindex="-1">${esc(q.title)}</h2></legend>${q.description?`<p class="question-description">${esc(q.description)}</p>`:''}<div class="options">${q.options.map(([value,label,description])=>`<label class="option"><input type="radio" name="${q.key}" value="${value}" ${answers[q.key]===value?'checked':''}><span><strong>${esc(label)}</strong>${description?`<small>${esc(description)}</small>`:''}</span></label>`).join('')}</div></fieldset>${q.key==='scale'?`<div id="province-field"><label class="field-label" for="province">Provincia o jurisdicción</label><select id="province"><option value="">Seleccione una jurisdicción</option>${guide.provinces.map(p=>`<option value="${esc(p)}" ${answers.province===p?'selected':''}>${esc(p)}</option>`).join('')}</select><p class="question-description">La selección por provincia identifica fuentes locales candidatas; no acredita cobertura del municipio de interés.</p></div>`:''}`;
    $('back').disabled=step===0;$('next').innerHTML=step===questions.length-1?'Consultar resultados':'Continuar';$('form-error').textContent='';
    if(q.key==='scale')toggleProvince();
    if(focus)$('question-title').focus();
  }
  function toggleProvince(){const selected=document.querySelector('input[name="scale"]:checked');$('province-field').hidden=!selected||selected.value==='national';}
  $('question-form').addEventListener('change',()=>{if(step===2)toggleProvince();});
  $('question-form').addEventListener('submit',event=>{
    event.preventDefault();const q=questions[step],selected=document.querySelector(`input[name="${q.key}"]:checked`);
    if(!selected){$('form-error').textContent='Seleccione una opción.';return;}
    answers[q.key]=selected.value;
    if(q.key==='scale'){
      answers.province=selected.value==='national'?'':$('province').value;
      if(selected.value!=='national'&&!answers.province){$('form-error').textContent='Seleccione una provincia o CABA.';$('province').focus();return;}
    }
    if(step<questions.length-1){step++;renderQuestion(true);}else{renderResults();}
  });
  $('back').addEventListener('click',()=>{if(step>0){const selected=document.querySelector(`input[name="${questions[step].key}"]:checked`);if(selected)answers[questions[step].key]=selected.value;step--;renderQuestion(true);}});

  function accessDetails(s){return '<div class="access-details">'+(s.access_methods||[]).map(a=>'<p><b>'+esc(HEALTH_CATALOG.access_method_labels[a.type])+':</b> '+esc(a.label||a.scope||'')+(a.formats.length?' · '+esc(a.formats.join(', ')):' · Formato por confirmar')+'</p>'+(a.url?'<p><a href="'+esc(a.url)+'" target="_blank" rel="noopener noreferrer">Abrir archivo '+esc(a.formats.join('/'))+'</a></p>':'')+(a.query_template?'<details><summary>Formato de consulta</summary><pre><code>'+esc(a.method+' '+a.query_template)+'</code></pre><p>'+esc(a.parameters)+'</p><p>Autenticación: '+esc(a.authentication)+'</p></details>':'')+(a.note?'<p class="status-line">'+esc(a.note)+'</p>':'')+(a.documentation_url?'<p><a href="'+esc(a.documentation_url)+'" target="_blank" rel="noopener noreferrer">Documentación de acceso</a></p>':'')).join('')+'</div>';}
  function sourceCard(s){
    const state=guide.stateLabels[s.evidence_status]||'Fuente complementaria';
    return `<article class="source-card"><span class="badge ${['C','I','V'].includes(s.evidence_status)?'reference':''}">${esc(state)}</span><h3>${esc(s.name)}</h3><p>${esc(s.documented_content)}</p>${s.caveats?.length?`<ul>${s.caveats.map(c=>`<li>${esc(c)}</li>`).join('')}</ul>`:''}${accessDetails(s)}<p class="pending"><b>Aspectos que deben comprobarse:</b> ${esc(s.pending_validation)}</p><a class="source-link" href="${esc(s.evidence_url)}" target="_blank" rel="noopener noreferrer">Consultar la fuente <span aria-hidden="true">↗</span><span class="sr-only"> (abre en otra pestaña)</span></a><p class="status-line">Referencia: ${esc(s.id)}</p></article>`;
  }
  function section(title,sources,description=''){if(!sources.length)return '';return `<h2 class="section-title">${esc(title)} <small>(${sources.length})</small></h2>${description?`<p>${esc(description)}</p>`:''}<div class="source-grid">${sources.map(sourceCard).join('')}</div>`;}
  function answerSummary(){return [guide.topics[answers.topic].label,labels.population[answers.population],answers.scale==='national'?labels.scale.national:`${labels.scale[answers.scale]} · ${answers.province}`,labels.analysis[answers.analysis],labels.data[answers.data]];}
  function renderResults(){
    lastResult=guide.recommend(answers,catalog);$('wizard').hidden=true;$('results').hidden=false;
    $('guide-view').classList.add('results-active');
    const r=lastResult;
    $('results').innerHTML=`<div class="results-top"><div><span class="eyebrow">RESULTADOS DE LA CONSULTA</span><h1 id="results-title" tabindex="-1">Fuentes identificadas</h1></div><div class="result-actions"><button class="button secondary" id="edit">Modificar criterios</button><button class="button secondary" id="download">Exportar informe</button><button class="button primary" id="print">Imprimir / PDF</button></div></div><div class="brief">${answerSummary().map(a=>`<span class="chip">${esc(a)}</span>`).join('')}</div>${r.warnings.length?`<div class="notice">${r.warnings.map(w=>`<p>${esc(w)}</p>`).join('')}</div>`:''}${section('Fuentes de interés principal',r.primary,'')}${section('Fuentes complementarias',r.support,'Población de referencia, información geográfica y determinantes sociales.')}${section('Referencias para búsqueda adicional',r.alternatives,'Incluyen diferencias de universo o desagregación y recursos cuya disponibilidad requiere confirmación.')}<h2 class="section-title">Requisitos metodológicos</h2><div class="requirements">${r.requirements.map(item=>`<article class="card"><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p></article>`).join('')}</div>`;
    $('edit').onclick=()=>{step=0;renderQuestion(true);};$('download').onclick=download;$('print').onclick=()=>window.print();$('results-title').focus();
  }
  function download(){
    if(!lastResult)return;
    let content=`# Fuentes de datos para investigación en salud

Informe de selección · Argentina\n\nRelevamiento documental: 2026-10-15\nGenerado: ${new Date().toISOString()}\n\n## Criterios de consulta\n\n${answerSummary().map(a=>`- ${a}`).join('\n')}\n\n`;
    for(const [title,key] of [['Fuentes principales','primary'],['Complementarias','support'],['Alternativas','alternatives']]){
      content+=`## ${title}\n\n`;
      if(!lastResult[key].length)content+='Sin fuentes identificadas en esta categoría.\n\n';
      for(const s of lastResult[key])content+=`### ${s.name} (${s.id})\n\n${s.evidence_url}\n\nTipo de referencia: ${guide.stateLabels[s.evidence_status]||'Complementaria'}\n\n${s.reason||''}\n\n${s.documented_content}\n\n${(s.access_methods||[]).map(a=>HEALTH_CATALOG.access_method_labels[a.type]+' · '+(a.formats.join(', ')||'Formato por confirmar')+'\n'+(a.url||a.query_template||a.documentation_url)+'\n'+(a.note||'')).join('\n\n')}\n\nAspectos que deben comprobarse: ${s.pending_validation}\n\n${(s.caveats||[]).map(c=>`- ${c}`).join('\n')}\n\n`;
    }
    content+=`## Requisitos y limitaciones\n\n${lastResult.requirements.map(r=>`- ${r.title}: ${r.text}`).join('\n')}\n\n${lastResult.warnings.map(w=>`- ${w}`).join('\n')}\n`;
    const blob=new Blob([content],{type:'text/markdown;charset=utf-8'}),url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download='informe-fuentes-salud-argentina.md';document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  function normalize(v){return v.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();}
  function renderCatalog(){const term=normalize($('catalog-search').value),type=$('catalog-type').value,access=$('catalog-access').value,format=$('catalog-format').value;const sources=catalog.filter(s=>(type==='all'||s.source_type===type)&&(s.access_methods||[]).some(a=>(access==='all'||a.type===access)&&(format==='all'||a.formats.some(f=>f.toUpperCase()===format)))&&normalize(`${s.name} ${s.documented_content} ${s.id}`).includes(term));$('catalog-count').textContent=`${sources.length} registros del catálogo`;$('catalog-list').innerHTML=sources.length?sources.map(sourceCard).join(''):'<p class="empty">Sin resultados para los criterios de búsqueda.</p>';}
  for(const name of ['guide','catalog','method'])$(`${name}-tab`).onclick=()=>showView(name);
  $('catalog-search').addEventListener('input',renderCatalog);$('catalog-type').addEventListener('change',renderCatalog);
  $('catalog-access').addEventListener('change',renderCatalog);$('catalog-format').addEventListener('change',renderCatalog);
  renderQuestion();
})();
