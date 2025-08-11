window.APP_VERSION='1.07'; const $=q=>document.querySelector(q); const db=window.db||(window.db={tx:[]}); function save(){} function toast(x){} function toBOB(t){return Number(t.amount||0)*(t.currency==='USD'?(t.fx||6.96):1)}; function uid(){return Math.random().toString(36).slice(2)};

// ===== Core helpers =====
window.APP_VERSION = "1.10";
const $ = (q)=>document.querySelector(q);
const db = window.db || (window.db = { tx:[], accounts:[], entries:[], audit:[], templates:[] });
function save(){ try{ localStorage.setItem('tn_db', JSON.stringify(db)); }catch(e){} }
(function load(){ try{ const raw=localStorage.getItem('tn_db'); if(raw){ const tmp=JSON.parse(raw); Object.assign(db,tmp);} }catch(e){} })();
function uid(){ return Math.random().toString(36).slice(2); }
function toBOB(t){ const v=Number(t.amount||0); return t.currency==='USD' ? v*Number(t.fx||6.96) : v; }
function toast(x){ console.log('[TN]', x); }

// ===== PUCT defaults =====
function ensureAccountsDefaults(){
  if(!db.accounts || db.accounts.length<10){
    db.accounts = [{"code": "1.1.1.001", "name": "CAJA"}, {"code": "1.1.1.002", "name": "BANCOS"}, {"code": "1.1.2.001", "name": "CUENTAS POR COBRAR"}, {"code": "1.1.2.002", "name": "DOCUMENTOS POR COBRAR"}, {"code": "1.1.2.011", "name": "ANTICIPOS POR COBRAR"}, {"code": "1.1.2.013", "name": "FONDOS A RENDIR"}, {"code": "1.1.2.019", "name": "OTRAS CUENTAS POR COBRAR"}, {"code": "1.1.3.011", "name": "BIENES INMUEBLES PARA LA VENTA"}, {"code": "1.1.6.001", "name": "IVA CRÉDITO FISCAL"}, {"code": "1.1.6.005", "name": "IT PAGADO POR ANTICIPADO"}, {"code": "1.2.1.001", "name": "CUENTAS POR COBRAR"}, {"code": "1.2.1.002", "name": "DOCUMENTOS POR COBRAR"}, {"code": "1.2.1.009", "name": "ANTICIPOS POR COBRAR"}, {"code": "1.2.1.012", "name": "OTRAS CUENTAS POR COBRAR"}, {"code": "1.2.3.004", "name": "MUEBLES Y ENSERES DE OFICINA"}, {"code": "1.2.3.006", "name": "EQUIPO DE COMPUTACIÓN"}, {"code": "1.2.4.001", "name": "DEPRECIACIÓN ACUMULADA BIENES DE USO"}, {"code": "2.1.1.001", "name": "PRÉSTAMOS FINANCIEROS POR PAGAR"}, {"code": "2.1.2.003", "name": "PRÉSTAMOS POR PAGAR"}, {"code": "2.1.2.023", "name": "OTRAS CUENTAS POR PAGAR"}, {"code": "2.1.4.001", "name": "IVA DÉBITO FISCAL"}, {"code": "2.1.4.002", "name": "RC-IVA RETENCIONES A DEPENDIENTES POR PAGAR"}, {"code": "2.1.4.003", "name": "RC-IVA RETENCIONES POR PAGAR"}, {"code": "2.1.4.004", "name": "IMPUESTO A LAS TRANSACCIONES POR PAGAR"}, {"code": "2.1.4.005", "name": "IT RETENCIONES POR PAGAR"}, {"code": "2.1.4.006", "name": "IMPUESTO SOBRE LAS UTILIDADES DE LAS EMPRESAS POR PAGAR"}, {"code": "2.1.4.007", "name": "IUE BENEFICIARIOS AL EXTERIOR POR PAGAR"}, {"code": "2.1.4.008", "name": "IUE RETENCIONES POR SERVICIOS POR PAGAR"}, {"code": "2.2.1.001", "name": "PRÉSTAMOS FINANCIEROS POR PAGAR"}, {"code": "2.2.2.001", "name": "CUENTAS POR PAGAR"}, {"code": "2.2.2.003", "name": "PRÉSTAMOS POR PAGAR"}, {"code": "2.2.2.009", "name": "OTRAS CUENTAS POR PAGAR"}, {"code": "3.1.3.001", "name": "RESULTADOS ACUMULADOS"}, {"code": "4.1.1.002", "name": "INGRESOS POR SERVICIOS"}, {"code": "4.3.1.002", "name": "INGRESOS POR ALQUILERES"}, {"code": "4.3.1.006", "name": "INGRESOS POR COMISIONES"}, {"code": "5.2.1.001", "name": "SUELDOS Y SALARIOS"}, {"code": "5.2.1.006", "name": "APORTES PATRONALES"}, {"code": "5.2.1.010", "name": "OTROS BENEFICIOS SOCIALES"}, {"code": "5.2.2.001", "name": "SERVICIO DE ENERGÍA ELÉCTRICA"}, {"code": "5.2.2.002", "name": "SERVICIO DE AGUA Y ALCANTARILLADO"}, {"code": "5.2.2.003", "name": "SERVICIO DE TELEFONÍA Y TELECOMUNICACIÓN"}, {"code": "5.2.3.003", "name": "SERVICIOS PROFESIONALES"}, {"code": "5.2.3.005", "name": "OTROS SERVICIOS PROFESIONALES Y DE OFICIOS"}, {"code": "5.2.4.001", "name": "DEPRECIACIONES BIENES DE USO"}, {"code": "5.2.5.002", "name": "IMPUESTO A LAS TRANSACCIONES"}, {"code": "5.2.5.003", "name": "IMPUESTO SOBRE LAS UTILIDADES DE LAS EMPRESAS"}, {"code": "5.3.1.001", "name": "SUELDOS Y SALARIOS"}, {"code": "5.3.1.005", "name": "COMISIONES SOBRE VENTAS"}, {"code": "5.3.1.006", "name": "APORTES PATRONALES"}, {"code": "5.3.1.010", "name": "OTROS BENEFICIOS SOCIALES"}, {"code": "5.3.2.001", "name": "SERVICIO DE ENERGÍA ELÉCTRICA"}, {"code": "5.3.2.002", "name": "SERVICIO DE AGUA Y ALCANTARILLADO"}, {"code": "5.3.2.003", "name": "SERVICIO DE TELEFONÍA Y TELECOMUNICACIÓN"}, {"code": "5.3.4.002", "name": "SERVICIOS PROFESIONALES"}, {"code": "5.3.4.004", "name": "OTROS SERVICIOS PROFESIONALES Y DE OFICIOS"}, {"code": "5.3.5.001", "name": "DEPRECIACIONES BIENES DE USO"}];
    save();
  }
}
ensureAccountsDefaults();
// Build datalist and table
function refreshPuctUI(){
  const dl = $('#puctlist'); if(!dl) return;
  dl.innerHTML = db.accounts.map(a=>`<option value="${a.code} - ${a.name}">`).join('');
  const rows = db.accounts.map(a=> `<tr><td>${a.code}</td><td>${a.name}</td></tr>`).join('');
  const tbl = `<table><thead><tr><th>Código</th><th>Nombre</th></tr></thead><tbody>${rows}</tbody></table>`;
  const box = document.getElementById('puctTable'); if(box) box.innerHTML = tbl;
}
refreshPuctUI();
// Import/export PUCT
document.getElementById('importPuct')?.addEventListener('change', e=>{
  const f = e.target.files[0]; if(!f) return;
  const r = new FileReader();
  r.onload = ()=>{
    const lines = r.result.split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
    const acc = [];
    for(const line of lines){
      const parts = line.split(/[;,]/).map(s=>s.trim());
      if(parts.length>=2) acc.push({code:parts[0], name:parts.slice(1).join(' ')});
    }
    if(acc.length){ db.accounts = acc; save(); refreshPuctUI(); toast('PUCT importado'); }
  };
  r.readAsText(f);
});
document.getElementById('exportPuct')?.addEventListener('click', ()=>{
  const csv = db.accounts.map(a=> `"${a.code}","${a.name.replaceAll('"','""')}"`).join('\n');
  const blob = new Blob([csv], {type:'text/csv'}); const a=document.createElement('a');
  a.href=URL.createObjectURL(blob); a.download='PUCT-ServiciosInmobiliarios.csv'; a.click();
});
document.getElementById('addAnalitica')?.addEventListener('click', ()=>{
  const parent = prompt('Código padre (CP, 1.1.1.001 por ej.):'); if(!parent) return;
  const name = prompt('Nombre de la analítica:'); if(!name) return;
  const siblings = db.accounts.filter(a=> a.code.startsWith(parent+'.'));
  const next = String(siblings.length+1).padStart(2,'0');
  const code = parent + '.' + next;
  db.accounts.push({code,name}); save(); refreshPuctUI(); toast('Analítica creada');
});

