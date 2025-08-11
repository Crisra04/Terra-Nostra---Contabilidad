# Terra Nostra — Contabilidad (PWA) V 1.10

PWA contable con partida doble, Libros IVA/BSS, RR.HH. (RC-IVA), Deudas y KPIs.

## Estructura
- `index.html`, `styles.css`, `app.js`, `sw.js`, `manifest.json`
- `icons/` (íconos PWA)
- `vercel.json` (headers para `sw.js`)

## Despliegue en GitHub + Vercel

1. Crea un repositorio en GitHub (privado o público), por ejemplo: **terra-nostra-contabilidad**.
2. Sube **todos los archivos** de esta carpeta (raíz del repo).
3. Entra a **vercel.com** y accede con GitHub → **Import Project** → selecciona este repo.
4. Framework: **Other**. Build command: **(vacío)**. Output dir: **(raíz)**.
5. Deploy. Obtendrás un dominio `*.vercel.app`.
6. En el celular, abre la URL y **Agrega a pantalla de inicio** para instalar la PWA.

### Notas
- El archivo `vercel.json` evita cachear `sw.js` agresivamente para que las actualizaciones de versión lleguen bien.
- Si cambias de versión, edita `window.APP_VERSION` en `app.js` y en `sw.js` el nombre de cache (ya está en `v1_10`).

### Funcionalidades clave
- **Pólizas** y **asientos automáticos** (ventas gravadas/exentas, compras con/sin crédito, deudas, depreciación).
- **Libros IVA (CSV + PDF)** y **BSS (CSV)** por mes.
- **RR.HH.**: planilla **RC-IVA** dependientes (parámetros SMN y MNI editables) + póliza automática.
- **Deudas**: cronograma mensual con pólizas de capital, interés y bancos.
- **EEFF & KPIs**: paquete **IUE** (BSS, EEFF y Notas) + KPIs (ROA, ROE, márgenes, % gastos/ventas) con comparativo.

© Terra Nostra
