# Penca UCU app.
Bienvenido a la aplicacion de pencas de la Universidad Catolica del Uruguay. Este proyecto es una simple aplicacion hecha con Next.js.

## Descripcion
Esta aplicacion permite a los alumnos de la universidad realizar apuestas en los partidos de la Copa America 2024 y competir contra otros alumnos.

## Estructura del proyecto
- db: Se encuentran los scripts SQL que se ejecutaran cuando el contenedor corra por primera vez.
- penca_ucu: Donde se encuentra la logica de la aplicacion en si.
- public/: Para archivos estaticos como imagenes o logos.
- app/: Es donde esta contenida la aplicacion, con sus componentes, paginas y demas funcionalidades.
- app/services/: Servicios utilizados a lo largo de la aplicacion. 
- app/api/: Contiene las rutas a la API, con sus manejadores. Cada carpeta es una ruta. Carpetas anidadas son rutas anidadas.
- app/lib/: Contiene las definiciones de esquemas y conecciones a bases de datos.
- app/pages/: Contiene las paginas de la aplicacion. Cada page.tsx es una pagina.
- app/ui/components/: Contiene componentes de UI reutilizables en las paginas.
- app/ui/styles/: Se guardan los diferentes estilos de los componentes.

## Instrucciones para ejecutar
Para correr la aplicacion localmente sigue los siguientes pasos:

1. Clonea este repositorio en tu maquina.
2. Navega hasta la carpeta del proyecto.
3. Ingresa el comando 'docker-compose up -d'. Esto creara un contenedor con la base de datos, y ejecutara los scripts SQL ubicados en la carpeta "bd".
4. Ingresa a la carpeta "penca_ucu".
5. Ejecuta npm install para instalar dependencias.
6. Ejecuta npm run dev para iniciar el servidor de desarrollo.
7. Abre tu navegador y dirigete a http://localhost:3000.

## Contribuyendo
Si quieres contribuir en este proyecto por favor sigue estos pasos:
1. Crea una rama a partir de dev con la nomenclatura "<nombreUsuario>Branch".
2. Para crear una funcionalidad nueva, muevete a tu rama y crea otra con la nomenclatura "feature/<funcionalidad>".
3. Para arreglar un bug o error, muevete a tu rama y crea una a partir de la misma con la nomenclatura "fix/<arreglo>"
4. Haz los cambios.
5. Crea un pull request con la descripcion de los cambios que has hecho.