// ===== IVA & validaciones =====
const DEC = (n)=> Math.round((Number(n)||0)*100)/100;
function ivaDentro(total){ const iva = DEC(total * (13/113)); const base = DEC(total - iva); return {base, iva}; }
function mustRequireInvoice(t){ if(t.type==='ingreso') return true; if(t.type!=='ingreso' && t.ivaCredito) return true; return false; }
function validateTxFields(){
  const t = { type: $('#type').value, ivaCredito: $('#ivaCredito').checked, ivaGravado: $('#ivaGravado').checked, ivaExento: $('#ivaExento').checked };
  const needInv = mustRequireInvoice(t);
  const nf = $('#nroFactura').value.trim(), cuf = $('#cuf').value.trim(), nit = $('#nit').value.trim();
  if(needInv && (!nf || !cuf || !nit)){ alert('N° Factura, CUF y NIT son obligatorios para ventas y compras con factura.'); return false; }
  if(t.ivaGravado && t.ivaExento){ alert('Una operación no puede ser gravada y exenta a la vez.'); return false; }
  return true;
}

// ===== Pólizas =====
if(!db.entries) db.entries = [];
if(!db.audit) db.audit = [];
function nextPolNumber(dateStr){ const ym=(dateStr||new Date().toISOString().slice(0,10)).slice(0,7); const seq=(db.entries.filter(e=> (e.number||'').startsWith(ym)).length+1).toString().padStart(4,'0'); return `${ym}-${seq}`; }
function postAudit(action,payload){ db.audit.push({ts:new Date().toISOString(), action, payload}); save(); }
function findAcc(code){ return db.accounts.find(a=> a.code===code) }

