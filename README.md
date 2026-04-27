# CNR Ñuble – Sistema de Supervisión de Obras
## Versión 1.0 | Abril 2026

### Archivos incluidos
- `index.html`   → Aplicación completa (todo en 1 archivo)
- `manifest.json` → Configuración PWA (instalable en dispositivo)
- `sw.js`         → Service Worker (funciona sin internet)

---

## Cómo desplegar (opciones desde más simple a más robusta)

### Opción A — GitHub Pages (GRATIS, recomendado para comenzar)
1. Crear cuenta en github.com
2. Nuevo repositorio → subir estos 3 archivos
3. Settings → Pages → Branch: main → /root
4. URL queda: `https://tuusuario.github.io/cnr-obras/`
5. En cualquier dispositivo, abrir esa URL en el navegador
6. iOS: Compartir → "Añadir a pantalla de inicio"
7. Android: Menú → "Instalar aplicación"

### Opción B — Netlify Drop (sin registro)
1. Ir a netlify.com/drop
2. Arrastrar la carpeta con los 3 archivos
3. Obtiene una URL inmediata

### Opción C — Servidor propio CNR (más control)
1. Copiar los 3 archivos a cualquier servidor web (Apache/Nginx)
2. Asegurarse de servir con HTTPS (obligatorio para PWA y cámara)
3. El service worker se activará automáticamente

---

## Uso en terreno

### Primera vez (con internet)
1. Abrir la URL en el navegador
2. Instalar como app (botón "Instalar" o "Añadir a inicio")
3. Tocar "📂 Excel" → cargar ProyectosParaRecepcion_xx-xx-xxxx.xlsx
4. Los proyectos quedan guardados localmente

### Sin internet
- La app funciona completamente offline
- Los datos se guardan en el dispositivo automáticamente
- Al recuperar señal, los datos siguen disponibles

### Flujo de trabajo típico
1. Seleccionar proyecto desde el selector (o navegar con ◀ ▶)
2. Módulo **Inicio de Obras** → al comenzar la obra
3. Módulo **Visita** → durante ejecución (visitas intermedias)
4. Módulo **Recepción** → al terminar la obra (formulario completo)
5. Módulo **Seguimiento** → monitoreo post-recepción

---

## Funcionalidades implementadas

### Carga de datos
- ✅ Excel importado desde dispositivo
- ✅ Pre-llenado automático de campos desde Excel
- ✅ Discrimina automáticamente Tecnificación vs Obras Civiles

### Formularios
- ✅ Identificación completa (todos los campos del original)
- ✅ Inventario dinámico (agregar/eliminar filas)
  - Tecnificación: máx 15 elementos (Elemento/Modelo/Marca/Cant/N°Serie)
  - Obras Civiles: máx 6 elementos (Tipo/Dimensiones/Coordenadas/Obs)
- ✅ Observaciones (modificaciones + pendientes)
- ✅ Firma digital (dibujo con dedo/lápiz)

### Archivos y fotos
- ✅ Carga de archivos por slot (Presupuesto/Plano/etc.)
- ✅ Visualizador de archivos en dispositivo
- ✅ Registro fotográfico con cámara del dispositivo
  - Tecnificación: grilla 3 col, máx 12 fotos
  - Obras Civiles: grilla 2 col, máx 8 fotos

### GPS
- ✅ Visualización de coordenadas precaradas
- ✅ Botón para abrir en Apple Maps
- ✅ Botón para abrir en Google Maps

### Exportación
- ✅ Generación de PDF (ventana de impresión del navegador)
- ✅ Envío por correo (abre cliente de correo del dispositivo)
- ✅ Vista previa del informe

### Almacenamiento
- ✅ Todo se guarda en localStorage del dispositivo
- ✅ Persiste entre sesiones (aunque se cierre el navegador)

---

## Próximas mejoras sugeridas (Fase 2)
- [ ] Pre-llenado del inventario desde Excel del presupuesto detallado
- [ ] Sincronización con Google Sheets / Drive cuando hay WiFi
- [ ] Listado de proyectos con estado visual por módulo
- [ ] Exportar informe Word (.docx)
- [ ] Múltiples supervisores con login simple
- [ ] Dashboard de seguimiento de todos los proyectos

---

## Compatibilidad
| Plataforma | Soporte |
|---|---|
| iOS Safari | ✅ Completo (incluye cámara) |
| Android Chrome | ✅ Completo |
| Windows Chrome/Edge | ✅ Completo |
| Windows Firefox | ✅ Completo |
| MacOS Safari | ✅ Completo |

---

## Limitaciones actuales
- localStorage tiene límite de ~5-10 MB por navegador
- Con muchas fotos en alta resolución puede llenarse
- Recomendación: usar fotos en resolución media (~1-2 MB c/u)
- Si se llena, la app avisa y pide borrar fotos antiguas

---

*Desarrollado para CNR Ñuble – Unidad de Supervisión y Seguimiento de Obras*
