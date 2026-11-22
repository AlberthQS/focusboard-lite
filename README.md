# FocusBoard Lite

Una aplicación sencilla para organizar tareas personales desde el navegador, sin crear una cuenta. La construí como proyecto de práctica con **HTML, CSS y JavaScript**.

## Qué permite hacer

- Crear tareas y asignarles prioridad baja, media o alta.
- Marcar tareas como completadas y eliminarlas.
- Filtrar entre todas, pendientes y completadas.
- Buscar tareas por texto.
- Conservar las tareas en el almacenamiento local del navegador cuando está disponible.
- Navegar con teclado y utilizar etiquetas accesibles en los controles principales.

Los datos **no se envían a un servidor**. Si borras los datos del navegador o utilizas otro dispositivo, tus tareas no se sincronizarán.

## Tecnologías

HTML · CSS · JavaScript (módulos ES) · `localStorage` · Node.js para pruebas.

No necesita framework ni dependencias de producción.

## Cómo ejecutarlo

Puedes clonar este repositorio y levantar un servidor local desde la carpeta del proyecto:

```bash
git clone https://github.com/AlberthQS/focusboard-lite.git
cd focusboard-lite
python -m http.server 8000
```

Abre `http://localhost:8000` en el navegador. Si usas Windows y `python` no funciona, prueba `py -m http.server 8000`.

## Pruebas

Las funciones principales están separadas en `core.mjs` y tienen pruebas automatizadas en `tests/core.test.mjs`. Con Node.js 18 o posterior:

```bash
npm test
```

Las pruebas cubren creación, validación, cambio de estado, eliminación, filtrado y conteo de tareas. También se ejecutan en GitHub Actions cuando se configura el flujo de integración continua.

## Estructura

| Archivo | Para qué sirve |
| --- | --- |
| `index.html` | Estructura e interfaz de la aplicación |
| `styles.css` | Diseño y adaptación a pantallas |
| `app.js` | Eventos, interfaz y persistencia |
| `core.mjs` | Lógica reutilizable y validaciones |
| `tests/core.test.mjs` | Pruebas de lógica con Node.js |

## Publicación

El repositorio incluye un flujo para GitHub Pages. Para habilitarlo, entra en **Settings → Pages** y configura GitHub Actions como origen. Una vez publicado, el enlace esperado será `https://alberthqs.github.io/focusboard-lite/`.

## Límites actuales

FocusBoard Lite es un proyecto de aprendizaje: no tiene cuentas, sincronización entre dispositivos, backend ni recordatorios. Su objetivo es funcionar de forma simple y mantener el código fácil de entender.

[Volver a mi perfil de GitHub](https://github.com/AlberthQS)