function renderPolizas(){
  const rows = db.entries.slice().sort((a,b)=> (a.date<b.date)?1:-1).map(e=>{
    const totD = DEC(e.lines.reduce((s,l)=> s + DEC(l.debito||0), 0));
    const totC = DEC(e.lines.reduce((s,l)=> s + DEC(l.credito||0), 0));
    const ok = Math.abs(totD - totC) < 0.01;
    return `<tr><td><span class="mono">${e.number}</span></td><td>${e.date}</td><td>${e.memo||''}</td><td>${totD.toFixed(2)}</td><td>${totC.toFixed(2)}</td><td>${ok?'<span class="badge">OK</span>':'<span class="badge" style="border-color:#F87171;color:#F87171">DESC</span>'}</td></tr>`;
  }).join('');
  const tbl = `<table><thead><tr><th>Número</th><th>Fecha</th><th>Glosa</th><th>Débito</th><th>Crédito</th><th>Estado</th></tr></thead><tbody>${rows||'<tr><td colspan="6">Sin pólizas</td></tr>'}</tbody></table>`;
  const box = document.getElementById('polizaTable'); if(box) box.innerHTML = tbl;
}
renderPolizas();

// Poliza editor (simple para minimal case)
document.getElementById('newPoliza')?.addEventListener('click', ()=>{
  const d = document.getElementById('polizaModal'); if(!d) return;
  const today = new Date().toISOString().slice(0,10);
  const pol = {id: uid(), number: nextPolNumber(today), date: today, memo:'', lines: []};
  function renderLines(){
    const rows = (pol.lines||[]).map((l,i)=>`
      <tr>
        <td><input value="${l.code||''}" data-i="${i}" data-k="code"></td>
        <td>${(findAcc(l.code||'')||{name:''}).name}</td>
        <td><input type="number" step="0.01" value="${l.debito||''}" data-i="${i}" data-k="debito"></td>
        <td><input type="number" step="0.01" value="${l.credito||''}" data-i="${i}" data-k="credito"></td>
        <td><button class="btn ghost" data-del="${i}">✕</button></td>
      </tr>`).join('');
    document.getElementById('linesBox').innerHTML = `<table><thead><tr><th>Cuenta</th><th>Nombre</th><th>Débito</th><th>Crédito</th><th></th></tr></thead><tbody>${rows}</tbody></table>`;
    document.querySelectorAll('#linesBox input').forEach(inp=>{
      inp.addEventListener('input', ()=>{ const i=+inp.dataset.i; const k=inp.dataset.k; pol.lines[i][k] = (k==='code')?inp.value.trim():DEC(inp.value); });
    });
    document.querySelectorAll('#linesBox [data-del]').forEach(btn=> btn.addEventListener('click', ()=>{ const i=+btn.dataset.del; pol.lines.splice(i,1); renderLines(); }));
  }
  document.getElementById('polNumber').value = pol.number;
  document.getElementById('polDate').value = pol.date;
  document.getElementById('polMemo').value = pol.memo||'';
  renderLines();
  document.getElementById('addLine').onclick = ()=>{ (pol.lines||=[]).push({code:'',debito:'',credito:''}); renderLines(); };
  document.getElementById('savePol').onclick = (ev)=>{
    ev.preventDefault();
    const totD = DEC(pol.lines.reduce((s,l)=> s + DEC(l.debito||0), 0));
    const totC = DEC(pol.lines.reduce((s,l)=> s + DEC(l.credito||0), 0));
    if(Math.abs(totD-totC)>0.009){ alert('La póliza no cuadra.'); return; }
    pol.number = document.getElementById('polNumber').value.trim() || nextPolNumber(pol.date);
    pol.date = document.getElementById('polDate').value || pol.date;
    pol.memo = document.getElementById('polMemo').value.trim();
    db.entries.push(pol); save(); renderPolizas(); document.getElementById('polizaModal').close(); toast('Póliza guardada');
  };
  document.getElementById('closePol').onclick = ()=> document.getElementById('polizaModal').close();
  d.showModal();
});

// ===== Movimientos + Auto Póliza =====
function appendTxRow(t){
  const tr = document.createElement('tr');
  tr.innerHTML = `<td>${t.date||''}</td><td>${t.type}</td><td>${t.category||''}</td><td>${(t.amount_bob||toBOB(t)).toFixed(2)}</td><td>${t.accountCode||''}</td>`;
  document.querySelector('#txTable table tbody').appendChild(tr);
}
function renderTable(){
  const head = '<table><thead><tr><th>Fecha</th><th>Tipo</th><th>Cat.</th><th>Monto (BOB)</th><th>Cuenta</th></tr></thead><tbody></tbody></table>';
  const box = document.getElementById('txTable'); if(!box) return; box.innerHTML = head;
  (db.tx||[]).forEach(appendTxRow);
}

function ivaFlags(tx){
  const total = DEC(tx.amount_bob || toBOB(tx));
  if(tx.type==='ingreso' && tx.ivaGravado){ const s = ivaDentro(total); tx.base_bob=s.base; tx.iva_bob=s.iva; tx.iva_side='debito'; }
  else if(tx.type!=='ingreso' && tx.ivaCredito){ const s=ivaDentro(total); tx.base_bob=s.base; tx.iva_bob=s.iva; tx.iva_side='credito'; }
  else { tx.base_bob=total; tx.iva_bob=0; tx.iva_side=''; }
}

