const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const folder=path.resolve(__dirname,'..'),context=vm.createContext({});
for(const name of ['catalog.js','engine.js']) vm.runInContext(fs.readFileSync(path.join(folder,name),'utf8'),context);
const api=context.HealthGuide,catalog=context.HEALTH_CATALOG.sources;
assert.equal(catalog.length,84);
assert.equal(new Set(catalog.map(s=>s.id)).size,catalog.length);
assert.equal(api.provinces.length,24);
const base={topic:'vital',population:'all',scale:'national',province:'',analysis:'rate',data:'aggregate'};
let r=api.recommend(base,catalog);
assert(r.primary.some(s=>s.id==='N02'),'Mortalidad debe recomendar DEIS');
assert(!r.primary.some(s=>/^[JM]/.test(s.id)),'Recorrido nacional no debe mezclar datos locales como principales');
assert(r.support.some(s=>s.id==='S01'),'Tasas requieren contexto poblacional');
r=api.recommend({...base,topic:'services',scale:'province',province:'Mendoza'},catalog);
assert(r.primary.some(s=>s.id==='J13'),'Servicios Mendoza debe recomendar efectores locales');
assert(!r.primary.some(s=>s.id==='M01'),'No recomendar Rosario para Mendoza');
r=api.recommend({...base,topic:'risk',population:'child'},catalog);
assert(!r.primary.some(s=>s.id==='N05'),'ENFR adulto no es fuente principal para niñez');
assert(r.alternatives.some(s=>s.id==='N05'),'Conservar excepción ENFR con explicación');
r=api.recommend({...base,topic:'research',population:'adult',data:'micro'},catalog);
assert(!r.primary.some(s=>s.id==='U04'),'Datos animales no deben ser principales para humanos');
assert(r.alternatives.some(s=>s.id==='U04'&&s.caveats.length));
r=api.recommend({...base,topic:'research',population:'experimental',data:'micro'},catalog);
assert(!r.primary.some(s=>s.id==='U03'),'Estudio clínico humano no debe ser principal para experimentación');
r=api.recommend({...base,topic:'vital',data:'micro'},catalog);
assert(!r.primary.some(s=>s.id==='N02'),'DEIS agregado no debe prometer microdatos');
assert(r.warnings.some(s=>s.includes('No hay una fuente principal')));
let scenarios=0;
for(const topic of Object.keys(api.topics))for(const population of ['all','child','school','adult','older','experimental'])for(const scale of ['national','province','municipal'])for(const data of ['aggregate','micro','any'])for(const analysis of ['count','rate','trend','association','map']){
  const answer={topic,population,scale,province:scale==='national'?'':'Buenos Aires',data,analysis};
  const result=api.recommend(answer,catalog);scenarios++;
  const ids=[...result.primary,...result.alternatives,...result.support].map(s=>s.id);
  assert.equal(new Set(ids).size,ids.length,'No duplicar fuentes entre grupos');
  for(const s of result.primary){
    assert(!['C','I'].includes(s.evidence_status),'Referencia no debe presentarse como principal');
    const province=api.sourceProvince(s);
    if(province)assert.equal(province,answer.province,'No mezclar provincias');
  }
}
assert.throws(()=>api.recommend({...base,scale:'province',province:''},catalog));
console.log(`OK: ${scenarios} combinaciones, 84 fuentes, restricciones territoriales, poblacionales y de granularidad.`);

r=api.recommend({...base,topic:'services',scale:'province',province:'Mendoza'},catalog);
assert(r.primary.some(s=>s.id==='M11'));assert(!r.primary.some(s=>s.id==='M09'));
assert(!r.primary.some(s=>s.reference_only));

