# Penca UCU app.
Bienvenido a la aplicación de pencas de la Universidad Católica del Uruguay. Este proyecto es una simple aplicación hecha con Next.js.

## Descripcion
Esta aplicación permite a los alumnos de la universidad realizar apuestas en los partidos de la Copa América 2024 y competir contra otros alumnos.

## Estructura del proyecto
- db: Se encuentran los scripts SQL que se ejecutarán cuando el contenedor corra por primera vez.
- penca_ucu: Donde se encuentra la lógica de la aplicación en sí.
- public/: Para archivos estáticos como imágenes o logos.
- app/: Es donde está contenida la aplicación, con sus componentes, páginas y demás funcionalidades.
- app/services/: Servicios utilizados a lo largo de la aplicación. 
- app/api/: Contiene las rutas a la API, con sus manejadores. Cada carpeta es una ruta. Carpetas anidadas son rutas anidadas.
- app/lib/: Contiene las definiciones de esquemas y conecciones a bases de datos.
- app/pages/: Contiene las paginas de la aplicación. Cada page.tsx es una página.
- app/ui/components/: Contiene componentes de UI reutilizables en las páginas.
- app/ui/styles/: Se guardan los diferentes estilos de los componentes.

## Instrucciones para ejecutar
Para correr la aplicación localmente sigue los siguientes pasos:

1. Cloná este repositorio en tu máquina.
2. Navegá hasta la carpeta del proyecto.
3. Ingresá el comando "docker-compose up --build -d". Esto creará un contenedor con la base de datos, y ejecutará los scripts SQL ubicados en la carpeta "bd".
4. Ingresá a la carpeta "penca_ucu".
5. Ejecutá "npm install" para instalar las dependencias.
6. Ejecutá "npm run dev" para iniciar el servidor de desarrollo.
7. Abrí tu navegador y dirigite a http://localhost:3000.

## Contribuyendo
Si querés contribuir en este proyecto por favor seguí estos pasos:
1. Para crear una funcionalidad nueva, movete a tu rama y creá otra con la nomenclatura "feature/<funcionalidad>".
2. Para arreglar un bug o error, movete a tu rama y creá una a partir de la misma con la nomenclatura "fix/<arreglo>"
3. Hacé los cambios.
4. Creá un pull request con la descripción de los cambios que hiciste.