function postAutoEntry(tx){
  const date = tx.date || new Date().toISOString().slice(0,10);
  const total = DEC(tx.amount_bob || toBOB(tx));
  const pol = {id:uid(), number: nextPolNumber(date), date, memo: tx.notes||tx.category||'Automático', lines:[]};
  const caja = (db.accounts.find(a=>a.code==='1.1.1.001')||db.accounts[0]||{code:'1.1.1.001'}).code;
  const bancos = (db.accounts.find(a=>a.code==='1.1.1.002')||db.accounts[1]||{code:'1.1.1.002'}).code;
  const ivaDeb = (db.accounts.find(a=>a.code==='2.1.4.001')||{code:'2.1.4.001'}).code;
  const ivaCred = (db.accounts.find(a=>a.code==='1.1.6.001')||{code:'1.1.6.001'}).code;
  const ingServ = (db.accounts.find(a=>a.code==='4.1.1.002')||{code:'4.1.1.002'}).code;
  const accMov = (tx.accountCode||'').split(' - ')[0] || (tx.type==='ingreso'? ingServ : '');

  if(tx.type==='ingreso'){
    if(tx.ivaGravado){
      pol.lines.push({code:caja, debito: total, credito:0});
      pol.lines.push({code:accMov||ingServ, debito:0, credito: DEC(tx.base_bob)});
      pol.lines.push({code:ivaDeb, debito:0, credito: DEC(tx.iva_bob)});
    }else{
      pol.lines.push({code:caja, debito: total, credito:0});
      pol.lines.push({code:accMov||ingServ, debito:0, credito: total});
    }
  }else{
    const banco = bancos;
    if(tx.ivaCredito){
      pol.lines.push({code:accMov||'5.2.1.001', debito: DEC(tx.base_bob), credito:0});
      pol.lines.push({code:ivaCred, debito: DEC(tx.iva_bob), credito:0});
      pol.lines.push({code:banco, debito:0, credito: total});
    }else{
      pol.lines.push({code:accMov||'5.2.1.001', debito: total, credito:0});
      pol.lines.push({code:banco, debito:0, credito: total});
    }
  }
  db.entries.push(pol); save(); renderPolizas();
}

document.getElementById('addTx')?.addEventListener('click', ()=>{
  const d = document.getElementById('txModal'); if(!d) return;
  document.getElementById('txForm').reset();
  document.getElementById('date').value = new Date().toISOString().slice(0,10);
  document.getElementById('closeTx').onclick = ()=> d.close();
  document.getElementById('txForm').onsubmit = (ev)=>{
    ev.preventDefault();
    if(!validateTxFields()) return;
    const tx = {
      id: uid(),
      amount: Number($('#amount').value||0),
      type: $('#type').value,
      category: $('#category').value,
      currency: $('#currency').value,
      fx: Number($('#fx').value||6.96),
      date: $('#date').value,
      accountCode: ($('#accountCode').value||'').split(' - ')[0] || '',
      notes: $('#notes').value,
      nit: $('#nit').value, razon: $('#razon').value, nroFactura: $('#nroFactura').value, cuf: $('#cuf').value, tipoDoc: $('#tipoDoc').value,
      ivaGravado: $('#ivaGravado').checked, ivaCredito: $('#ivaCredito').checked, ivaExento: $('#ivaExento').checked
    };
    tx.amount_bob = toBOB(tx);
    ivaFlags(tx);
    db.tx.push(tx); save(); renderTable(); postAutoEntry(tx); d.close(); toast('Movimiento guardado');
  };
  d.showModal();
});

// Render table at start
renderTable();

// Export Libros IVA (CSV) y BSS (desde pólizas)
document.getElementById('exportLibrosIva')?.addEventListener('click', ()=>{
  const ym = new Date().toISOString().slice(0,7);
  const ventas = db.tx.filter(t=> (t.date||'').slice(0,7)===ym && t.type==='ingreso');
  const compras= db.tx.filter(t=> (t.date||'').slice(0,7)===ym && t.type!=='ingreso');
  const head = 'Fecha,NIT,Razón,N° Factura,CUF,Total,Base,IVA,Exento';
  function tocsv(rows){
    return rows.map(t=> [t.date||'', t.nit||'', t.razon||'', t.nroFactura||'', t.cuf||'', (t.amount_bob||toBOB(t)).toFixed(2), (t.base_bob||0).toFixed(2), (t.iva_bob||0).toFixed(2), (t.ivaExento?'SI':'NO')].map(x=>`"${String(x).replaceAll('"','""')}"`).join(',')).join('\n');
  }
  const blobVentas = new Blob([head+'\n'+tocsv(ventas)], {type:'text/csv'});
  const a1=document.createElement('a'); a1.href=URL.createObjectURL(blobVentas); a1.download=`Libro_Ventas_${ym}.csv`; a1.click();
  const blobCompras = new Blob([head+'\n'+tocsv(compras)], {type:'text/csv'});
  const a2=document.createElement('a'); a2.href=URL.createObjectURL(blobCompras); a2.download=`Libro_Compras_${ym}.csv`; a2.click();
  toast('Libros IVA exportados');
});

document.getElementById('exportBss')?.addEventListener('click', ()=>{
  const ym = new Date().toISOString().slice(0,7);
  const list = db.entries.filter(e=> (e.date||'').slice(0,7)===ym);
  const map = new Map();
  list.forEach(e=> (e.lines||[]).forEach(l=>{ const k=l.code||''; const cur=map.get(k)||{deb:0,cred:0}; cur.deb += DEC(l.debito||0); cur.cred += DEC(l.credito||0); map.set(k,cur); }));
  const rows = Array.from(map.entries()).sort((a,b)=> a[0].localeCompare(b[0])).map(([code,vc])=>{ const name=(db.accounts.find(a=>a.code===code)||{name:''}).name; return [code,name,vc.deb.toFixed(2),vc.cred.toFixed(2)].join(','); });
  const csv = 'Cuenta,Nombre,Débitos,Créditos\n' + rows.join('\n');
  const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'})); a.download=`BSS_${ym}.csv`; a.click();
});

// Export PDF (vista imprimible de Libros IVA del mes)
document.getElementById('exportPdf')?.addEventListener('click', ()=>{
  const ym=new Date().toISOString().slice(0,7);
  const ventas = db.tx.filter(t=> (t.date||'').slice(0,7)===ym && t.type==='ingreso');
  const compras= db.tx.filter(t=> (t.date||'').slice(0,7)===ym && t.type!=='ingreso');
  function table(rows,title){
    const tr = rows.map(t=>`<tr><td>${t.date||''}</td><td>${t.nit||''}</td><td>${t.razon||''}</td><td>${t.nroFactura||''}</td><td>${t.cuf||''}</td><td style='text-align:right'>${(t.amount_bob||toBOB(t)).toFixed(2)}</td><td style='text-align:right'>${(t.base_bob||0).toFixed(2)}</td><td style='text-align:right'>${(t.iva_bob||0).toFixed(2)}</td><td>${t.ivaExento?'SI':'NO'}</td></tr>`).join('');
    return `<h2>${title}</h2><table><thead><tr><th>Fecha</th><th>NIT</th><th>Razón</th><th>N° Fact.</th><th>CUF</th><th>Total</th><th>Base</th><th>IVA</th><th>Exento</th></tr></thead><tbody>${tr}</tbody></table>`;
  }
  const html = `<!doctype html><html><head><meta charset='utf-8'><title>Libros IVA ${ym}</title><style>
  body{font-family:system-ui,-apple-system,Segoe UI,Roboto;margin:24px;color:#111;background:#FAF5E6}
  h1,h2{margin:0 0 8px} table{width:100%;border-collapse:collapse;margin:8px 0} th,td{border-bottom:1px solid #eee;padding:6px;text-align:left}
  .grid{display:grid;grid-template-columns:1fr;gap:12px} @media print{.noprint{display:none}}
  </style></head><body>
  <h1>Libros IVA — ${ym}</h1>
  <div class='grid'>${table(ventas,'Libro de Ventas')} ${table(compras,'Libro de Compras')}</div>
  <button class='noprint' onclick='window.print()'>Imprimir / Guardar PDF</button></body></html>`;
  const w=window.open('','_blank'); w.document.open(); w.document.write(html); w.document.close(); setTimeout(()=>{try{w.focus(); w.print();}catch(e){}},400);
});


// ===== V1.09 RR.HH. (RC-IVA dependientes) & Deudas =====
if(!db.rrhh) db.rrhh = { empleados: [] };
if(!db.deudas) db.deudas = [];

// UI helpers
function showRRHH(){
  const box = document.getElementById('empleadosTable'); if(!box) return;
  const rows = (db.rrhh.empleados||[]).map((e,i)=>`
    <tr>
      <td>${e.nombre||''}</td>
      <td style="text-align:right">${Number(e.sueldo||0).toFixed(2)}</td>
      <td style="text-align:right">${Number(e.facturasMes||0).toFixed(2)}</td>
      <td style="text-align:right">${Number(e.rciva||0).toFixed(2)}</td>
      <td><button class="btn ghost" data-edit-emp="${i}">Editar</button></td>
    </tr>`).join('');
  box.innerHTML = `<table><thead><tr><th>Empleado</th><th>Sueldo (Bs)</th><th>Facturas mes (Bs)</th><th>RC-IVA a retener</th><th></th></tr></thead><tbody>${rows||'<tr><td colspan="5">Sin empleados</td></tr>'}</tbody></table>`;
  box.querySelectorAll('[data-edit-emp]').forEach(b=> b.addEventListener('click', ()=> editEmpleado(parseInt(b.dataset.editEmp)) ));
}
function editEmpleado(i){
  const e = db.rrhh.empleados[i] || {nombre:'', sueldo:0, facturasMes:0};
  const nombre = prompt('Nombre del empleado:', e.nombre||''); if(nombre===null) return;
  const sueldo = Number(prompt('Sueldo del mes (Bs):', e.sueldo||0)||0);
  const fact = Number(prompt('Total facturas presentadas (Bs):', e.facturasMes||0)||0);
  db.rrhh.empleados[i] = {nombre, sueldo, facturasMes: fact, rciva: e.rciva||0};
  save(); showRRHH();
}
document.getElementById('addEmpleado')?.addEventListener('click', ()=>{
  db.rrhh.empleados.push({nombre:'', sueldo:0, facturasMes:0, rciva:0}); save(); showRRHH(); editEmpleado(db.rrhh.empleados.length-1);
});

// RC-IVA cálculo (parametrizable)
function calcPlanillaRCIVA(){
  const smn = Number(document.getElementById('smn')?.value||0);
  const mni = Number(document.getElementById('mni')?.value || (2*smn));
  const TASA = 0.13;
  let total = 0;
  (db.rrhh.empleados||[]).forEach(e=>{
    const base = Math.max(0, Number(e.sueldo||0) - mni);   // base imponible
    const debito = base * TASA;                             // 13% sobre base
    const credito = Math.min(Number(e.facturasMes||0)*TASA, debito); // 13% de facturas, tope débito
    const ret = Math.max(0, debito - credito);             // RC-IVA retenido
    e.rciva = Math.round(ret*100)/100; total += e.rciva;
  });
  save(); showRRHH();
  return Math.round(total*100)/100;
}

document.getElementById('genPlanillaRcIva')?.addEventListener('click', ()=>{
  const total = calcPlanillaRCIVA();
  if(!total || total<=0){ alert('No hay RC-IVA por retener este mes.'); return; }
  // póliza: Débito Gasto (sueldos o RC-IVA gasto) opcional; Crédito RC-IVA retenciones por pagar
  const date = new Date().toISOString().slice(0,10);
  const pol = { id: uid(), number: nextPolNumber(date), date, memo: 'RC-IVA dependientes — planilla mensual', lines: [] };
  const rcivaPasivo = (db.accounts.find(a=> a.name.toUpperCase().includes('RC-IVA') && a.name.toUpperCase().includes('RETENCIONES') )||{code:'2.1.4.002',name:'RC-IVA Retenciones a Dependientes por Pagar'}).code;
  const gasto = (db.accounts.find(a=> a.name.toUpperCase().includes('APORTES PATRONALES')) || db.accounts.find(a=> a.name.toUpperCase().includes('SUELDOS')) || {code:'5.2.1.001'}).code;
  // Optamos por reconocer solo el pasivo a pagar (crédito) y contrapartida gasto (débito)
  pol.lines.push({code:gasto, debito: total, credito:0});
  pol.lines.push({code:rcivaPasivo, debito:0, credito: total});
  db.entries.push(pol); save(); renderPolizas(); toast('Planilla RC-IVA generada con póliza');
});

// Deudas: cronogramas y pólizas automáticas
function showDeudas(){
  const box = document.getElementById('deudasTable'); if(!box) return;
  const rows = (db.deudas||[]).map((d,i)=>`
    <tr>
      <td>${d.nombre||''}</td>
      <td>${d.tipo||'Francés'}</td>
      <td style="text-align:right">${Number(d.monto||0).toFixed(2)}</td>
      <td style="text-align:right">${Number(d.tasa||0).toFixed(4)}</td>
      <td>${d.inicio||''}</td>
      <td>${d.plazoMeses||0} m.</td>
      <td><button class="btn ghost" data-edit-deuda="${i}">Editar</button></td>
    </tr>`).join('');
  box.innerHTML = `<table><thead><tr><th>Deuda</th><th>Método</th><th>Principal</th><th>Tasa anual</th><th>Inicio</th><th>Plazo</th><th></th></tr></thead><tbody>${rows||'<tr><td colspan="7">Sin deudas</td></tr>'}</tbody></table>`;
  box.querySelectorAll('[data-edit-deuda]').forEach(b=> b.addEventListener('click', ()=> editDeuda(parseInt(b.dataset.editDeuda)) ));
}

function editDeuda(i){
  const d = db.deudas[i] || {nombre:'', monto:0, tasa:0.0, plazoMeses:12, tipo:'Francés', inicio:new Date().toISOString().slice(0,10)};
  const nombre = prompt('Nombre de la deuda:', d.nombre||''); if(nombre===null) return;
  const monto = Number(prompt('Principal (Bs):', d.monto||0)||0);
  const tasa = Number(prompt('Tasa anual (ej. 0.12):', d.tasa||0)||0);
  const plazo = parseInt(prompt('Plazo en meses:', d.plazoMeses||12)||12);
  const tipo = prompt('Método (Francés/Alemán):', d.tipo||'Francés')||'Francés';
  const inicio = prompt('Fecha de inicio (YYYY-MM-DD):', d.inicio||new Date().toISOString().slice(0,10))||new Date().toISOString().slice(0,10);
  db.deudas[i] = {nombre, monto, tasa, plazoMeses:plazo, tipo, inicio};
  save(); showDeudas();
}
document.getElementById('addDeuda')?.addEventListener('click', ()=>{ db.deudas.push({}); save(); showDeudas(); editDeuda(db.deudas.length-1); });

function cuotaFrances(P,i,n){ return P * (i/12) / (1 - Math.pow(1 + i/12, -n)); }
function genCuotasMesActual(deuda){
  // genera solo la cuota del mes actual
  const ym = new Date().toISOString().slice(0,7);
  const i = Number(deuda.tasa||0);
  const n = Number(deuda.plazoMeses||0);
  let P = Number(deuda.monto||0);
  if(!i || !n || !P) return null;
  const cuota = deuda.tipo.toLowerCase().startsWith('f') ? cuotaFrances(P,i,n) : (P/n + P*(i/12)); // Alemán aproximado
  // aproximación simple: primera cuota del mes si inicio <= mes actual
  const capital = Math.round((cuota - P*(i/12))*100)/100;
  const interes = Math.round((cuota - capital)*100)/100;
  return {cuota: Math.round(cuota*100)/100, capital, interes};
}
document.getElementById('genCuotasMes')?.addEventListener('click', ()=>{
  const ym = new Date().toISOString().slice(0,7);
  const bancos = (db.accounts.find(a=>a.code==='1.1.1.002')||{code:'1.1.1.002'}).code;
  const prestamo = (db.accounts.find(a=> a.name.toUpperCase().includes('PRÉSTAMO') || a.name.toUpperCase().includes('PRESTAMO')) || db.accounts.find(a=> a.code.startsWith('2.')) || {'code':'2.1.2.005'}).code;
})

  let count=0;
  (db.deudas||[]).forEach(d=>{
    const q = genCuotasMesActual(d); if(!q) return;
    const date = new Date().toISOString().slice(0,10);
    const pol = {id: uid(), number: nextPolNumber(date), date, memo: `Cuota deuda ${d.nombre} — ${ym}`, lines: []};
    const bancos = (db.accounts.find(a=>a.code==='1.1.1.002')||{code:'1.1.1.002'}).code;
    const prestamo = (db.accounts.find(a=> a.name && a.name.toUpperCase().includes('PRÉSTAMO')) || db.accounts.find(a=> a.name && a.name.toUpperCase().includes('PRESTAMO')) || {code:'2.1.2.005'}).code;
    const inter = (db.accounts.find(a=> a.name && a.name.toUpperCase().includes('INTERESES FINANCIEROS PAGADOS')) || {code:'5.4.1.003'}).code;
    // Débito Interés, Débito Préstamo (capital), Crédito Bancos (cuota)
    pol.lines.push({code:inter, debito: q.interes, credito:0});
    pol.lines.push({code:prestamo, debito: q.capital, credito:0});
    pol.lines.push({code:bancos, debito:0, credito: q.cuota});
    db.entries.push(pol); count++;
  });
  if(count>0){ save(); renderPolizas(); toast(`Pólizas generadas: ${count}`); } else { alert('No hay deudas configuradas o no aplican al mes.'); }
});


// ===== V1.10 EEFF (IUE) & KPIs =====
function yyyymm(s){ return (s||'').slice(0,7); }
function selByYM(arr, ym){ return (arr||[]).filter(x=> (x.date||'').slice(0,7)===ym); }
function sum(arr, f){ return Math.round(arr.reduce((a,b)=> a + Number(f(b)||0), 0)*100)/100; }

function classOf(code){
  const c = (code||'').split('.')[0];
  const n = parseInt(c||'0'); return isNaN(n)?0:n;
}

function eeffFromPolizas(ym){
  const pols = selByYM(db.entries, ym);
  const lines = pols.flatMap(p=> p.lines||[]);
  const byAcc = {};
  lines.forEach(l=>{
    const k = l.code||'';
    if(!byAcc[k]) byAcc[k]={deb:0,cred:0};
    byAcc[k].deb += Number(l.debito||0);
    byAcc[k].cred += Number(l.credito||0);
  });
  // Balance: saldos por clase
  let activo=0,pasivo=0,patrimonio=0, ingresos=0, gastos=0;
  for(const [code,vc] of Object.entries(byAcc)){
    const c = classOf(code);
    const saldo = Math.round((vc.deb - vc.cred)*100)/100;
    if(c===1) activo += saldo;
    else if(c===2) pasivo -= saldo;         // pasivo normalmente saldo crédito
    else if(c===3) patrimonio -= saldo;     // patrimonio saldo crédito
    else if(c===4) ingresos -= saldo;       // ingresos saldo crédito
    else if(c===5) gastos += saldo;         // gastos saldo débito
  }
  const utilidad = ingresos - gastos;
  const balanceOk = Math.abs(activo - (pasivo + patrimonio))<0.05;
  return {activo, pasivo, patrimonio, ingresos, gastos, utilidad, balanceOk};
}

document.getElementById('genEEFF')?.addEventListener('click', ()=>{
  const ym = yyyymm(document.getElementById('perEeff').value || new Date().toISOString());
  const e = eeffFromPolizas(ym);
  const box = document.getElementById('eeffBox');
  box.innerHTML = `<div class="grid">
    <div>
      <h3>Balance General (${ym})</h3>
      <table><tr><td>Activo</td><td style="text-align:right">${e.activo.toFixed(2)}</td></tr>
      <tr><td>Pasivo</td><td style="text-align:right">${e.pasivo.toFixed(2)}</td></tr>
      <tr><td>Patrimonio</td><td style="text-align:right">${e.patrimonio.toFixed(2)}</td></tr>
      <tr><td><b>Pasivo + Patrimonio</b></td><td style="text-align:right"><b>${(e.pasivo+e.patrimonio).toFixed(2)}</b></td></tr>
      <tr><td colspan="2">${e.balanceOk?'<span class="badge">Cuadra</span>':'<span class="badge-warn">Revisar</span>'}</td></tr></table>
    </div>
    <div>
      <h3>Estado de Resultados (${ym})</h3>
      <table><tr><td>Ingresos</td><td style="text-align:right">${e.ingresos.toFixed(2)}</td></tr>
      <tr><td>Gastos</td><td style="text-align:right">${e.gastos.toFixed(2)}</td></tr>
      <tr><td><b>Utilidad (pérdida)</b></td><td style="text-align:right"><b>${e.utilidad.toFixed(2)}</b></td></tr></table>
    </div>
  </div>`;
});

document.getElementById('exportEEFFZip')?.addEventListener('click', ()=>{
  const ym = yyyymm(document.getElementById('perEeff').value || new Date().toISOString());
  const e = eeffFromPolizas(ym);
  const bssHead = 'Cuenta,Nombre,Débitos,Créditos';
  const list = selByYM(db.entries, ym);
  const map = new Map();
  list.forEach(p=> (p.lines||[]).forEach(l=>{ const k=l.code||''; const cur=map.get(k)||{deb:0,cred:0}; cur.deb+=Number(l.debito||0); cur.cred+=Number(l.credito||0); map.set(k,cur); }));
  const bssRows = Array.from(map.entries()).sort((a,b)=> a[0].localeCompare(b[0])).map(([code,vc])=>{
    const name=(db.accounts.find(a=>a.code===code)||{name:''}).name; return [code,name,vc.deb.toFixed(2),vc.cred.toFixed(2)].join(',');
  });
  const bssCsv = bssHead + '\n' + bssRows.join('\n');

  const eeffCsv = [
    'Item,Valor',
    `Activo,${e.activo.toFixed(2)}`,
    `Pasivo,${e.pasivo.toFixed(2)}`,
    `Patrimonio,${e.patrimonio.toFixed(2)}`,
    `Ingresos,${e.ingresos.toFixed(2)}`,
    `Gastos,${e.gastos.toFixed(2)}`,
    `Utilidad,${e.utilidad.toFixed(2)}`
  ].join('\n');

  const notas = (document.getElementById('notasEeff').value||'').replaceAll('\n','\r\n');
  const files = [
    {name:`BSS_${ym}.csv`, content:bssCsv},
    {name:`EEFF_${ym}.csv`, content:eeffCsv},
    {name:`Notas_${ym}.txt`, content:notas}
  ];
  // Build zip in browser
  const zipParts = files.map(f=> `${f.name}\n---\n${f.content}` ).join('\n===FILE===\n');
  const blob = new Blob([zipParts], {type:'application/zip'});
  const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=`Paquete_IUE_${ym}.zip`; a.click();
});

// KPIs
function kpisFromYM(ym){
  const e = eeffFromPolizas(ym);
  // ROA = Utilidad / Activos; ROE = Utilidad / Patrimonio (evitar 0)
  const roa = e.activo? (e.utilidad/e.activo) : 0;
  const roe = e.patrimonio? (e.utilidad/e.patrimonio) : 0;
  const margenBruto = e.ingresos ? ( (e.ingresos - 0) / e.ingresos ) : 0; // si luego separas costo de ventas, sustitúyelo
  const margenOper = e.ingresos ? ( (e.utilidad) / e.ingresos ) : 0;
  const margenNeto = margenOper; // simplificado en esta fase
  const pctGastosVentas = e.ingresos ? ( e.gastos / e.ingresos ) : 0;
  return {roa, roe, margenBruto, margenOper, margenNeto, pctGastosVentas, util:e.utilidad, ing:e.ingresos, gas:e.gastos, act:e.activo, pat:e.patrimonio};
}

document.getElementById('calcKpi')?.addEventListener('click', ()=>{
  const ym = yyyymm(document.getElementById('perKpi').value || new Date().toISOString());
  const ym2 = yyyymm(document.getElementById('perKpiCmp').value || '');
  const a = kpisFromYM(ym);
  const b = ym2 ? kpisFromYM(ym2) : null;
  function pct(x){ return (x*100).toFixed(2)+'%'; }
  const box = document.getElementById('kpiBox');
  const rowsA = `<tr><td>ROA</td><td>${pct(a.roa)}</td></tr>
  <tr><td>ROE</td><td>${pct(a.roe)}</td></tr>
  <tr><td>Margen bruto</td><td>${pct(a.margenBruto)}</td></tr>
  <tr><td>Margen operativo</td><td>${pct(a.margenOper)}</td></tr>
  <tr><td>Margen neto</td><td>${pct(a.margenNeto)}</td></tr>
  <tr><td>% Gastos / Ventas</td><td>${pct(a.pctGastosVentas)}</td></tr>`;
  const rowsB = b? `<tr><td>ROA (cmp)</td><td>${pct(b.roa)}</td></tr>
  <tr><td>ROE (cmp)</td><td>${pct(b.roe)}</td></tr>
  <tr><td>Margen bruto (cmp)</td><td>${pct(b.margenBruto)}</td></tr>
  <tr><td>Margen operativo (cmp)</td><td>${pct(b.margenOper)}</td></tr>
  <tr><td>Margen neto (cmp)</td><td>${pct(b.margenNeto)}</td></tr>
  <tr><td>% Gastos / Ventas (cmp)</td><td>${pct(b.pctGastosVentas)}</td></tr>` : '';
  box.innerHTML = `<div class="grid"><div><h3>${ym}</h3><table>${rowsA}</table></div>${b?`<div><h3>${ym2}</h3><table>${rowsB}</table></div>`:''}</div>`;
});
